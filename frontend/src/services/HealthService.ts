import { supabase } from '@/core/supabase';

export interface HealthStatus {
  status: 'healthy' | 'unhealthy';
  databaseConnected: boolean;
  timestamp: string;
  error?: string;
}

export class HealthService {
  async checkHealth(): Promise<HealthStatus> {
    try {
      // Execute a quick, low-cost query to test Postgres pings
      const { error } = await (supabase as any)
        .from('projects')
        .select('id')
        .limit(1);

      if (error && error.code !== 'PGRST116') {
        return {
          status: 'unhealthy',
          databaseConnected: false,
          timestamp: new Date().toISOString(),
          error: error.message
        };
      }

      return {
        status: 'healthy',
        databaseConnected: true,
        timestamp: new Date().toISOString()
      };
    } catch (err: any) {
      return {
        status: 'unhealthy',
        databaseConnected: false,
        timestamp: new Date().toISOString(),
        error: err.message || 'Unknown connection error'
      };
    }
  }
}

export const healthService = new HealthService();
