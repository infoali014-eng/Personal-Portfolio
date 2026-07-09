import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // TODO: Query projects database entries from Supabase
  const mockProjects = [
    {
      id: 'proj-1',
      title: 'Study Mate AI',
      slug: 'study-mate-ai',
      shortDescription: 'AI-driven learning workspace built to synthesize course materials.',
      techStack: ['React', 'TypeScript', 'Tailwind', 'Supabase', 'Framer Motion'],
      githubUrl: 'https://github.com',
      demoUrl: 'https://studymate.ai',
      coverImage: 'https://supabase.co/storage/v1/object/public/projects/studymate_cover.webp',
      status: 'published'
    },
    {
      id: 'proj-2',
      title: 'Timetable Maker',
      slug: 'timetable-maker',
      shortDescription: 'Scheduling optimizer for university halls and slots constraints.',
      techStack: ['TypeScript', 'Vite', 'Supabase'],
      githubUrl: 'https://github.com',
      demoUrl: 'https://timetable.ai',
      coverImage: 'https://supabase.co/storage/v1/object/public/projects/timetable_cover.webp',
      status: 'published'
    }
  ];

  return res.status(200).json({ 
    success: true, 
    projects: mockProjects 
  });
}
