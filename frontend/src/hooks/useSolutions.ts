import { useState, useEffect, useCallback } from 'react';
import { SolutionsService } from '@/services/SolutionsService';
import type { SolutionData } from '@/data/solutions';

export const useSolutions = (searchQuery?: string) => {
  const [data, setData] = useState<SolutionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const service = new SolutionsService();

  const fetchSolutions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await service.getSolutions(searchQuery);
      setData(res);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch solutions');
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchSolutions();
  }, [fetchSolutions]);

  return {
    data,
    loading,
    error,
    refresh: fetchSolutions
  };
};
