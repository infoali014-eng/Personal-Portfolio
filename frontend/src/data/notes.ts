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
  tags: string[];
}

export const NOTES_REGISTRY: Record<string, NoteData> = {
  'advanced-typescript-notes': {
    slug: 'advanced-typescript-notes',
    title: 'Advanced TypeScript Notes',
    category: 'Programming',
    description: 'Comprehensive reference manual mapping type-level utility operations, conditional inferences, and template literals.',
    difficulty: 'Advanced',
    fileType: 'PDF',
    readingTime: '45 min',
    downloadsCount: 1420,
    lastUpdated: '2026-07-01',
    youtubeUrl: 'https://youtube.com',
    youtubeTitle: 'Advanced TS Video Guide',
    learningPath: 'Modern Frontend Architecture Path',
    tags: ['TypeScript', 'Type Inferences', 'Generics', 'Utility Types']
  },
  'supabase-auth-storage': {
    slug: 'supabase-auth-storage',
    title: 'Supabase Auth & Storage Architectures',
    category: 'Database',
    description: 'Step-by-step schematics structuring policy rules, JWT tokens management, and public/private storage buckets.',
    difficulty: 'Intermediate',
    fileType: 'ZIP',
    readingTime: '30 min',
    downloadsCount: 890,
    lastUpdated: '2026-06-15',
    youtubeUrl: 'https://youtube.com',
    youtubeTitle: 'Supabase Video Hack',
    learningPath: 'Full-Stack Serverless Path',
    tags: ['Supabase', 'Auth', 'Row Level Security', 'Storage Buckets']
  },
  'operating-systems-kernels': {
    slug: 'operating-systems-kernels',
    title: 'Operating Systems Kernels Guides',
    category: 'Operating Systems',
    description: 'Virtual memory allocation checks, thread lock mutex loops, and scheduler parameters outlines.',
    difficulty: 'Advanced',
    fileType: 'PDF',
    readingTime: '60 min',
    downloadsCount: 1100,
    lastUpdated: '2026-05-10',
    learningPath: 'Core Computer Science Systems',
    tags: ['Kernels', 'Virtual Memory', 'Thread Mutex', 'Schedulers']
  },
  'dsa-cheat-sheet': {
    slug: 'dsa-cheat-sheet',
    title: 'DSA Cheat Sheet',
    category: 'DSA',
    description: 'Quick reference cards covering binary heaps, tree traversals, and dynamic programming grids.',
    difficulty: 'Intermediate',
    fileType: 'PDF',
    readingTime: '15 min',
    downloadsCount: 2100,
    lastUpdated: '2026-07-08',
    learningPath: 'Interviews Prep Path',
    tags: ['Algorithms', 'Data Structures', 'LeetCode Prep']
  }
};
