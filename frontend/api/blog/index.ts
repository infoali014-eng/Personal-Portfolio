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

  // TODO: Fetch markdown blogs from Supabase blogs table
  const mockBlogs = [
    {
      id: 'blog-1',
      title: 'Lessons from my first startup',
      slug: 'lessons-from-my-first-startup',
      excerpt: 'Insights gathered from building products, coordinating scaling architectures, and managing product pivots.',
      tags: ['Startup', 'Architecture', 'Lessons'],
      readingTime: 6,
      publishedAt: '2026-07-09'
    }
  ];

  return res.status(200).json({ 
    success: true, 
    blogs: mockBlogs 
  });
}
