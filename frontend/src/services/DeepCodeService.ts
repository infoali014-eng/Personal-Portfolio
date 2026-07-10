import { SupabaseDeepCodeRepository } from '@/repositories/supabase/SupabaseDeepCodeRepository';
import { settingsService } from './SettingsService';
import { DEEPCODE_DATA } from '@/data/deepCode';
import type { DeepCodeChapter } from '@/data/deepCode';
import { APP_CONFIG } from '@/core/config';

export class DeepCodeService {
  private repo = new SupabaseDeepCodeRepository();

  async getChapters(): Promise<DeepCodeChapter[]> {
    if (APP_CONFIG.app.backendMode === 'supabase') {
      try {
        const dbAll = await this.repo.findAll();
        const mockAll = DEEPCODE_DATA.chapters;
        // Merge database chapters with mock chapters, preventing duplicates by university
        return [...dbAll, ...mockAll.filter(m => !dbAll.some(d => d.university === m.university))];
      } catch (err) {
        console.error('Error fetching chapters, falling back to mock:', err);
        return DEEPCODE_DATA.chapters;
      }
    }
    return DEEPCODE_DATA.chapters;
  }

  async getMission(): Promise<string> {
    return await settingsService.getSetting('deepCodeMission', DEEPCODE_DATA.mission);
  }

  async saveMission(text: string): Promise<void> {
    await settingsService.setSetting('deepCodeMission', text);
  }

  async createChapter(item: DeepCodeChapter): Promise<DeepCodeChapter> {
    if (APP_CONFIG.app.backendMode === 'supabase') {
      return await this.repo.create(item);
    }
    // Mock fallbacks
    DEEPCODE_DATA.chapters.push(item);
    return item;
  }

  async updateChapter(id: string, item: Partial<DeepCodeChapter>): Promise<DeepCodeChapter> {
    if (APP_CONFIG.app.backendMode === 'supabase') {
      return await this.repo.update(id, item);
    }
    const idx = DEEPCODE_DATA.chapters.findIndex(c => c.university === item.university);
    if (idx !== -1) {
      DEEPCODE_DATA.chapters[idx] = { ...DEEPCODE_DATA.chapters[idx], ...item };
      return DEEPCODE_DATA.chapters[idx];
    }
    throw new Error('Chapter not found in mock array');
  }

  async deleteChapter(id: string, university: string): Promise<boolean> {
    if (APP_CONFIG.app.backendMode === 'supabase') {
      return await this.repo.delete(id);
    }
    DEEPCODE_DATA.chapters = DEEPCODE_DATA.chapters.filter(c => c.university !== university);
    return true;
  }
}

export const deepCodeService = new DeepCodeService();
