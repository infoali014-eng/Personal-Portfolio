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

export const PROJECTS_REGISTRY: Record<string, ProjectData> = {
  'study-mate-ai': {
    slug: 'study-mate-ai',
    title: 'Study Mate AI',
    category: 'AI Utilities',
    tagline: 'AI-driven learning workspace built to synthesize course materials, generate flashcards, and run mock exams.',
    overview: 'Study Mate AI is a personal educational assistant designed to streamline course study workflows. Students can upload large textbooks, lecture notes, and syllabus files, letting the system index topics and generate interactive materials like flashcards and mock exams.',
    problem: 'University coursework often entails navigating hundreds of pages of static slides and PDFs, leading to ineffective cramming. Students waste time manually extracting terms rather than testing their recall.',
    solution: 'Study Mate AI scans local PDF files and uses semantic text chunks parsing to structure course materials. It runs conditional prompting templates to synthesize terms, generating spaced-repetition flashcards and test papers on demand.',
    features: [
      'Automated syllabus indexing and terms extraction.',
      'Vector semantic search matching query context.',
      'Spaced repetition scheduler for flashcards.',
      'Dynamic mock exams compile engine.'
    ],
    techStack: [
      { category: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
      { category: 'Backend & APIs', items: ['Node.js', 'Express', 'Langchain', 'OpenAI API'] },
      { category: 'Database & Cloud', items: ['Supabase DB', 'PGVector', 'Supabase Storage'] }
    ],
    journey: 'Started as a simple python command script loading text outlines. Evolved into a React-based application supporting file uploads, vector storage, and audio dictated review streams.',
    challenges: 'Processing files exceeding 400 pages triggered API timeout rates and high token costs. Resolving this required implementing local chunks preprocessing pipelines.',
    lessons: 'We learned to separate expensive LLM calls from layout parsing workflows, saving computational resources and reducing latency by 45%.',
    githubUrl: 'https://github.com',
    demoUrl: 'https://studymate.ai',
    metrics: [
      { label: 'Lines of Code', value: '4.8k' },
      { label: 'Monthly Active Users', value: '1.2k' },
      { label: 'Syllabus Pages Scanned', value: '14.5k' }
    ],
    relatedSlugs: ['timetable-maker', 'deep-code']
  },
  'timetable-maker': {
    slug: 'timetable-maker',
    title: 'Timetable Maker',
    category: 'Scheduling Algorithms',
    tagline: 'Smart scheduling optimizer for universities, balancing slot preferences, availability, and hall capacities.',
    overview: 'Timetable Maker solves university course scheduling problems by modeling slots, faculty availabilities, hall sizes, and enrollment capacities as linear programming constraints.',
    problem: 'University departments spend days manually compiling schedules. Overlapping faculty choices, room size limitations, and slot clashes cause constant schedule revisions.',
    solution: 'Timetable Maker models course scheduling as a constraint satisfaction problem. It uses heuristic solving routines to search the calendar availability grid and compile conflict-free timetables in seconds.',
    features: [
      'Interactive room capacity and slots parameters panels.',
      'Heuristic conflict-solving algorithm engine.',
      'Real-time double-booking warnings overlay.',
      'PDF department layout exports.'
    ],
    techStack: [
      { category: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS', 'Recharts'] },
      { category: 'Algorithm Engine', items: ['TypeScriptHeuristic Solver'] },
      { category: 'Database', items: ['Supabase DB', 'Supabase Auth'] }
    ],
    journey: 'Developed to replace spreadsheet schedulers in our campus department. Tested and refined across 4 departments to reduce planning stress.',
    challenges: 'The scheduling search space grows exponentially with course count, causing browser lockups. Solved by writing the core solver inside web worker threads.',
    lessons: 'Decoupling heavy CPU algorithms from the React rendering thread keeps the interface responsive and smooth during compile states.',
    githubUrl: 'https://github.com',
    demoUrl: 'https://timetable.ai',
    metrics: [
      { label: 'Algorithm Solve Time', value: '< 2.4s' },
      { label: 'Department Chapters Mapped', value: '4' },
      { label: 'Conflict Mitigations', value: '99.8%' }
    ],
    relatedSlugs: ['study-mate-ai', 'deep-code']
  }
};
