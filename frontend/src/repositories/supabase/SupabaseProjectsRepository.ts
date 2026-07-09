import { supabase } from '@/core/supabase';
import type { ProjectData } from '@/data/projects';
import type { BaseRepository } from '../BaseRepository';
import { AppError } from '@/core/errors';

export class SupabaseProjectsRepository implements BaseRepository<ProjectData> {
  private async getOrCreateCategoryId(name: string): Promise<string | null> {
    if (!name) return null;
    try {
      // Try to find existing category
      const { data: existing } = await (supabase as any)
        .from('categories')
        .select('id')
        .eq('name', name)
        .eq('type', 'project')
        .maybeSingle();

      if (existing) {
        return existing.id;
      }

      // Create new category if not exists
      const { data: newCat, error } = await (supabase as any)
        .from('categories')
        .insert({ name, type: 'project' })
        .select('id')
        .single();

      if (error) throw error;
      return newCat.id;
    } catch (err) {
      console.error('Error resolving category:', err);
      return null;
    }
  }

  async find(slug: string): Promise<ProjectData | null> {
    const { data, error } = await (supabase as any)
      .from('projects')
      .select('*, categories(name)')
      .eq('slug', slug)
      .maybeSingle();

    if (error) {
      throw new AppError(error.message, 'NETWORK_ERROR');
    }

    if (!data) return null;
    return this.mapToDomain(data);
  }

  async findAll(): Promise<ProjectData[]> {
    const { data, error } = await (supabase as any)
      .from('projects')
      .select('*, categories(name)');

    if (error) {
      throw new AppError(error.message, 'NETWORK_ERROR');
    }

    return (data || []).map((row: any) => this.mapToDomain(row));
  }

  async create(item: ProjectData): Promise<ProjectData> {
    const categoryId = await this.getOrCreateCategoryId(item.category);

    const { data, error } = await (supabase as any)
      .from('projects')
      .insert({
        slug: item.slug,
        title: item.title,
        tagline: item.tagline,
        overview: item.overview,
        problem: item.problem,
        solution: item.solution,
        github_url: item.githubUrl,
        demo_url: item.demoUrl,
        category_id: categoryId
      })
      .select('*, categories(name)')
      .single();

    if (error) {
      throw new AppError(error.message, 'REPOSITORY_ERROR');
    }

    return this.mapToDomain(data);
  }

  async update(slug: string, item: Partial<ProjectData>): Promise<ProjectData> {
    let categoryId = undefined;
    if (item.category) {
      categoryId = await this.getOrCreateCategoryId(item.category);
    }

    const updatePayload: any = {
      title: item.title,
      tagline: item.tagline,
      overview: item.overview,
      problem: item.problem,
      solution: item.solution,
      github_url: item.githubUrl,
      demo_url: item.demoUrl
    };

    if (categoryId !== undefined) {
      updatePayload.category_id = categoryId;
    }

    const { data, error } = await (supabase as any)
      .from('projects')
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
      .from('projects')
      .delete()
      .eq('slug', slug);

    if (error) {
      throw new AppError(error.message, 'REPOSITORY_ERROR');
    }

    return true;
  }

  private mapToDomain(row: any): ProjectData {
    return {
      slug: row.slug,
      title: row.title,
      category: row.categories ? row.categories.name : 'AI Utilities',
      tagline: row.tagline,
      overview: row.overview,
      problem: row.problem || '',
      solution: row.solution || '',
      features: [],
      techStack: [],
      journey: '',
      challenges: '',
      lessons: '',
      githubUrl: row.github_url || '',
      demoUrl: row.demo_url || '',
      metrics: [],
      relatedSlugs: []
    };
  }
}
