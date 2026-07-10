import { supabase } from '@/core/supabase';
import { AppError } from '@/core/errors';

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  category: string;
  subject?: string;
  message: string;
  isRead?: boolean;
  createdAt?: string;
}

export interface Subscriber {
  id?: string;
  email: string;
  subscribedAt?: string;
}

export class SupabaseMessagesRepository {
  async findAll(): Promise<ContactMessage[]> {
    const { data, error } = await (supabase as any)
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new AppError(error.message, 'NETWORK_ERROR');
    }

    return (data || []).map(this.mapToDomain);
  }

  async createMessage(item: ContactMessage): Promise<ContactMessage> {
    const { data, error } = await (supabase as any)
      .from('messages')
      .insert({
        name: item.name,
        email: item.email,
        category: item.category,
        subject: item.subject || '',
        message: item.message
      })
      .select()
      .single();

    if (error) {
      throw new AppError(error.message, 'REPOSITORY_ERROR');
    }

    return this.mapToDomain(data);
  }

  async markAsRead(id: string, isRead: boolean): Promise<boolean> {
    const { error } = await (supabase as any)
      .from('messages')
      .update({ is_read: isRead })
      .eq('id', id);

    if (error) {
      throw new AppError(error.message, 'REPOSITORY_ERROR');
    }

    return true;
  }

  async deleteMessage(id: string): Promise<boolean> {
    const { error } = await (supabase as any)
      .from('messages')
      .delete()
      .eq('id', id);

    if (error) {
      throw new AppError(error.message, 'REPOSITORY_ERROR');
    }

    return true;
  }

  async createSubscriber(email: string): Promise<Subscriber> {
    const { data, error } = await (supabase as any)
      .from('newsletter_subscribers')
      .insert({ email })
      .select()
      .single();

    if (error) {
      throw new AppError(error.message, 'REPOSITORY_ERROR');
    }
    return {
      id: data.id,
      email: data.email,
      subscribedAt: data.subscribed_at
    };
  }

  async findAllSubscribers(): Promise<Subscriber[]> {
    const { data, error } = await (supabase as any)
      .from('newsletter_subscribers')
      .select('*')
      .order('subscribed_at', { ascending: false });

    if (error) {
      throw new AppError(error.message, 'NETWORK_ERROR');
    }

    return (data || []).map((row: any) => ({
      id: row.id,
      email: row.email,
      subscribedAt: row.subscribed_at
    }));
  }

  async deleteSubscriber(id: string): Promise<boolean> {
    const { error } = await (supabase as any)
      .from('newsletter_subscribers')
      .delete()
      .eq('id', id);

    if (error) {
      throw new AppError(error.message, 'REPOSITORY_ERROR');
    }

    return true;
  }

  private mapToDomain(row: any): ContactMessage {
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      category: row.category,
      subject: row.subject || '',
      message: row.message,
      isRead: row.is_read,
      createdAt: row.created_at
    };
  }
}
