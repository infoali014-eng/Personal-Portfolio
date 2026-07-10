import { supabase } from '@/core/supabase';
import type { NoteData } from '@/data/notes';
import type { BaseRepository } from '../BaseRepository';
import { AppError } from '@/core/errors';

export class SupabaseNotesRepository implements BaseRepository<NoteData> {
  private async getOrCreateCategoryId(name: string): Promise<string | null> {
    if (!name) return null;
    try {
      const { data: existing } = await (supabase as any)
        .from('categories')
        .select('id')
        .eq('name', name)
        .eq('type', 'notes')
        .maybeSingle();

      if (existing) {
        return existing.id;
      }

      const { data: newCat, error } = await (supabase as any)
        .from('categories')
        .insert({ name, type: 'notes' })
        .select('id')
        .single();

      if (error) throw error;
      return newCat.id;
    } catch (err) {
      console.error('Error resolving category for notes:', err);
      return null;
    }
  }

  async find(slug: string): Promise<NoteData | null> {
    const { data, error } = await (supabase as any)
      .from('notes')
      .select('*, categories(name)')
      .eq('slug', slug)
      .maybeSingle();

    if (error) {
      throw new AppError(error.message, 'NETWORK_ERROR');
    }

    if (!data) return null;
    return this.mapToDomain(data);
  }

  async findAll(): Promise<NoteData[]> {
    const { data, error } = await (supabase as any)
      .from('notes')
      .select('*, categories(name)');

    if (error) {
      throw new AppError(error.message, 'NETWORK_ERROR');
    }

    return (data || []).map((row: any) => this.mapToDomain(row));
  }

  async create(item: NoteData): Promise<NoteData> {
    const categoryId = await this.getOrCreateCategoryId(item.category);

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
        youtube_title: item.youtubeTitle,
        file_url: item.fileUrl,
        category_id: categoryId
      })
      .select('*, categories(name)')
      .single();

    if (error) {
      throw new AppError(error.message, 'REPOSITORY_ERROR');
    }

    return this.mapToDomain(data);
  }

  async update(slug: string, item: Partial<NoteData>): Promise<NoteData> {
    let categoryId = undefined;
    if (item.category) {
      categoryId = await this.getOrCreateCategoryId(item.category);
    }

    const updatePayload: any = {
      title: item.title,
      description: item.description,
      difficulty: item.difficulty,
      file_type: item.fileType,
      reading_time: item.readingTime,
      youtube_url: item.youtubeUrl,
      youtube_title: item.youtubeTitle,
      file_url: item.fileUrl
    };

    if (categoryId !== undefined) {
      updatePayload.category_id = categoryId;
    }

    const { data, error } = await (supabase as any)
      .from('notes')
      .update(updatePayload)
      .eq('slug', slug)
      .select('*, categories(name)')
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
      category: row.categories ? row.categories.name : 'Programming',
      description: row.description,
      difficulty: row.difficulty,
      fileType: row.file_type,
      readingTime: row.reading_time,
      downloadsCount: row.downloads_count,
      lastUpdated: row.updated_at ? row.updated_at.split('T')[0] : '',
      youtubeUrl: row.youtube_url || '',
      youtubeTitle: row.youtube_title || '',
      fileUrl: row.file_url || '',
      tags: []
    };
  }
}
