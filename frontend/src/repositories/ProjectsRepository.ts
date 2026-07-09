import { PROJECTS_REGISTRY } from '@/data/projects';
import type { ProjectData } from '@/data/projects';
import type { BaseRepository } from './BaseRepository';
import { AppError } from '@/core/errors';

export class ProjectsRepository implements BaseRepository<ProjectData> {
  private store: Map<string, ProjectData> = new Map(Object.entries(PROJECTS_REGISTRY));

  async find(slug: string): Promise<ProjectData | null> {
    const item = this.store.get(slug);
    return item || null;
  }

  async findAll(): Promise<ProjectData[]> {
    return Array.from(this.store.values());
  }

  async create(item: ProjectData): Promise<ProjectData> {
    if (this.store.has(item.slug)) {
      throw new AppError(`Project with slug ${item.slug} already exists`, 'REPOSITORY_ERROR');
    }
    this.store.set(item.slug, item);
    return item;
  }

  async update(slug: string, item: Partial<ProjectData>): Promise<ProjectData> {
    const existing = this.store.get(slug);
    if (!existing) {
      throw new AppError(`Project with slug ${slug} not found`, 'REPOSITORY_ERROR');
    }
    const updated = { ...existing, ...item };
    this.store.set(slug, updated);
    return updated;
  }

  async delete(slug: string): Promise<boolean> {
    return this.store.delete(slug);
  }
}
