import { useState, useEffect, useCallback } from 'react';
import { BlogService } from '@/services/BlogService';
import type { BlogArticleData } from '@/data/blog';

export const useArticles = () => {
  const [data, setData] = useState<BlogArticleData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const service = new BlogService();

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await service.getArticles();
      setData(res);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch articles');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return {
    data,
    loading,
    error,
    refresh: fetchArticles
  };
};
