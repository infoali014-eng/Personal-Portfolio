import { BlogRepository } from '@/repositories/BlogRepository';
import { SupabaseBlogRepository } from '@/repositories/supabase/SupabaseBlogRepository';
import { ArticleSchema } from '@/core/validation';
import type { BlogArticleData } from '@/data/blog';
import { AppError } from '@/core/errors';
import { APP_CONFIG } from '@/core/config';

export class BlogService {
  private repo = APP_CONFIG.app.backendMode === 'supabase'
    ? new SupabaseBlogRepository()
    : new BlogRepository();

  async getArticles(): Promise<BlogArticleData[]> {
    try {
      return await this.repo.findAll();
    } catch (err: any) {
      throw new AppError(err.message || 'Failed to fetch articles', 'REPOSITORY_ERROR');
    }
  }

  async getArticle(slug: string): Promise<BlogArticleData | null> {
    try {
      return await this.repo.find(slug);
    } catch (err: any) {
      throw new AppError(err.message || 'Failed to fetch article', 'REPOSITORY_ERROR');
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
