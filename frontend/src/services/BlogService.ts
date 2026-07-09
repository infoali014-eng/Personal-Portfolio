import { BlogRepository } from '@/repositories/BlogRepository';
import { SupabaseBlogRepository } from '@/repositories/supabase/SupabaseBlogRepository';
import { ArticleSchema } from '@/core/validation';
import { BLOG_REGISTRY } from '@/data/blog';
import type { BlogArticleData } from '@/data/blog';
import { AppError } from '@/core/errors';
import { APP_CONFIG } from '@/core/config';

export class BlogService {
  private repo = APP_CONFIG.app.backendMode === 'supabase'
    ? new SupabaseBlogRepository()
    : new BlogRepository();

  async getArticles(): Promise<BlogArticleData[]> {
    try {
      const dbAll = await this.repo.findAll();
      const mockAll = Object.values(BLOG_REGISTRY);

      const merged = APP_CONFIG.app.backendMode === 'supabase'
        ? [...dbAll, ...mockAll.filter(m => !dbAll.some(d => d.slug === m.slug))]
        : dbAll;

      return merged;
    } catch (err: any) {
      console.error('Error fetching articles from database, falling back to mock:', err);
      return Object.values(BLOG_REGISTRY);
    }
  }

  async getArticle(slug: string): Promise<BlogArticleData | null> {
    try {
      const dbItem = await this.repo.find(slug);
      if (dbItem) return dbItem;
      return BLOG_REGISTRY[slug] || null;
    } catch (err: any) {
      console.warn(`Error querying database for article ${slug}, falling back to mock:`, err);
      return BLOG_REGISTRY[slug] || null;
    }
  }

  async createArticle(data: BlogArticleData): Promise<BlogArticleData> {
    const validated = ArticleSchema.safeParse(data);
    if (!validated.success) {
      throw new AppError('Validation failed', 'VALIDATION_ERROR', validated.error.format());
    }
    return await this.repo.create(data);
  }

  async updateArticle(slug: string, data: Partial<BlogArticleData>): Promise<BlogArticleData> {
    return await this.repo.update(slug, data);
  }

  async deleteArticle(slug: string): Promise<boolean> {
    return await this.repo.delete(slug);
  }
}
