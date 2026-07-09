import { ProjectsRepository } from '@/repositories/ProjectsRepository';
import { SupabaseProjectsRepository } from '@/repositories/supabase/SupabaseProjectsRepository';
import { ProjectSchema } from '@/core/validation';
import type { ProjectData } from '@/data/projects';
import { AppError } from '@/core/errors';
import { APP_CONFIG } from '@/core/config';

export class ProjectsService {
  private repo = APP_CONFIG.app.backendMode === 'supabase'
    ? new SupabaseProjectsRepository()
    : new ProjectsRepository();

  async getProjects(filterCategory?: string): Promise<ProjectData[]> {
    try {
      const all = await this.repo.findAll();
      if (filterCategory && filterCategory !== 'All') {
        return all.filter(p => p.category.toLowerCase().includes(filterCategory.toLowerCase()));
      }
      return all;
    } catch (err: any) {
      throw new AppError(err.message || 'Failed to fetch projects', 'REPOSITORY_ERROR');
    }
  }

  async getProject(slug: string): Promise<ProjectData | null> {
    try {
      return await this.repo.find(slug);
    } catch (err: any) {
      throw new AppError(err.message || 'Failed to fetch project', 'REPOSITORY_ERROR');
    }
  }

  async createProject(data: ProjectData): Promise<ProjectData> {
    const validated = ProjectSchema.safeParse(data);
    if (!validated.success) {
      throw new AppError('Validation failed', 'VALIDATION_ERROR', validated.error.format());
    }
    return await this.repo.create(data);
  }

  async updateProject(slug: string, data: Partial<ProjectData>): Promise<ProjectData> {
    return await this.repo.update(slug, data);
  }

  async deleteProject(slug: string): Promise<boolean> {
    return await this.repo.delete(slug);
  }
}
