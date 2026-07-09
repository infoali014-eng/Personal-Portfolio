import { BLOG_REGISTRY } from '@/data/blog';
import type { BlogArticleData } from '@/data/blog';
import type { BaseRepository } from './BaseRepository';
import { AppError } from '@/core/errors';

export class BlogRepository implements BaseRepository<BlogArticleData> {
  private store: Map<string, BlogArticleData> = new Map(Object.entries(BLOG_REGISTRY));

  async find(slug: string): Promise<BlogArticleData | null> {
    const item = this.store.get(slug);
    return item || null;
  }

  async findAll(): Promise<BlogArticleData[]> {
    return Array.from(this.store.values());
  }

  async create(item: BlogArticleData): Promise<BlogArticleData> {
    if (this.store.has(item.slug)) {
      throw new AppError(`Article with slug ${item.slug} already exists`, 'REPOSITORY_ERROR');
    }
    this.store.set(item.slug, item);
    return item;
  }

  async update(slug: string, item: Partial<BlogArticleData>): Promise<BlogArticleData> {
    const existing = this.store.get(slug);
    if (!existing) {
      throw new AppError(`Article with slug ${slug} not found`, 'REPOSITORY_ERROR');
    }
    const updated = { ...existing, ...item };
    this.store.set(slug, updated);
    return updated;
  }

  async delete(slug: string): Promise<boolean> {
    return this.store.delete(slug);
  }
}
