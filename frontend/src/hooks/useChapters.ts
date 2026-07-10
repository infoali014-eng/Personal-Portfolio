import { useState, useEffect, useCallback } from 'react';
import { deepCodeService } from '@/services/DeepCodeService';
import type { DeepCodeChapter } from '@/data/deepCode';

export const useChapters = () => {
  const [data, setData] = useState<DeepCodeChapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChapters = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await deepCodeService.getChapters();
      setData(res);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch chapters');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChapters();
  }, [fetchChapters]);

  return {
    data,
    loading,
    error,
    refresh: fetchChapters
  };
};
