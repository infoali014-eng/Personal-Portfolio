import { supabase } from '@/core/supabase';
import type { BlogArticleData } from '@/data/blog';
import type { BaseRepository } from '../BaseRepository';
import { AppError } from '@/core/errors';

export class SupabaseBlogRepository implements BaseRepository<BlogArticleData> {
  async find(slug: string): Promise<BlogArticleData | null> {
    const { data, error } = await (supabase as any)
      .from('blog_articles')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw new AppError(error.message, 'NETWORK_ERROR');
    }

    return this.mapToDomain(data);
  }

  async findAll(): Promise<BlogArticleData[]> {
    const { data, error } = await (supabase as any)
      .from('blog_articles')
      .select('*');

    if (error) {
      throw new AppError(error.message, 'NETWORK_ERROR');
    }

    return (data || []).map(this.mapToDomain);
  }

  async create(item: BlogArticleData): Promise<BlogArticleData> {
    const { data, error } = await (supabase as any)
      .from('blog_articles')
      .insert({
        slug: item.slug,
        title: item.title,
        excerpt: item.excerpt,
        content: item.content,
        date: item.date,
        reading_time: item.readingTime,
        author_name: item.author.name
      })
      .select()
      .single();

    if (error) {
      throw new AppError(error.message, 'REPOSITORY_ERROR');
    }

    return this.mapToDomain(data);
  }

  async update(slug: string, item: Partial<BlogArticleData>): Promise<BlogArticleData> {
    const { data, error } = await (supabase as any)
      .from('blog_articles')
      .update({
        title: item.title,
        excerpt: item.excerpt,
        content: item.content,
        date: item.date,
        reading_time: item.readingTime
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
      .from('blog_articles')
      .delete()
      .eq('slug', slug);

    if (error) {
      throw new AppError(error.message, 'REPOSITORY_ERROR');
    }

    return true;
  }

  private mapToDomain(row: any): BlogArticleData {
    return {
      slug: row.slug,
      title: row.title,
      category: 'Supabase Category',
      excerpt: row.excerpt,
      content: row.content,
      author: { name: row.author_name, avatar: '/assets/avatar.jpg', role: 'Author' },
      date: row.date,
      readingTime: row.reading_time,
      toc: [],
      tags: []
    };
  }
}
