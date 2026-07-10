export interface NoteData {
  slug: string;
  title: string;
  category: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  fileType: string;
  readingTime: string;
  downloadsCount: number;
  lastUpdated: string;
  youtubeUrl?: string;
  youtubeTitle?: string;
  learningPath?: string;
  fileUrl?: string;
  tags: string[];
}

export const NOTES_REGISTRY: Record<string, NoteData> = {};
