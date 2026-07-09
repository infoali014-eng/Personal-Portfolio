import { NotesRepository } from '@/repositories/NotesRepository';
import { SupabaseNotesRepository } from '@/repositories/supabase/SupabaseNotesRepository';
import { NoteSchema } from '@/core/validation';
import { NOTES_REGISTRY } from '@/data/notes';
import type { NoteData } from '@/data/notes';
import { AppError } from '@/core/errors';
import { APP_CONFIG } from '@/core/config';

export class NotesService {
  private repo = APP_CONFIG.app.backendMode === 'supabase'
    ? new SupabaseNotesRepository()
    : new NotesRepository();

  async getNotes(category?: string, difficulty?: string): Promise<NoteData[]> {
    try {
      const dbAll = await this.repo.findAll();
      const mockAll = Object.values(NOTES_REGISTRY);

      const merged = APP_CONFIG.app.backendMode === 'supabase'
        ? [...dbAll, ...mockAll.filter(m => !dbAll.some(d => d.slug === m.slug))]
        : dbAll;

      let filtered = merged;
      if (category && category !== 'All') {
        filtered = filtered.filter(n => n.category.toLowerCase() === category.toLowerCase());
      }
      if (difficulty && difficulty !== 'All') {
        filtered = filtered.filter(n => n.difficulty.toLowerCase() === difficulty.toLowerCase());
      }
      return filtered;
    } catch (err: any) {
      console.error('Error fetching notes from database, falling back to mock:', err);
      const mockAll = Object.values(NOTES_REGISTRY);
      let filtered = mockAll;
      if (category && category !== 'All') {
        filtered = filtered.filter(n => n.category.toLowerCase() === category.toLowerCase());
      }
      if (difficulty && difficulty !== 'All') {
        filtered = filtered.filter(n => n.difficulty.toLowerCase() === difficulty.toLowerCase());
      }
      return filtered;
    }
  }

  async getNote(slug: string): Promise<NoteData | null> {
    try {
      const dbItem = await this.repo.find(slug);
      if (dbItem) return dbItem;
      return NOTES_REGISTRY[slug] || null;
    } catch (err: any) {
      console.warn(`Error querying database for note ${slug}, falling back to mock:`, err);
      return NOTES_REGISTRY[slug] || null;
    }
  }

  async createNote(data: NoteData): Promise<NoteData> {
    const validated = NoteSchema.safeParse(data);
    if (!validated.success) {
      throw new AppError('Validation failed', 'VALIDATION_ERROR', validated.error.format());
    }
    return await this.repo.create(data);
  }

  async updateNote(slug: string, data: Partial<NoteData>): Promise<NoteData> {
    return await this.repo.update(slug, data);
  }

  async deleteNote(slug: string): Promise<boolean> {
    return await this.repo.delete(slug);
  }
}
