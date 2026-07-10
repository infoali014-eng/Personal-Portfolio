import { supabase } from '@/core/supabase';
import { AppError } from '@/core/errors';
import type { DeepCodeChapter } from '@/data/deepCode';

export class SupabaseDeepCodeRepository {
  async findAll(): Promise<DeepCodeChapter[]> {
    const { data, error } = await (supabase as any)
      .from('deep_code_chapters')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      throw new AppError(error.message, 'NETWORK_ERROR');
    }

    return (data || []).map(this.mapToDomain);
  }

  async find(id: string): Promise<DeepCodeChapter | null> {
    const { data, error } = await (supabase as any)
      .from('deep_code_chapters')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      throw new AppError(error.message, 'NETWORK_ERROR');
    }

    if (!data) return null;
    return this.mapToDomain(data);
  }

  async create(item: DeepCodeChapter): Promise<DeepCodeChapter> {
    const { data, error } = await (supabase as any)
      .from('deep_code_chapters')
      .insert({
        name: item.name,
        university: item.university,
        lead_name: item.lead,
        member_count: item.memberCount,
        status: item.status
      })
      .select()
      .single();

    if (error) {
      throw new AppError(error.message, 'REPOSITORY_ERROR');
    }

    return this.mapToDomain(data);
  }

  async update(id: string, item: Partial<DeepCodeChapter>): Promise<DeepCodeChapter> {
    const updatePayload: any = {};
    if (item.name !== undefined) updatePayload.name = item.name;
    if (item.university !== undefined) updatePayload.university = item.university;
    if (item.lead !== undefined) updatePayload.lead_name = item.lead;
    if (item.memberCount !== undefined) updatePayload.member_count = item.memberCount;
    if (item.status !== undefined) updatePayload.status = item.status;

    const { data, error } = await (supabase as any)
      .from('deep_code_chapters')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new AppError(error.message, 'REPOSITORY_ERROR');
    }

    return this.mapToDomain(data);
  }

  async delete(id: string): Promise<boolean> {
    const { error } = await (supabase as any)
      .from('deep_code_chapters')
      .delete()
      .eq('id', id);

    if (error) {
      throw new AppError(error.message, 'REPOSITORY_ERROR');
    }

    return true;
  }

  private mapToDomain(row: any): DeepCodeChapter {
    return {
      id: row.id,
      name: row.name,
      university: row.university,
      lead: row.lead_name,
      memberCount: row.member_count,
      status: row.status as 'Active' | 'Beta' | 'Coming Soon'
    };
  }
}
