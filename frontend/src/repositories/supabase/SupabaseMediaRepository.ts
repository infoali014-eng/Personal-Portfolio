import { supabase } from '@/core/supabase';
import { AppError } from '@/core/errors';

export interface MediaAsset {
  id: string;
  name: string;
  type: 'image' | 'pdf' | 'zip' | 'document';
  size: string;
  uploadedAt: string;
  url: string;
}

export class SupabaseMediaRepository {
  async findAll(): Promise<MediaAsset[]> {
    const { data, error } = await (supabase as any)
      .from('media')
      .select('*')
      .order('uploaded_at', { ascending: false });

    if (error) {
      throw new AppError(error.message, 'NETWORK_ERROR');
    }

    return (data || []).map(this.mapToDomain);
  }

  async create(item: Omit<MediaAsset, 'id' | 'uploadedAt'>): Promise<MediaAsset> {
    const { data, error } = await (supabase as any)
      .from('media')
      .insert({
        name: item.name,
        type: item.type,
        size: item.size,
        url: item.url
      })
      .select()
      .single();

    if (error) {
      throw new AppError(error.message, 'REPOSITORY_ERROR');
    }

    return this.mapToDomain(data);
  }

  async delete(id: string): Promise<boolean> {
    const { error } = await (supabase as any)
      .from('media')
      .delete()
      .eq('id', id);

    if (error) {
      throw new AppError(error.message, 'REPOSITORY_ERROR');
    }

    return true;
  }

  private mapToDomain(row: any): MediaAsset {
    return {
      id: row.id,
      name: row.name,
      type: row.type as any,
      size: row.size,
      uploadedAt: row.uploaded_at?.split('T')[0] || new Date().toISOString().split('T')[0],
      url: row.url
    };
  }
}
