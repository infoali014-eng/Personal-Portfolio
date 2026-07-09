import { SolutionsRepository } from '@/repositories/SolutionsRepository';
import { SupabaseSolutionsRepository } from '@/repositories/supabase/SupabaseSolutionsRepository';
import { SolutionSchema } from '@/core/validation';
import type { SolutionData } from '@/data/solutions';
import { AppError } from '@/core/errors';
import { APP_CONFIG } from '@/core/config';

export class SolutionsService {
  private repo = APP_CONFIG.app.backendMode === 'supabase'
    ? new SupabaseSolutionsRepository()
    : new SolutionsRepository();

  async getSolutions(searchQuery?: string): Promise<SolutionData[]> {
    try {
      const all = await this.repo.findAll();
      if (searchQuery) {
        return all.filter(s => 
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.tagline.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      return all;
    } catch (err: any) {
      throw new AppError(err.message || 'Failed to fetch solutions', 'REPOSITORY_ERROR');
    }
  }

  async getSolution(slug: string): Promise<SolutionData | null> {
    try {
      return await this.repo.find(slug);
    } catch (err: any) {
      throw new AppError(err.message || 'Failed to fetch solution', 'REPOSITORY_ERROR');
    }
  }

  async createSolution(data: SolutionData): Promise<SolutionData> {
    const validated = SolutionSchema.safeParse(data);
    if (!validated.success) {
      throw new AppError('Validation failed', 'VALIDATION_ERROR', validated.error.format());
    }
    return await this.repo.create(data);
  }

  async updateSolution(slug: string, data: Partial<SolutionData>): Promise<SolutionData> {
    return await this.repo.update(slug, data);
  }

  async deleteSolution(slug: string): Promise<boolean> {
    return await this.repo.delete(slug);
  }
}
