import { useState, useEffect, useCallback } from 'react';
import { ProjectsService } from '@/services/ProjectsService';
import type { ProjectData } from '@/data/projects';

export const useProjects = (category?: string) => {
  const [data, setData] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const service = new ProjectsService();

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await service.getProjects(category);
      setData(res);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    data,
    loading,
    error,
    refresh: fetchProjects
  };
};
