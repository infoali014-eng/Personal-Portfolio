import { NOTES_REGISTRY } from '@/data/notes';
import type { NoteData } from '@/data/notes';
import type { BaseRepository } from './BaseRepository';
import { AppError } from '@/core/errors';

export class NotesRepository implements BaseRepository<NoteData> {
  private store: Map<string, NoteData> = new Map(Object.entries(NOTES_REGISTRY));

  async find(slug: string): Promise<NoteData | null> {
    const item = this.store.get(slug);
    return item || null;
  }

  async findAll(): Promise<NoteData[]> {
    return Array.from(this.store.values());
  }

  async create(item: NoteData): Promise<NoteData> {
    if (this.store.has(item.slug)) {
      throw new AppError(`Note with slug ${item.slug} already exists`, 'REPOSITORY_ERROR');
    }
    this.store.set(item.slug, item);
    return item;
  }

  async update(slug: string, item: Partial<NoteData>): Promise<NoteData> {
    const existing = this.store.get(slug);
    if (!existing) {
      throw new AppError(`Note with slug ${slug} not found`, 'REPOSITORY_ERROR');
    }
    const updated = { ...existing, ...item };
    this.store.set(slug, updated);
    return updated;
  }

  async delete(slug: string): Promise<boolean> {
    return this.store.delete(slug);
  }
}
