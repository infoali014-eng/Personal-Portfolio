import { supabase } from '@/core/supabase';
import type { ProjectData } from '@/data/projects';
import type { BaseRepository } from '../BaseRepository';
import { AppError } from '@/core/errors';

export class SupabaseProjectsRepository implements BaseRepository<ProjectData> {
  async find(slug: string): Promise<ProjectData | null> {
    const { data, error } = await (supabase as any)
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // record not found
      throw new AppError(error.message, 'NETWORK_ERROR');
    }

    return this.mapToDomain(data);
  }

  async findAll(): Promise<ProjectData[]> {
    const { data, error } = await (supabase as any)
      .from('projects')
      .select('*');

    if (error) {
      throw new AppError(error.message, 'NETWORK_ERROR');
    }

    return (data || []).map(this.mapToDomain);
  }

  async create(item: ProjectData): Promise<ProjectData> {
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
        demo_url: item.demoUrl
      })
      .select()
      .single();

    if (error) {
      throw new AppError(error.message, 'REPOSITORY_ERROR');
    }

    return this.mapToDomain(data);
  }

  async update(slug: string, item: Partial<ProjectData>): Promise<ProjectData> {
    const { data, error } = await (supabase as any)
      .from('projects')
      .update({
        title: item.title,
        tagline: item.tagline,
        overview: item.overview,
        problem: item.problem,
        solution: item.solution,
        github_url: item.githubUrl,
        demo_url: item.demoUrl
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
      category: 'Supabase Category',
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
