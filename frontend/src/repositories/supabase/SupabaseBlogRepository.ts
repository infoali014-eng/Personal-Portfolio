import { supabase } from '@/core/supabase';
import type { BlogArticleData } from '@/data/blog';
import type { BaseRepository } from '../BaseRepository';
import { AppError } from '@/core/errors';

export class SupabaseBlogRepository implements BaseRepository<BlogArticleData> {
  private async getOrCreateCategoryId(name: string): Promise<string | null> {
    if (!name) return null;
    try {
      const { data: existing } = await (supabase as any)
        .from('categories')
        .select('id')
        .eq('name', name)
        .eq('type', 'blog')
        .maybeSingle();

      if (existing) {
        return existing.id;
      }

      const { data: newCat, error } = await (supabase as any)
        .from('categories')
        .insert({ name, type: 'blog' })
        .select('id')
        .single();

      if (error) throw error;
      return newCat.id;
    } catch (err) {
      console.error('Error resolving category for blog:', err);
      return null;
    }
  }

  async find(slug: string): Promise<BlogArticleData | null> {
    const { data, error } = await (supabase as any)
      .from('blog_articles')
      .select('*, categories(name)')
      .eq('slug', slug)
      .maybeSingle();

    if (error) {
      throw new AppError(error.message, 'NETWORK_ERROR');
    }

    if (!data) return null;
    return this.mapToDomain(data);
  }

  async findAll(): Promise<BlogArticleData[]> {
    const { data, error } = await (supabase as any)
      .from('blog_articles')
      .select('*, categories(name)');

    if (error) {
      throw new AppError(error.message, 'NETWORK_ERROR');
    }

    return (data || []).map((row: any) => this.mapToDomain(row));
  }

  async create(item: BlogArticleData): Promise<BlogArticleData> {
    const categoryId = await this.getOrCreateCategoryId(item.category);

    const { data, error } = await (supabase as any)
      .from('blog_articles')
      .insert({
        slug: item.slug,
        title: item.title,
        excerpt: item.excerpt,
        content: item.content,
        date: item.date,
        reading_time: item.readingTime,
        author_name: item.author.name,
        category_id: categoryId
      })
      .select('*, categories(name)')
      .single();

    if (error) {
      throw new AppError(error.message, 'REPOSITORY_ERROR');
    }

    return this.mapToDomain(data);
  }

  async update(slug: string, item: Partial<BlogArticleData>): Promise<BlogArticleData> {
    let categoryId = undefined;
    if (item.category) {
      categoryId = await this.getOrCreateCategoryId(item.category);
    }

    const updatePayload: any = {
      title: item.title,
      excerpt: item.excerpt,
      content: item.content,
      date: item.date,
      reading_time: item.readingTime
    };

    if (categoryId !== undefined) {
      updatePayload.category_id = categoryId;
    }

    const { data, error } = await (supabase as any)
      .from('blog_articles')
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
      category: row.categories ? row.categories.name : 'Engineering',
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
