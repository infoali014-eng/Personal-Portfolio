import { NotesRepository } from '@/repositories/NotesRepository';
import { SupabaseNotesRepository } from '@/repositories/supabase/SupabaseNotesRepository';
import { NoteSchema } from '@/core/validation';
import type { NoteData } from '@/data/notes';
import { AppError } from '@/core/errors';
import { APP_CONFIG } from '@/core/config';

export class NotesService {
  private repo = APP_CONFIG.app.backendMode === 'supabase'
    ? new SupabaseNotesRepository()
    : new NotesRepository();

  async getNotes(category?: string, difficulty?: string): Promise<NoteData[]> {
    try {
      let all = await this.repo.findAll();
      if (category && category !== 'All') {
        all = all.filter(n => n.category.toLowerCase() === category.toLowerCase());
      }
      if (difficulty && difficulty !== 'All') {
        all = all.filter(n => n.difficulty.toLowerCase() === difficulty.toLowerCase());
      }
      return all;
    } catch (err: any) {
      throw new AppError(err.message || 'Failed to fetch notes', 'REPOSITORY_ERROR');
    }
  }

  async getNote(slug: string): Promise<NoteData | null> {
    try {
      return await this.repo.find(slug);
    } catch (err: any) {
      throw new AppError(err.message || 'Failed to fetch note', 'REPOSITORY_ERROR');
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
