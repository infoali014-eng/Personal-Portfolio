import { supabase } from '@/core/supabase';
import { AppError } from '@/core/errors';

export class SupabaseSettingsRepository {
  async get(key: string, defaultValue: string): Promise<string> {
    const { data, error } = await (supabase as any)
      .from('settings')
      .select('value')
      .eq('key', key)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return defaultValue;
      throw new AppError(error.message, 'NETWORK_ERROR');
    }

    return data.value;
  }

  async set(key: string, value: string): Promise<void> {
    const { error } = await (supabase as any)
      .from('settings')
      .upsert({ key, value }, { onConflict: 'key' });

    if (error) {
      throw new AppError(error.message, 'REPOSITORY_ERROR');
    }
  }
}
