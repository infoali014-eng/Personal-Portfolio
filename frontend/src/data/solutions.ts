export interface SolutionData {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  overview: string;
  audience: string;
  version: string;
  features: string[];
  benefits: string[];
  roadmap: { phase: string; title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  githubUrl?: string;
  demoUrl?: string;
  docUrl?: string;
  downloadsCount: number;
}

export const SOLUTIONS_REGISTRY: Record<string, SolutionData> = {};
