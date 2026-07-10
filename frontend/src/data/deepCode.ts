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
  chapters: [
    { name: 'Zurich Campus Chapter', university: 'ETH Zurich', lead: 'Ali', memberCount: 140, status: 'Active' },
    { name: 'Science & Tech Chapter', university: 'EPFL', lead: 'TBD', memberCount: 0, status: 'Coming Soon' }
  ] as DeepCodeChapter[],
  contributors: [
    { name: 'Ali', role: 'Founder & Lead Architect', avatar: '/assets/avatar.jpg' },
    { name: 'Sarah', role: 'Chapter Coordinator', avatar: '/assets/avatar.jpg' },
    { name: 'David', role: 'Core Contributor', avatar: '/assets/avatar.jpg' }
  ],
  events: [
    { title: 'Local AI RAG Workshops', date: '2026-08-15', type: 'Workshop', desc: 'Setup local pgvector databases and connect them to web interfaces.' },
    { title: 'Campus Solvers Hackathon', date: '2026-10-10', type: 'Hackathon', desc: 'A 48-hour build challenge focusing on resolving class registrations issues.' }
  ],
  roadmap: [
    { phase: 'Phase 1', title: 'Chapter Scaffolding', desc: 'Establish the central registry and publish contribution guidelines.' },
    { phase: 'Phase 2', title: 'Open Source Launch', desc: 'Open shared utility parsers for student registration scraping.' },
    { phase: 'Phase 3', title: 'Annual Challenge', desc: 'Launch the first global campus hackathon.' }
  ],
  gallery: [
    { title: 'Local Launch Hackathon', image: '/assets/avatar.jpg', category: 'Hackathon' },
    { title: 'TypeScript Inferences Workshop', image: '/assets/avatar.jpg', category: 'Workshop' }
  ]
};
