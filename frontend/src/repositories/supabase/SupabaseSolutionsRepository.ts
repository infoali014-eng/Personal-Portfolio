import { supabase } from '@/core/supabase';
import type { SolutionData } from '@/data/solutions';
import type { BaseRepository } from '../BaseRepository';
import { AppError } from '@/core/errors';

export class SupabaseSolutionsRepository implements BaseRepository<SolutionData> {
  async find(slug: string): Promise<SolutionData | null> {
    const { data, error } = await (supabase as any)
      .from('solutions')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new AppError(error.message, 'NETWORK_ERROR');
    }

    return this.mapToDomain(data);
  }

  async findAll(): Promise<SolutionData[]> {
    const { data, error } = await (supabase as any)
      .from('solutions')
      .select('*');

    if (error) {
      throw new AppError(error.message, 'NETWORK_ERROR');
    }

    return (data || []).map(this.mapToDomain);
  }

  async create(item: SolutionData): Promise<SolutionData> {
    const { data, error } = await (supabase as any)
      .from('solutions')
      .insert({
        slug: item.slug,
        name: item.name,
        tagline: item.tagline,
        overview: item.overview,
        audience: item.audience,
        version: item.version
      })
      .select()
      .single();

    if (error) {
      throw new AppError(error.message, 'REPOSITORY_ERROR');
    }

    return this.mapToDomain(data);
  }

  async update(slug: string, item: Partial<SolutionData>): Promise<SolutionData> {
    const { data, error } = await (supabase as any)
      .from('solutions')
      .update({
        name: item.name,
        tagline: item.tagline,
        overview: item.overview,
        audience: item.audience,
        version: item.version
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
      .from('solutions')
      .delete()
      .eq('slug', slug);

    if (error) {
      throw new AppError(error.message, 'REPOSITORY_ERROR');
    }

    return true;
  }

  private mapToDomain(row: any): SolutionData {
    return {
      slug: row.slug,
      name: row.name,
      category: 'Supabase Category',
      tagline: row.tagline,
      overview: row.overview,
      audience: row.audience,
      version: row.version,
      features: [],
      benefits: [],
      roadmap: [],
      faqs: [],
      downloadsCount: 0
    };
  }
}
