export interface BlogArticleData {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  author: { name: string; avatar: string; role: string };
  date: string;
  readingTime: string;
  toc: { text: string; id: string }[];
  tags: string[];
  series?: { name: string; currentPart: number; totalParts: number; prevSlug?: string; nextSlug?: string };
}

export const BLOG_REGISTRY: Record<string, BlogArticleData> = {};
