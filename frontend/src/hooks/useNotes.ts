import { useState, useEffect, useCallback } from 'react';
import { NotesService } from '@/services/NotesService';
import type { NoteData } from '@/data/notes';

export const useNotes = (category?: string, difficulty?: string) => {
  const [data, setData] = useState<NoteData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const service = new NotesService();

  const fetchNotes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await service.getNotes(category, difficulty);
      setData(res);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  }, [category, difficulty]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return {
    data,
    loading,
    error,
    refresh: fetchNotes
  };
};
