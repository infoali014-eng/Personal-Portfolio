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

export const SOLUTIONS_REGISTRY: Record<string, SolutionData> = {
  'study-mate-ai': {
    slug: 'study-mate-ai',
    name: 'Study Mate AI',
    category: 'Educational Productivity',
    tagline: 'Empowering university students with AI flashcard workflows and context mock exams.',
    overview: 'Study Mate AI automates academic material ingestion. Upload your syllabus or notes to build custom index charts, vocabulary collections, and test formats.',
    audience: 'University Students & Lifelong Learners',
    version: '1.2.0',
    features: [
      'Document Context Processing (PDF, TXT, DOCX).',
      'AI Flashcards and vocabulary lists compilation.',
      'Mock exam generation with answer keys.',
      'Offline-first databases index syncing.'
    ],
    benefits: [
      'Save hours of manual outlining work.',
      'Active-recall testing improves retention.',
      'Spaced repetition schedules remind you to review.'
    ],
    roadmap: [
      { phase: 'Phase 1', title: 'Local Parsing Engine', desc: 'Robust multi-file client-side text extraction.' },
      { phase: 'Phase 2', title: 'Vector DB Sync', desc: 'Enabling large textbook semantic context lookups.' },
      { phase: 'Phase 3', title: 'Audio Ingestion', desc: 'Upload lecture recordings to extract key slides.' }
    ],
    faqs: [
      { q: 'Is my data secure?', a: 'Yes. Files are stored locally or in encrypted cloud buckets. We do not use your documents to train models.' },
      { q: 'What file sizes are supported?', a: 'Up to 50MB per file in beta, supporting documents up to 500 pages.' }
    ],
    githubUrl: 'https://github.com',
    demoUrl: 'https://studymate.ai',
    downloadsCount: 1420
  },
  'timetable-maker': {
    slug: 'timetable-maker',
    name: 'University Timetable Maker',
    category: 'Institutional Utilities',
    tagline: 'Conflict-free course calendars compiling engine for university departments.',
    overview: 'Timetable Maker handles complex academic constraints. Configure slots, courses, faculty choices, and room sizes to get a schedule in seconds.',
    audience: 'University Registrars & Department Heads',
    version: '1.0.4',
    features: [
      'Visual constraints configuration matrices.',
      'Multi-department slots coordinating engine.',
      'Conflict highlight overlay.',
      'CalDAV & GCal export templates.'
    ],
    benefits: [
      'Reduces planning times from weeks to minutes.',
      'Prevents room booking overlaps entirely.',
      'Easily adapts to last-minute faculty changes.'
    ],
    roadmap: [
      { phase: 'Phase 1', title: 'Conflict Solver', desc: 'Develop core heuristic CSP solver engine.' },
      { phase: 'Phase 2', title: 'Drag & Drop Editor', desc: 'Visual manual adjustments panel.' },
      { phase: 'Phase 3', title: 'Multi-Department Sync', desc: 'Shared campus room scheduling checks.' }
    ],
    faqs: [
      { q: 'Can it handle department overlaps?', a: 'Yes. The solver flags shared rooms and multi-department slots automatically.' },
      { q: 'Can we import CSV files?', a: 'Yes, CSV templates for student courses and classrooms are supported.' }
    ],
    githubUrl: 'https://github.com',
    demoUrl: 'https://timetable.ai',
    downloadsCount: 890
  }
};
