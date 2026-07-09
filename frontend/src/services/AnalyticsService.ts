import { supabase } from '@/core/supabase';
import { APP_CONFIG } from '@/core/config';

export interface AnalyticsEvent {
  id?: string;
  eventType: 'page_view' | 'download' | 'project_visit' | 'article_read' | 'search';
  targetSlug: string;
  metadata?: Record<string, any>;
  timestamp?: string;
}

export class AnalyticsService {
  async trackEvent(event: Omit<AnalyticsEvent, 'timestamp'>): Promise<void> {
    const payload = {
      ...event,
      timestamp: new Date().toISOString()
    };

    // 1. Log locally in development
    if (APP_CONFIG.app.env === 'development') {
      console.log('[Analytics Event]:', payload);
    }

    // 2. Dispatch to GA if initialized
    if ((window as any).gtag) {
      (window as any).gtag('event', event.eventType, {
        event_category: 'engagement',
        event_label: event.targetSlug,
        value: event.metadata
      });
    }

    // 3. Save to Supabase if enabled
    if (APP_CONFIG.app.backendMode === 'supabase') {
      try {
        await (supabase as any)
          .from('analytics_events')
          .insert({
            event_type: event.eventType,
            target_slug: event.targetSlug,
            metadata: event.metadata || {}
          });
      } catch (err) {
        console.error('Failed to log event in DB:', err);
      }
    }
  }

  async trackPageView(pagePath: string): Promise<void> {
    await this.trackEvent({ eventType: 'page_view', targetSlug: pagePath });
  }

  async trackDownload(noteSlug: string): Promise<void> {
    await this.trackEvent({ eventType: 'download', targetSlug: noteSlug });
  }
}

export const analyticsService = new AnalyticsService();
