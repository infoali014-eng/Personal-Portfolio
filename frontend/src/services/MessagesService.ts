import { SupabaseMessagesRepository } from '@/repositories/supabase/SupabaseMessagesRepository';
import type { ContactMessage, Subscriber } from '@/repositories/supabase/SupabaseMessagesRepository';
import { APP_CONFIG } from '@/core/config';

export class MessagesService {
  private repo = new SupabaseMessagesRepository();
  
  // Local mock store fallback
  private mockMessages: ContactMessage[] = [
    { id: '1', name: 'Dr. Evelyn', email: 'evelyn@tech.edu', category: 'community', subject: 'Ethical AI Chapters coordination', message: 'Hi Ali, we would love to establish a Deep Code Chapter at our university branch. Can we schedule a call next week?', isRead: false, createdAt: new Date().toISOString() },
    { id: '2', name: 'John Doe', email: 'john@gmail.com', category: 'general', subject: 'Feedback on Study Mate AI', message: 'I have been using your PDF flashcard generator for 3 weeks and it has saved me heaps of studying time. Good job!', isRead: true, createdAt: new Date().toISOString() }
  ];
  private mockSubscribers: Subscriber[] = [
    { id: '1', email: 'subscriber1@gmail.com', subscribedAt: new Date().toISOString() }
  ];

  async getMessages(): Promise<ContactMessage[]> {
    if (APP_CONFIG.app.backendMode === 'supabase') {
      try {
        return await this.repo.findAll();
      } catch (err) {
        console.error('Error fetching messages, falling back to mock:', err);
        return this.mockMessages;
      }
    }
    return this.mockMessages;
  }

  async createMessage(msg: Omit<ContactMessage, 'id' | 'isRead' | 'createdAt'>): Promise<ContactMessage> {
    if (APP_CONFIG.app.backendMode === 'supabase') {
      return await this.repo.createMessage(msg as any);
    }
    const newMsg: ContactMessage = {
      ...msg,
      id: Date.now().toString(),
      isRead: false,
      createdAt: new Date().toISOString()
    };
    this.mockMessages.unshift(newMsg);
    return newMsg;
  }

  async markAsRead(id: string, isRead: boolean): Promise<boolean> {
    if (APP_CONFIG.app.backendMode === 'supabase') {
      return await this.repo.markAsRead(id, isRead);
    }
    const msg = this.mockMessages.find(m => m.id === id);
    if (msg) {
      msg.isRead = isRead;
      return true;
    }
    return false;
  }

  async deleteMessage(id: string): Promise<boolean> {
    if (APP_CONFIG.app.backendMode === 'supabase') {
      return await this.repo.deleteMessage(id);
    }
    this.mockMessages = this.mockMessages.filter(m => m.id !== id);
    return true;
  }

  async subscribeNewsletter(email: string): Promise<Subscriber> {
    if (APP_CONFIG.app.backendMode === 'supabase') {
      return await this.repo.createSubscriber(email);
    }
    const exists = this.mockSubscribers.some(s => s.email === email);
    if (exists) throw new Error('Email is already subscribed');
    
    const newSub = {
      id: Date.now().toString(),
      email,
      subscribedAt: new Date().toISOString()
    };
    this.mockSubscribers.unshift(newSub);
    return newSub;
  }

  async getSubscribers(): Promise<Subscriber[]> {
    if (APP_CONFIG.app.backendMode === 'supabase') {
      try {
        return await this.repo.findAllSubscribers();
      } catch (err) {
        console.error('Error fetching subscribers, falling back to mock:', err);
        return this.mockSubscribers;
      }
    }
    return this.mockSubscribers;
  }

  async deleteSubscriber(id: string): Promise<boolean> {
    if (APP_CONFIG.app.backendMode === 'supabase') {
      return await this.repo.deleteSubscriber(id);
    }
    this.mockSubscribers = this.mockSubscribers.filter(s => s.id !== id);
    return true;
  }
}

export const messagesService = new MessagesService();
