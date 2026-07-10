export interface ProjectData {
  slug: string;
  title: string;
  category: string;
  tagline: string;
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  techStack: { category: string; items: string[] }[];
  journey: string;
  challenges: string;
  lessons: string;
  githubUrl?: string;
  demoUrl?: string;
  docUrl?: string;
  metrics: { label: string; value: string }[];
  relatedSlugs: string[];
}

export const PROJECTS_REGISTRY: Record<string, ProjectData> = {};
