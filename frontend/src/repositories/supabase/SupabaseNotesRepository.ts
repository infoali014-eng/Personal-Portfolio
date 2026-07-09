import { supabase } from '@/core/supabase';
import type { NoteData } from '@/data/notes';
import type { BaseRepository } from '../BaseRepository';
import { AppError } from '@/core/errors';

export class SupabaseNotesRepository implements BaseRepository<NoteData> {
  async find(slug: string): Promise<NoteData | null> {
    const { data, error } = await (supabase as any)
      .from('notes')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new AppError(error.message, 'NETWORK_ERROR');
    }

    return this.mapToDomain(data);
  }

  async findAll(): Promise<NoteData[]> {
    const { data, error } = await (supabase as any)
      .from('notes')
      .select('*');

    if (error) {
      throw new AppError(error.message, 'NETWORK_ERROR');
    }

    return (data || []).map(this.mapToDomain);
  }

  async create(item: NoteData): Promise<NoteData> {
    const { data, error } = await (supabase as any)
      .from('notes')
      .insert({
        slug: item.slug,
        title: item.title,
        description: item.description,
        difficulty: item.difficulty,
        file_type: item.fileType,
        reading_time: item.readingTime,
        youtube_url: item.youtubeUrl,
        youtube_title: item.youtubeTitle
      })
      .select()
      .single();

    if (error) {
      throw new AppError(error.message, 'REPOSITORY_ERROR');
    }

    return this.mapToDomain(data);
  }

  async update(slug: string, item: Partial<NoteData>): Promise<NoteData> {
    const { data, error } = await (supabase as any)
      .from('notes')
      .update({
        title: item.title,
        description: item.description,
        difficulty: item.difficulty,
        file_type: item.fileType,
        reading_time: item.readingTime,
        youtube_url: item.youtubeUrl,
        youtube_title: item.youtubeTitle
      })
      .eq('slug', slug)
      .select()
      .single();

    if (error) {
      throw new AppError(error.message, 'REPOSITORY_ERROR');
    }

    return this.mapToDomain(data);
  }

  async delete(slug: string): Promise<boolean> {
    const { error } = await (supabase as any)
      .from('notes')
      .delete()
      .eq('slug', slug);

    if (error) {
      throw new AppError(error.message, 'REPOSITORY_ERROR');
    }

    return true;
  }

  private mapToDomain(row: any): NoteData {
    return {
      slug: row.slug,
      title: row.title,
      category: 'Supabase Category',
      description: row.description,
      difficulty: row.difficulty,
      fileType: row.file_type,
      readingTime: row.reading_time,
      downloadsCount: row.downloads_count,
      lastUpdated: row.updated_at,
      youtubeUrl: row.youtube_url || '',
      youtubeTitle: row.youtube_title || '',
      tags: []
    };
  }
}
