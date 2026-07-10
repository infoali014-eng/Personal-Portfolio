import { SupabaseMediaRepository } from '@/repositories/supabase/SupabaseMediaRepository';
import type { MediaAsset } from '@/repositories/supabase/SupabaseMediaRepository';
import { storageService } from './StorageService';
import { APP_CONFIG } from '@/core/config';

export class MediaService {
  private repo = new SupabaseMediaRepository();
  private bucketName = APP_CONFIG.storage.mediaBucket;

  private mockAssets: MediaAsset[] = [
    { id: '1', name: 'avatar.jpg', type: 'image', size: '132 KB', uploadedAt: '2026-07-09', url: '/assets/avatar.jpg' }
  ];

  async getAssets(): Promise<MediaAsset[]> {
    if (APP_CONFIG.app.backendMode === 'supabase') {
      try {
        return await this.repo.findAll();
      } catch (err) {
        console.error('Error fetching assets, falling back to mock:', err);
        return this.mockAssets;
      }
    }
    return this.mockAssets;
  }

  async uploadAsset(file: File): Promise<MediaAsset> {
    const fileName = `${Date.now()}-${file.name}`;
    const sizeKb = `${(file.size / 1024).toFixed(0)} KB`;
    
    let type: 'image' | 'pdf' | 'zip' | 'document' = 'document';
    if (file.type.startsWith('image/')) type = 'image';
    else if (file.name.endsWith('.pdf')) type = 'pdf';
    else if (file.name.endsWith('.zip')) type = 'zip';

    if (APP_CONFIG.app.backendMode === 'supabase') {
      // 1. Upload to storage bucket first (integrity safety check)
      const storagePath = await storageService.uploadFile(this.bucketName, fileName, file);
      const publicUrl = storageService.getPublicUrl(this.bucketName, storagePath);

      try {
        // 2. Insert metadata to database
        return await this.repo.create({
          name: file.name,
          type,
          size: sizeKb,
          url: publicUrl
        });
      } catch (dbErr) {
        // Rollback: delete storage asset if DB write fails
        console.error('Database write failed, rolling back uploaded storage file...', dbErr);
        await storageService.deleteFile(this.bucketName, storagePath);
        throw dbErr;
      }
    }

    const newAsset: MediaAsset = {
      id: Date.now().toString(),
      name: file.name,
      type,
      size: sizeKb,
      uploadedAt: new Date().toISOString().split('T')[0],
      url: URL.createObjectURL(file)
    };
    this.mockAssets.unshift(newAsset);
    return newAsset;
  }

  async deleteAsset(id: string, url: string): Promise<boolean> {
    if (APP_CONFIG.app.backendMode === 'supabase') {
      const urlParts = url.split(`/${this.bucketName}/`);
      const storagePath = urlParts.length > 1 ? urlParts[1] : '';

      // 1. Delete database row
      await this.repo.delete(id);

      // 2. Delete storage file (prevent orphaned files)
      if (storagePath) {
        try {
          await storageService.deleteFile(this.bucketName, storagePath);
        } catch (storageErr) {
          console.error(`Failed to delete storage file: ${storagePath}`, storageErr);
        }
      }
      return true;
    }

    this.mockAssets = this.mockAssets.filter(a => a.id !== id);
    return true;
  }
}

export const mediaService = new MediaService();
