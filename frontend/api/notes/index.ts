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

  // TODO: Fetch from Supabase notes table based on query parameters (e.g. category, search, tag, limit, offset)
  const mockNotesMetadata = [
    {
      id: 'note-1',
      title: 'Operating Systems - Core Concepts',
      slug: 'operating-systems-core-concepts',
      category: 'computer-science',
      tags: ['OS', 'Process', 'Thread'],
      description: 'Handwritten summaries for process states, scheduling, and thread locks.',
      fileUrl: 'https://supabase.co/storage/v1/object/public/notes/operating_systems_core.pdf', // Stored in Supabase
      videoUrl: 'https://youtube.com/watch?v=mock-id-1',
      downloadCount: 142
    }
  ];

  return res.status(200).json({ 
    success: true, 
    notes: mockNotesMetadata 
  });
}
