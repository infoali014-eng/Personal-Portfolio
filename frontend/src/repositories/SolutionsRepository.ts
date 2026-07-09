import { SOLUTIONS_REGISTRY } from '@/data/solutions';
import type { SolutionData } from '@/data/solutions';
import type { BaseRepository } from './BaseRepository';
import { AppError } from '@/core/errors';

export class SolutionsRepository implements BaseRepository<SolutionData> {
  private store: Map<string, SolutionData> = new Map(Object.entries(SOLUTIONS_REGISTRY));

  async find(slug: string): Promise<SolutionData | null> {
    const item = this.store.get(slug);
    return item || null;
  }

  async findAll(): Promise<SolutionData[]> {
    return Array.from(this.store.values());
  }

  async create(item: SolutionData): Promise<SolutionData> {
    if (this.store.has(item.slug)) {
      throw new AppError(`Solution with slug ${item.slug} already exists`, 'REPOSITORY_ERROR');
    }
    this.store.set(item.slug, item);
    return item;
  }

  async update(slug: string, item: Partial<SolutionData>): Promise<SolutionData> {
    const existing = this.store.get(slug);
    if (!existing) {
      throw new AppError(`Solution with slug ${slug} not found`, 'REPOSITORY_ERROR');
    }
    const updated = { ...existing, ...item };
    this.store.set(slug, updated);
    return updated;
  }

  async delete(slug: string): Promise<boolean> {
    return this.store.delete(slug);
  }
}
