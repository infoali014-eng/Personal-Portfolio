import { ProjectsRepository } from '@/repositories/ProjectsRepository';
import { SupabaseProjectsRepository } from '@/repositories/supabase/SupabaseProjectsRepository';
import { ProjectSchema } from '@/core/validation';
import { PROJECTS_REGISTRY } from '@/data/projects';
import type { ProjectData } from '@/data/projects';
import { AppError } from '@/core/errors';
import { APP_CONFIG } from '@/core/config';

export class ProjectsService {
  private repo = APP_CONFIG.app.backendMode === 'supabase'
    ? new SupabaseProjectsRepository()
    : new ProjectsRepository();

  async getProjects(filterCategory?: string): Promise<ProjectData[]> {
    try {
      const dbAll = await this.repo.findAll();
      const mockAll = Object.values(PROJECTS_REGISTRY);
      
      // Merge database records with mock registry records (preventing duplicates)
      const merged = APP_CONFIG.app.backendMode === 'supabase'
        ? [...dbAll, ...mockAll.filter(m => !dbAll.some(d => d.slug === m.slug))]
        : dbAll;

      if (filterCategory && filterCategory !== 'All') {
        return merged.filter(p => p.category.toLowerCase().includes(filterCategory.toLowerCase()));
      }
      return merged;
    } catch (err: any) {
      console.error('Error fetching projects from database, falling back to mock:', err);
      // Fail-safe fallback to mock registry
      const mockAll = Object.values(PROJECTS_REGISTRY);
      if (filterCategory && filterCategory !== 'All') {
        return mockAll.filter(p => p.category.toLowerCase().includes(filterCategory.toLowerCase()));
      }
      return mockAll;
    }
  }

  async getProject(slug: string): Promise<ProjectData | null> {
    try {
      const dbItem = await this.repo.find(slug);
      if (dbItem) return dbItem;
      return PROJECTS_REGISTRY[slug] || null;
    } catch (err: any) {
      console.warn(`Error querying database for project ${slug}, falling back to mock:`, err);
      return PROJECTS_REGISTRY[slug] || null;
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
