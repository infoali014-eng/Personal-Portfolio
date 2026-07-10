export interface DeepCodeChapter {
  id?: string;
  name: string;
  university: string;
  lead: string;
  memberCount: number;
  status: 'Active' | 'Beta' | 'Coming Soon';
}

export const DEEPCODE_DATA = {
  mission: 'Deep Code is a long-term technology community founded to empower students through software, AI, collaboration, and open-source innovation. We bridge the gap between academic theory and industry engineering.',
  vision: [
    { title: 'University Chapters', desc: 'A network of campus student development teams collaborating on software.' },
    { title: 'Open Source', desc: 'Creating reusable packages, libraries, and design specs for students worldwide.' },
    { title: 'AI Innovation', desc: 'Organizing workshops on local vector searches and generative agents.' },
    { title: 'Annual Hackathons', desc: 'Challenging student squads to solve real campus problems.' }
  ],
  chapters: [] as DeepCodeChapter[],
  contributors: [] as { name: string; role: string; avatar: string }[],
  events: [] as { title: string; date: string; type: string; desc: string }[],
  roadmap: [
    { phase: 'Phase 1', title: 'Chapter Scaffolding', desc: 'Establish the central registry and publish contribution guidelines.' },
    { phase: 'Phase 2', title: 'Open Source Launch', desc: 'Open shared utility parsers for student registration scraping.' },
    { phase: 'Phase 3', title: 'Annual Challenge', desc: 'Launch the first global campus hackathon.' }
  ],
  gallery: [] as { title: string; image: string; category: string }[]
};
