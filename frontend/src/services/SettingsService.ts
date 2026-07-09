import { SupabaseSettingsRepository } from '@/repositories/supabase/SupabaseSettingsRepository';
import { APP_CONFIG } from '@/core/config';

export class SettingsService {
  private repo = new SupabaseSettingsRepository();
  private mockStore: Record<string, string> = {
    logoText: APP_CONFIG.brand.logoText,
    siteTitle: APP_CONFIG.seo.defaultTitle,
    siteDescription: APP_CONFIG.seo.defaultDescription,
    github: APP_CONFIG.brand.socials.github,
    linkedin: APP_CONFIG.brand.socials.linkedin,
    youtube: APP_CONFIG.brand.socials.youtube
  };

  async getSetting(key: string, defaultValue: string): Promise<string> {
    if (APP_CONFIG.app.backendMode === 'supabase') {
      try {
        return await this.repo.get(key, defaultValue);
      } catch (err) {
        console.error(`Error loading setting ${key}:`, err);
        return defaultValue;
      }
    }
    return this.mockStore[key] || defaultValue;
  }

  async setSetting(key: string, value: string): Promise<void> {
    if (APP_CONFIG.app.backendMode === 'supabase') {
      await this.repo.set(key, value);
    } else {
      this.mockStore[key] = value;
    }
  }
}

export const settingsService = new SettingsService();
