import { supabase } from '@/core/supabase';
import { AppError } from '@/core/errors';

export class StorageService {
  async uploadFile(bucketName: string, path: string, file: File): Promise<string> {
    try {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(path, file, { cacheControl: '3600', upsert: true });

      if (error) {
        throw new AppError(error.message, 'NETWORK_ERROR');
      }

      return data.path;
    } catch (err: any) {
      throw new AppError(err.message || 'File upload failed', 'NETWORK_ERROR');
    }
  }

  async deleteFile(bucketName: string, path: string): Promise<boolean> {
    try {
      const { error } = await supabase.storage
        .from(bucketName)
        .remove([path]);

      if (error) {
        throw new AppError(error.message, 'NETWORK_ERROR');
      }

      return true;
    } catch (err: any) {
      throw new AppError(err.message || 'File deletion failed', 'NETWORK_ERROR');
    }
  }

  getPublicUrl(bucketName: string, path: string): string {
    const { data } = supabase.storage
      .from(bucketName)
      .getPublicUrl(path);

    return data.publicUrl;
  }

  async getSignedUrl(bucketName: string, path: string, expiresInSeconds = 60): Promise<string> {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(path, expiresInSeconds);

    if (error) {
      throw new AppError(error.message, 'NETWORK_ERROR');
    }

    return data.signedUrl;
  }
}
export const storageService = new StorageService();
