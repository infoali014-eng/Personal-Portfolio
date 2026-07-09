import { SolutionsRepository } from '@/repositories/SolutionsRepository';
import { SupabaseSolutionsRepository } from '@/repositories/supabase/SupabaseSolutionsRepository';
import { SolutionSchema } from '@/core/validation';
import { SOLUTIONS_REGISTRY } from '@/data/solutions';
import type { SolutionData } from '@/data/solutions';
import { AppError } from '@/core/errors';
import { APP_CONFIG } from '@/core/config';

export class SolutionsService {
  private repo = APP_CONFIG.app.backendMode === 'supabase'
    ? new SupabaseSolutionsRepository()
    : new SolutionsRepository();

  async getSolutions(searchQuery?: string): Promise<SolutionData[]> {
    try {
      const dbAll = await this.repo.findAll();
      const mockAll = Object.values(SOLUTIONS_REGISTRY);

      const merged = APP_CONFIG.app.backendMode === 'supabase'
        ? [...dbAll, ...mockAll.filter(m => !dbAll.some(d => d.slug === m.slug))]
        : dbAll;

      if (searchQuery) {
        return merged.filter(s => 
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.tagline.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      return merged;
    } catch (err: any) {
      console.error('Error fetching solutions from database, falling back to mock:', err);
      const mockAll = Object.values(SOLUTIONS_REGISTRY);
      if (searchQuery) {
        return mockAll.filter(s => 
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.tagline.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      return mockAll;
    }
  }

  async getSolution(slug: string): Promise<SolutionData | null> {
    try {
      const dbItem = await this.repo.find(slug);
      if (dbItem) return dbItem;
      return SOLUTIONS_REGISTRY[slug] || null;
    } catch (err: any) {
      console.warn(`Error querying database for solution ${slug}, falling back to mock:`, err);
      return SOLUTIONS_REGISTRY[slug] || null;
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
