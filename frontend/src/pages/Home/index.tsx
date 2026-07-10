import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useProjects } from '@/hooks/useProjects';
import { useSolutions } from '@/hooks/useSolutions';
import { useNotes } from '@/hooks/useNotes';
import { messagesService } from '@/services/MessagesService';
import { settingsService } from '@/services/SettingsService';
import { 
  ArrowRight, 
  Download, 
  Code, 
  Server, 
  Database, 
  Cpu, 
  Layers, 
  Search, 
  Award, 
  Calendar,
  BookOpen,
  Users,
  TrendingUp,
  ExternalLink,
  Terminal,
  Flag,
  CheckCircle2,
  Lock,
  Compass,
  Heart,
  Sparkles,
  GitBranch,
  Video,
  Play,
  FileText,
  Flame,
  Mail,
  MessageSquare,
  Send,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Briefcase
} from 'lucide-react';
import { HelmetSEO } from '@/components/seo/HelmetSEO';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Counter } from '@/components/ui/Counter';
import { fadeInDirection } from '@/animations/fade';
import avatarImg from '@/assets/avatar.jpg';

interface SkillItem {
  name: string;
  category: 'languages' | 'frontend' | 'backend' | 'ai' | 'databases' | 'tools';
  icon: React.ReactNode;
  level: string;
}

interface JourneyMilestone {
  year: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  iconName?: string;
}

interface ProjectItem {
  slug: string;
  title: string;
  category: 'AI' | 'Education' | 'Web' | 'Community' | 'Open Source' | 'Utilities';
  tagline: string;
  description: string;
  status: 'completed' | 'in-progress' | 'coming-soon';
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  isFeatured: boolean;
  metrics: { label: string; value: string }[];
}

interface ShowcaseSolutionItem {
  slug: string;
  name: string;
  category: 'AI' | 'Education' | 'Productivity' | 'Utilities' | 'Community' | 'Developer Tool';
  icon: React.ReactNode;
  description: string;
  audience: 'Student' | 'Teacher' | 'Developer';
  version: string;
  status: 'active' | 'beta' | 'planned';
  features: string[];
  githubUrl?: string;
  demoUrl?: string;
}

interface CoreValueItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface ChapterPlaceholderItem {
  name: string;
  lead: string;
  status: string;
}

interface CommunityMilestone {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface NoteResourceItem {
  slug: string;
  title: string;
  category: 'Programming' | 'AI' | 'Database' | 'Operating Systems' | 'OOP' | 'DSA' | 'Web Development';
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  fileType: 'PDF' | 'ZIP' | 'Source Code';
  readingTime: string;
  downloads: number;
  lastUpdated: string;
  youtubeUrl?: string;
  youtubeTitle?: string;
  isFeatured: boolean;
}

interface CollabCardItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  categoryValue: string;
}

interface FAQItem {
  q: string;
  a: string;
}

const SKILLS_DATA: SkillItem[] = [
  { name: 'C++', category: 'languages', icon: <Code className="h-5 w-5 text-accent" />, level: '' },
  { name: 'C#', category: 'languages', icon: <Code className="h-5 w-5 text-accent" />, level: '' },
  { name: 'Object-Oriented Programming', category: 'languages', icon: <Code className="h-5 w-5 text-accent" />, level: '' },
  { name: 'AI API Integration', category: 'ai', icon: <Cpu className="h-5 w-5 text-accent" />, level: '' },
  { name: 'Oracle Database', category: 'databases', icon: <Database className="h-5 w-5 text-accent" />, level: '' },
  { name: 'PostgreSQL', category: 'databases', icon: <Database className="h-5 w-5 text-accent" />, level: '' },
  { name: 'Supabase', category: 'databases', icon: <Database className="h-5 w-5 text-accent" />, level: '' },
  { name: 'Streamlit', category: 'tools', icon: <Award className="h-5 w-5 text-accent" />, level: '' },
  { name: 'Vercel', category: 'tools', icon: <Award className="h-5 w-5 text-accent" />, level: '' },
  { name: 'Git', category: 'tools', icon: <Award className="h-5 w-5 text-accent" />, level: '' },
  { name: 'GitHub', category: 'tools', icon: <Award className="h-5 w-5 text-accent" />, level: '' },
  { name: 'Windows Forms Development', category: 'frontend', icon: <Layers className="h-5 w-5 text-accent" />, level: '' },
];



const PROJECTS_DATA: ProjectItem[] = [
  {
    slug: 'study-mate-ai',
    title: 'Study Mate AI',
    category: 'AI',
    tagline: 'AI-driven learning workspace.',
    description: 'Study Mate AI was designed to help university students manage exam preparation by synthesizing large syllabus loads. By combining local file scanning with structured AI parsing, the application reads PDF textbooks, isolates key vocabulary parameters, and generates flashcard grids automatically.',
    status: 'completed',
    techStack: ['React', 'TypeScript', 'Tailwind', 'Supabase', 'Langchain', 'WebRTC'],
    githubUrl: 'https://github.com',
    demoUrl: 'https://studymate.ai',
    isFeatured: true,
    metrics: [
      { label: 'Users', value: '1.2k+' },
      { label: 'Version', value: '1.2.0' },
      { label: 'Launch', value: '2023' }
    ]
  },
  {
    slug: 'timetable-maker',
    title: 'Timetable Maker',
    category: 'Education',
    tagline: 'Smart scheduling optimizer.',
    description: 'Timetable Maker resolves university scheduling conflict scenarios. Class scheduling is notoriously complex, requiring coordinates across student sizes, slot availabilities, faculty preferences, and room capacities. This application implements constraint-solving heuristics to compile conflicts-free schedules in seconds.',
    status: 'completed',
    techStack: ['TypeScript', 'Vite', 'Algorithms', 'Supabase', 'Recharts'],
    githubUrl: 'https://github.com',
    demoUrl: 'https://timetable.ai',
    isFeatured: true,
    metrics: [
      { label: 'Solve Time', value: '< 2.4s' },
      { label: 'Chapters', value: '4' },
      { label: 'Launch', value: '2024' }
    ]
  },
  {
    slug: 'deep-code',
    title: 'Deep Code',
    category: 'Community',
    tagline: 'Developer chapter community.',
    description: 'Deep Code is an open developer community established to coordinate university chapters, build open-source utilities, and organize system workshops. It provides a shared repository of developer companion parsers.',
    status: 'in-progress',
    techStack: ['Vite', 'AST Parser', 'NodeJS', 'Vercel', 'Socket.io'],
    githubUrl: 'https://github.com',
    isFeatured: false,
    metrics: [
      { label: 'Members', value: '1.4k+' },
      { label: 'Chapters', value: '200+' },
      { label: 'Launch', value: '2024' }
    ]
  },
  {
    slug: 'portfolio-os',
    title: 'Portfolio OS',
    category: 'Open Source',
    tagline: 'Modern tech portfolio ecosystem.',
    description: 'A modular, high-performance monorepo platform holding structural layouts, semantic design variables, and dynamic serverless API handlers for personal branding.',
    status: 'completed',
    techStack: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'React Router'],
    githubUrl: 'https://github.com',
    isFeatured: false,
    metrics: [
      { label: 'Stars', value: '12' },
      { label: 'Version', value: '1.0.0' },
      { label: 'Launch', value: '2026' }
    ]
  }
];

const SOLUTIONS_DATA: ShowcaseSolutionItem[] = [
  {
    slug: 'study-mate-ai',
    name: 'Study Mate AI',
    category: 'AI',
    icon: <BookOpen className="h-6 w-6 text-accent animate-pulse" />,
    description: 'Synthesizes course files, generates custom flashcard grids, and compiles historical practice papers.',
    audience: 'Student',
    version: '1.2.0',
    status: 'active',
    features: ['AI Chat Companion', 'Flashcards Deck Builder', 'OCR Text Scanner', 'Mock Exams Scheduler'],
    githubUrl: 'https://github.com',
    demoUrl: 'https://studymate.ai'
  },
  {
    slug: 'timetable-maker',
    name: 'University Timetable Maker',
    category: 'Education',
    icon: <Calendar className="h-6 w-6 text-accent" />,
    description: 'Calculates room occupancy limits, coordinates faculty preferences, and eliminates slot double-bookings.',
    audience: 'Teacher',
    version: '1.0.4',
    status: 'active',
    features: ['Constraint Solve Engine', 'Room Capacities Tracker', 'Teacher Slots Overlaps Check', 'Calendar Export APIs'],
    githubUrl: 'https://github.com',
    demoUrl: 'https://timetable.ai'
  }
];

const VALUES_DATA: CoreValueItem[] = [
  { title: 'Innovation', description: 'Leveraging AI schemas and automation scripts to build systems that work faster.', icon: <Sparkles className="h-5 w-5 text-accent" /> },
  { title: 'Learning', description: 'Empowering students to gain practical production software architecture experiences.', icon: <BookOpen className="h-5 w-5 text-accent" /> },
  { title: 'Community', description: 'Coordinating events, university networks, and peer programming reviews.', icon: <Users className="h-5 w-5 text-accent" /> },
  { title: 'Open Source', description: 'Publishing components, algorithm engines, and libraries publicly.', icon: <Code className="h-5 w-5 text-accent" /> },
  { title: 'Collaboration', description: 'Structuring shared registries, workshops, and student build teams.', icon: <Compass className="h-5 w-5 text-accent" /> },
  { title: 'Impact', description: 'Focusing development on resolving concrete school and student issues.', icon: <Heart className="h-5 w-5 text-accent" /> }
];

const CHAPTERS_DATA: ChapterPlaceholderItem[] = [
  { name: 'Main Campus Chapter', lead: 'Ali', status: 'Coming Soon' },
  { name: 'Science & Tech Branch', lead: 'TBD', status: 'Coming Soon' }
];

const DEEPCODE_ROADMAP: CommunityMilestone[] = [
  { title: 'Launch Deep Code Platform', description: 'Assemble student directories and central repository indexes.', icon: <Code className="h-4 w-4" /> },
  { title: 'First University Chapter', description: 'Form local campus squads and host system assembly workshops.', icon: <Compass className="h-4 w-4" /> },
  { title: 'Open Source Initiative', description: 'Publish shared components libraries and scrapers.', icon: <GitBranch className="h-4 w-4" /> },
  { title: 'Annual Tech Hackathon', description: 'Structure code challenges solving campus problems.', icon: <Award className="h-4 w-4" /> }
];

const NOTES_DATA: NoteResourceItem[] = [];

const COLLABS_DATA: CollabCardItem[] = [
  { title: 'Software Projects', description: 'Designing production-grade full-stack apps and AI wrappers.', icon: <Code className="h-5 w-5 text-accent" />, categoryValue: 'projects' },
  { title: 'Deep Code Chapters', description: 'Founding or coordinating local campus engineering guilds.', icon: <Compass className="h-5 w-5 text-accent" />, categoryValue: 'community' },
  { title: 'Student Mentoring', description: 'Direct academic guidance, resume review, and career prep support.', icon: <BookOpen className="h-5 w-5 text-accent" />, categoryValue: 'guidance' },
  { title: 'Career & Recruiter', description: 'Consulting opportunities, roles fitment, and tech alignments.', icon: <Briefcase className="h-5 w-5 text-accent" />, categoryValue: 'consulting' },
  { title: 'General Inquiries', description: 'Feedback, system suggestions, and developer networking.', icon: <MessageSquare className="h-5 w-5 text-accent" />, categoryValue: 'general' }
];

const FAQS_DATA: FAQItem[] = [
  { q: 'Can we collaborate?', a: 'Yes! I am open to working on open-source packages, custom university software, and AI optimization systems.' },
  { q: 'Can I contribute to Deep Code?', a: 'Absolutely. Deep Code chapters registry is open for student pull requests, campus leads, and workshop modules additions.' },
  { q: 'Can I use your notes?', a: 'Yes. All educational cheat sheets, PDF guides, and code scripts are free to download and reuse.' },
  { q: 'How do I report bugs?', a: 'Submit details directly through this contact form, or open an issue on the Portfolio OS GitHub repository page.' }
];

const Home: React.FC = () => {
  const navigate = useNavigate();

  const { data: dbProjects } = useProjects();
  const { data: dbSolutions } = useSolutions();
  const { data: dbNotes } = useNotes();

  const projectsToUse = dbProjects.length > 0 ? dbProjects.map(p => ({
    slug: p.slug,
    title: p.title,
    category: p.category as any,
    tagline: p.tagline,
    description: p.overview,
    status: (p.githubUrl ? 'completed' : 'in-progress') as any,
    techStack: p.techStack ? p.techStack.flatMap(t => t.items) : [],
    githubUrl: p.githubUrl,
    demoUrl: p.demoUrl,
    isFeatured: p.slug === 'study-mate-ai' || p.slug === 'timetable-maker',
    metrics: p.metrics || []
  })) : PROJECTS_DATA;

  const solutionsToUse = dbSolutions.length > 0 ? dbSolutions.map(s => ({
    slug: s.slug,
    name: s.name,
    category: s.category as any,
    icon: <Server className="h-6 w-6 text-accent" />,
    description: s.tagline,
    audience: s.audience as any,
    version: s.version,
    status: 'active' as any,
    features: s.features || [],
    githubUrl: s.githubUrl,
    demoUrl: s.demoUrl
  })) : SOLUTIONS_DATA;

  const notesToUse = dbNotes.length > 0 ? dbNotes.map(n => ({
    slug: n.slug,
    title: n.title,
    category: n.category as any,
    description: n.description,
    difficulty: n.difficulty,
    fileType: n.fileType as any,
    readingTime: n.readingTime,
    downloads: n.downloadsCount,
    lastUpdated: n.lastUpdated,
    youtubeUrl: n.youtubeUrl,
    youtubeTitle: n.youtubeTitle,
    isFeatured: n.slug === 'advanced-typescript-notes'
  })) : NOTES_DATA;
  
  // States
  const [skillSearch, setSkillSearch] = useState('');
  const [activeSkillTab, setActiveSkillTab] = useState<'all' | 'languages' | 'frontend' | 'backend' | 'ai' | 'databases' | 'tools'>('all');
  const [activeProjectFilter, setActiveProjectFilter] = useState<'All' | 'AI' | 'Education' | 'Web' | 'Community' | 'Open Source' | 'Utilities'>('All');
  const [solutionSearch, setSolutionSearch] = useState('');
  const [notesSearch, setNotesSearch] = useState('');
  const [activeNotesFilter, setActiveNotesFilter] = useState<'All' | 'Programming' | 'AI' | 'Database' | 'Operating Systems' | 'DSA' | 'Web Development'>('All');
  const [notesDifficultyFilter, setNotesDifficultyFilter] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');

  // Contact Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('general');
  const [message, setMessage] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // FAQ Accordion State
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  // Newsletter subscription states
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Hero Section Dynamic States
  const [heroHeadline, setHeroHeadline] = useState('Building tools that solve real problems — one line of code at a time.');
  const [heroSubtitle, setHeroSubtitle] = useState('CS Student @ University | Founder of Deep Code');
  const [heroDescription, setHeroDescription] = useState("I'm a software developer focused on designing full-stack systems, automated learning tools, and coordinating open campus developer networks.");

  // Dynamic Section Settings
  const [sec01Title, setSec01Title] = useState('01 / Story & Mission');
  const [sec01Headline, setSec01Headline] = useState('Engineering solutions for educational systems.');
  const [sec01Desc, setSec01Desc] = useState(`I'm a Computer Science student dedicated to developing systems that address actual constraints. My mission is to bridge the gap between academic theory and practical developer execution.\n\nAs the founder of Deep Code, I coordinate university developer networks, building tools like Study Mate AI to synthesize course documents and help students review materials dynamically.`);

  const [sec02Title, setSec02Title] = useState('02 / Capabilities');
  const [sec02Headline, setSec02Headline] = useState('Skills & Tooling Matrix');

  const [sec03Title, setSec03Title] = useState('03 / Milestones');
  const [sec03Val1, setSec03Val1] = useState(12);
  const [sec03Lbl1, setSec03Lbl1] = useState('Projects Shipped');
  const [sec03Val2, setSec03Val2] = useState(1500);
  const [sec03Lbl2, setSec03Lbl2] = useState('Students Helped');
  const [sec03Val3, setSec03Val3] = useState(4);
  const [sec03Lbl3, setSec03Lbl3] = useState('Years Learning');
  const [sec03Val4, setSec03Val4] = useState(10);
  const [sec03Lbl4, setSec03Lbl4] = useState('Technologies');

  const [sec04Title, setSec04Title] = useState('04 / Software Catalog');
  const [sec04Headline, setSec04Headline] = useState('Featured Projects');
  const [sec04Desc, setSec04Desc] = useState("A collection of software, AI tools, and educational platforms I've built to solve real problems.");

  const [sec05Title, setSec05Title] = useState('05 / Operational Products');
  const [sec05Headline, setSec05Headline] = useState('SaaS Products & Deployed Solutions');
  const [sec05Desc, setSec05Desc] = useState('Explore commercial deployments, release frameworks, and target user statistics.');

  const [sec06Title, setSec06Title] = useState('06 / Developer Society Network');
  const [sec06Headline, setSec06Headline] = useState('Deep Code Campus Chapters');
  const [sec06Desc, setSec06Desc] = useState('Scaling student-built technologies solving real academic issues.');

  const [sec07Title, setSec07Title] = useState('07 / Educational Resources Registry');
  const [sec07Headline, setSec07Headline] = useState('University Cheat Sheets & Technical Notes');
  const [sec07Desc, setSec07Desc] = useState('Download open-source study guides, algorithm screencasts, and exam notes.');

  const [sec08Title, setSec08Title] = useState('08 / Direct Inquiries Gateway');
  const [sec08Headline, setSec08Headline] = useState("Let's Build Something Meaningful");
  const [sec08Desc, setSec08Desc] = useState("Whether you're a student, developer, educator, recruiter, or organization, I'd love to hear from you. Let's build something that creates real impact.");

  const [roadmap, setRoadmap] = useState<JourneyMilestone[]>([]);

  const getRoadmapIcon = (name?: string) => {
    switch (name) {
      case 'Code':
        return <Code className="h-4 w-4" />;
      case 'Award':
        return <Award className="h-4 w-4" />;
      case 'Users':
        return <Users className="h-4 w-4" />;
      case 'BookOpen':
        return <BookOpen className="h-4 w-4" />;
      case 'Cpu':
        return <Cpu className="h-4 w-4" />;
      case 'TrendingUp':
      default:
        return <TrendingUp className="h-4 w-4" />;
    }
  };

  React.useEffect(() => {
    const fetchSettings = async () => {
      try {
        const headline = await settingsService.getSetting('heroHeadline', 'Building tools that solve real problems — one line of code at a time.');
        const sub = await settingsService.getSetting('heroSubtitle', 'CS Student @ University | Founder of Deep Code');
        const desc = await settingsService.getSetting('heroDescription', "I'm a software developer focused on designing full-stack systems, automated learning tools, and coordinating open campus developer networks.");
        setHeroHeadline(headline);
        setHeroSubtitle(sub);
        setHeroDescription(desc);

        const s01T = await settingsService.getSetting('sec01Title', '01 / Story & Mission');
        const s01H = await settingsService.getSetting('sec01Headline', 'Engineering solutions for educational systems.');
        const s01D = await settingsService.getSetting('sec01Desc', `I'm a Computer Science student dedicated to developing systems that address actual constraints. My mission is to bridge the gap between academic theory and practical developer execution.\n\nAs the founder of Deep Code, I coordinate university developer networks, building tools like Study Mate AI to synthesize course documents and help students review materials dynamically.`);
        setSec01Title(s01T);
        setSec01Headline(s01H);
        setSec01Desc(s01D);

        const s02T = await settingsService.getSetting('sec02Title', '02 / Capabilities');
        const s02H = await settingsService.getSetting('sec02Headline', 'Skills & Tooling Matrix');
        setSec02Title(s02T);
        setSec02Headline(s02H);

        const s03T = await settingsService.getSetting('sec03Title', '03 / Milestones');
        const s03V1 = await settingsService.getSetting('sec03Val1', '12');
        const s03L1 = await settingsService.getSetting('sec03Lbl1', 'Projects Shipped');
        const s03V2 = await settingsService.getSetting('sec03Val2', '1500');
        const s03L2 = await settingsService.getSetting('sec03Lbl2', 'Students Helped');
        const s03V3 = await settingsService.getSetting('sec03Val3', '4');
        const s03L3 = await settingsService.getSetting('sec03Lbl3', 'Years Learning');
        const s03V4 = await settingsService.getSetting('sec03Val4', '10');
        const s03L4 = await settingsService.getSetting('sec03Lbl4', 'Technologies');
        setSec03Title(s03T);
        setSec03Val1(Number(s03V1));
        setSec03Lbl1(s03L1);
        setSec03Val2(Number(s03V2));
        setSec03Lbl2(s03L2);
        setSec03Val3(Number(s03V3));
        setSec03Lbl3(s03L3);
        setSec03Val4(Number(s03V4));
        setSec03Lbl4(s03L4);

        const s04T = await settingsService.getSetting('sec04Title', '04 / Software Catalog');
        const s04H = await settingsService.getSetting('sec04Headline', 'Featured Projects');
        const s04D = await settingsService.getSetting('sec04Desc', "A collection of software, AI tools, and educational platforms I've built to solve real problems.");
        setSec04Title(s04T);
        setSec04Headline(s04H);
        setSec04Desc(s04D);

        const s05T = await settingsService.getSetting('sec05Title', '05 / Operational Products');
        const s05H = await settingsService.getSetting('sec05Headline', 'SaaS Products & Deployed Solutions');
        const s05D = await settingsService.getSetting('sec05Desc', 'Explore commercial deployments, release frameworks, and target user statistics.');
        setSec05Title(s05T);
        setSec05Headline(s05H);
        setSec05Desc(s05D);

        const s06T = await settingsService.getSetting('sec06Title', '06 / Developer Society Network');
        const s06H = await settingsService.getSetting('sec06Headline', 'Deep Code Campus Chapters');
        const s06D = await settingsService.getSetting('sec06Desc', 'Scaling student-built technologies solving real academic issues.');
        setSec06Title(s06T);
        setSec06Headline(s06H);
        setSec06Desc(s06D);

        const s07T = await settingsService.getSetting('sec07Title', '07 / Educational Resources Registry');
        const s07H = await settingsService.getSetting('sec07Headline', 'University Cheat Sheets & Technical Notes');
        const s07D = await settingsService.getSetting('sec07Desc', 'Download open-source study guides, algorithm screencasts, and exam notes.');
        setSec07Title(s07T);
        setSec07Headline(s07H);
        setSec07Desc(s07D);

        const s08T = await settingsService.getSetting('sec08Title', '08 / Direct Inquiries Gateway');
        const s08H = await settingsService.getSetting('sec08Headline', "Let's Build Something Meaningful");
        const s08D = await settingsService.getSetting('sec08Desc', "Whether you're a student, developer, educator, recruiter, or organization, I'd love to hear from you. Let's build something that creates real impact.");
        setSec08Title(s08T);
        setSec08Headline(s08H);
        setSec08Desc(s08D);

        const roadStr = await settingsService.getSetting(
          'journeyRoadmap', 
          JSON.stringify([
            { year: '2022 - 2023', title: 'Learned Programming Fundamentals', description: 'Started programming to solve problems and create efficiency, learning C++ and C#.', iconName: 'Code' },
            { year: '2024 - 2025', title: 'Explored Software Development', description: 'Developed desktop utility tools, including Timetable Maker, and built projects with Streamlit.', iconName: 'Award' },
            { year: '2025', title: 'Began University Journey', description: 'Enrolled in BS Computer Science at University of Engineering and Technology (RCET) to study theory.', iconName: 'Users' },
            { year: 'Present', title: 'Building Projects & Deep Code', description: 'Currently building Study Mate AI, Personal Portfolio Platform, and planning Deep Code.', iconName: 'Cpu' },
            { year: 'Future', title: 'Entrepreneurship & Innovation', description: 'Aiming to create innovative technology products and businesses that solve real-world problems.', iconName: 'TrendingUp' }
          ])
        );
        setRoadmap(JSON.parse(roadStr));
      } catch (err) {
        console.error('Error fetching settings:', err);
      }
    };
    fetchSettings();
  }, []);

  const filteredSkills = SKILLS_DATA.filter((skill) => {
    const matchesSearch = skill.name.toLowerCase().includes(skillSearch.toLowerCase());
    const matchesTab = activeSkillTab === 'all' || skill.category === activeSkillTab;
    return matchesSearch && matchesTab;
  });

  const filteredProjects = projectsToUse.filter((project) => {
    return activeProjectFilter === 'All' || project.category === activeProjectFilter;
  });

  const filteredSolutions = solutionsToUse.filter((sol) => {
    return sol.name.toLowerCase().includes(solutionSearch.toLowerCase()) ||
           sol.description.toLowerCase().includes(solutionSearch.toLowerCase());
  });

  const filteredNotes = notesToUse.filter((note) => {
    const matchesSearch = note.title.toLowerCase().includes(notesSearch.toLowerCase()) ||
                          note.description.toLowerCase().includes(notesSearch.toLowerCase());
    const matchesCategory = activeNotesFilter === 'All' || note.category === activeNotesFilter;
    const matchesDifficulty = notesDifficultyFilter === 'All' || note.difficulty === notesDifficultyFilter;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const alternatingFeatured = filteredProjects.filter(p => p.isFeatured).slice(0, 2);
  const remainingProjects = filteredProjects.filter(p => !p.isFeatured || !alternatingFeatured.includes(p));

  const featuredNote = filteredNotes.find(note => note.isFeatured);
  const regularNotes = filteredNotes.filter(note => note !== featuredNote);
  const popularNotes = [...notesToUse].sort((a, b) => b.downloads - a.downloads).slice(0, 3);

  // Form submission handler
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setFormStatus('error');
      return;
    }
    setFormStatus('loading');
    try {
      await messagesService.createMessage({
        name,
        email,
        subject: subject || '',
        category,
        message
      });
      setFormStatus('success');
      setName('');
      setEmail('');
      setSubject('');
      setCategory('general');
      setMessage('');
    } catch (err) {
      console.error('Error submitting form:', err);
      setFormStatus('error');
    }
  };

  // Newsletter submission handler
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterStatus('loading');
    try {
      await messagesService.subscribeNewsletter(newsletterEmail);
      setNewsletterStatus('success');
      setNewsletterEmail('');
    } catch (err) {
      console.error('Error subscribing to newsletter:', err);
      setNewsletterStatus('error');
    }
  };

  return (
    <div className="space-y-24 pb-16">
      <HelmetSEO 
        title="Home" 
        description="Ali Portfolio OS - CS Student, Software Developer, and Founder of Deep Code."
      />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-x-hidden min-h-[calc(100vh-8rem)] flex flex-col justify-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-12 md:py-20 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column */}
            <motion.div
              variants={fadeInDirection('up')}
              initial="hidden"
              animate="visible"
              viewport={{ once: true }}
              className="lg:col-span-7 space-y-6 text-left"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/10 bg-surface text-xs font-mono tracking-wider shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </span>
                <span className="text-muted">Available for new projects</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-text leading-[1.1] -letter-spacing-[0.04em]" dangerouslySetInnerHTML={{ __html: heroHeadline }} />

              <div className="space-y-3">
                <p className="text-sm font-bold font-mono text-accent uppercase tracking-wider">
                  {heroSubtitle}
                </p>
                <p className="text-base sm:text-lg text-muted max-w-xl leading-relaxed">
                  {heroDescription}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <Badge variant="tech">React</Badge>
                <Badge variant="tech">TypeScript</Badge>
                <Badge variant="tech">Node.js</Badge>
                <Badge variant="tech">Supabase</Badge>
                <Badge variant="tech">Algorithms</Badge>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button variant="primary" size="lg" onClick={() => navigate('/projects')}>
                  View My Work <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" onClick={() => navigate('/contact')}>
                  Contact Me
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-4 text-xs font-mono text-muted uppercase tracking-wider">
                <span>Find me on:</span>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-accent flex items-center gap-1.5 transition-colors duration-200"
                  aria-label="GitHub Profile"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                  GitHub
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-accent flex items-center gap-1.5 transition-colors duration-200"
                  aria-label="LinkedIn Profile"
                >
                  <span className="font-bold lowercase">in</span> LinkedIn
                </a>
              </div>
            </motion.div>

            {/* Right Column */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
              <motion.div
                animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-10 left-10 h-72 w-72 rounded-full bg-accent/5 blur-3xl z-0 pointer-events-none"
              />
              <motion.div
                animate={{ x: [0, -30, 0], y: [0, -40, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-10 -right-10 h-80 w-80 rounded-full bg-highlight/5 blur-3xl z-0 pointer-events-none"
              />

              <motion.div
                variants={fadeInDirection('up')}
                initial="hidden"
                animate="visible"
                viewport={{ once: true }}
                custom={{ delay: 0.15 }}
                className="relative z-10"
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="p-3 bg-surface border border-primary/5 rounded-3xl shadow-xl hover:shadow-2xl hover:border-accent/10 transition-all duration-300"
                >
                  <div className="relative h-80 w-60 sm:h-96 sm:w-72 lg:h-[450px] lg:w-[337px] rounded-2xl overflow-hidden bg-background">
                    <img
                      src={avatarImg}
                      alt="Ali Portrait"
                      className="h-full w-full object-cover"
                      loading="eager"
                    />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT ME SECTION */}
      <motion.section
        variants={fadeInDirection('up')}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-wider">
              <Users className="h-4 w-4" />
              <span>{sec01Title}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text">
              {sec01Headline}
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-muted leading-relaxed max-w-2xl whitespace-pre-wrap">
              {sec01Desc}
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button variant="primary" onClick={() => navigate('/projects')}>
                View Projects
              </Button>
              <Button variant="outline" onClick={() => navigate('/resume')}>
                <Download className="mr-2 h-4 w-4" /> Download Resume
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4" aria-label={sec03Title}>
            <Card className="flex flex-col justify-center p-6 text-center space-y-2 bg-surface border border-primary/5 shadow-sm hover:shadow-md transition-shadow">
              <Counter value={sec03Val1} suffix="+" className="text-3xl sm:text-4xl font-extrabold text-accent font-mono" />
              <p className="text-[10px] sm:text-xs text-muted uppercase font-mono tracking-wider font-medium">{sec03Lbl1}</p>
            </Card>
            <Card className="flex flex-col justify-center p-6 text-center space-y-2 bg-surface border border-primary/5 shadow-sm hover:shadow-md transition-shadow">
              <Counter value={sec03Val2} suffix="+" className="text-3xl sm:text-4xl font-extrabold text-accent font-mono" />
              <p className="text-[10px] sm:text-xs text-muted uppercase font-mono tracking-wider font-medium">{sec03Lbl2}</p>
            </Card>
            <Card className="flex flex-col justify-center p-6 text-center space-y-2 bg-surface border border-primary/5 shadow-sm hover:shadow-md transition-shadow">
              <Counter value={sec03Val3} suffix="+" className="text-3xl sm:text-4xl font-extrabold text-accent font-mono" />
              <p className="text-[10px] sm:text-xs text-muted uppercase font-mono tracking-wider font-medium">{sec03Lbl3}</p>
            </Card>
            <Card className="flex flex-col justify-center p-6 text-center space-y-2 bg-surface border border-primary/5 shadow-sm hover:shadow-md transition-shadow">
              <Counter value={sec03Val4} suffix="+" className="text-3xl sm:text-4xl font-extrabold text-accent font-mono" />
              <p className="text-[10px] sm:text-xs text-muted uppercase font-mono tracking-wider font-medium">{sec03Lbl4}</p>
            </Card>
          </div>
        </div>
      </motion.section>

      {/* 3. SKILLS SECTION */}
      <motion.section
        variants={fadeInDirection('up')}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full space-y-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-primary/10 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-wider">
              <Code className="h-4 w-4" />
              <span>{sec02Title}</span>
            </div>
            <h2 className="text-3xl font-extrabold text-text">{sec02Headline}</h2>
          </div>
          
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted" />
            <input
              type="text"
              placeholder="Search technologies..."
              value={skillSearch}
              onChange={(e) => setSkillSearch(e.target.value)}
              className="w-full rounded-lg bg-surface border border-primary/10 pl-9 pr-4 py-2 text-text placeholder-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent text-sm"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {(['all', 'languages', 'frontend', 'backend', 'ai', 'databases', 'tools'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSkillTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                activeSkillTab === tab 
                  ? 'bg-accent/15 text-accent font-semibold border border-accent/20' 
                  : 'text-muted bg-surface border border-primary/5 hover:border-primary/20 hover:text-text'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredSkills.map((skill, idx) => (
            <Card 
              key={idx} 
              className="bg-surface border border-primary/5 p-5 flex items-center gap-4 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
            >
              <div className="p-2 bg-accent/5 rounded-lg shrink-0">
                {skill.icon}
              </div>
              <div className="space-y-1 flex-1">
                <h4 className="font-bold text-text text-sm sm:text-base">{skill.name}</h4>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-muted uppercase font-mono tracking-wider">{skill.category}</span>
                  <span className="text-[10px] text-accent font-mono font-semibold">{skill.level}</span>
                </div>
              </div>
            </Card>
          ))}

          {filteredSkills.length === 0 && (
            <div className="col-span-full py-8 text-center text-xs text-muted font-mono">
              No matching technologies registered in directory.
            </div>
          )}
        </div>
      </motion.section>

      {/* 4. MY JOURNEY TIMELINE */}
      <motion.section
        variants={fadeInDirection('up')}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full space-y-12"
      >
        <div className="border-b border-primary/10 pb-4">
          <div className="flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-wider">
            <Calendar className="h-4 w-4" />
            <span>03 / Milestones</span>
          </div>
          <h2 className="text-3xl font-extrabold text-text mt-1">Journey Roadmap</h2>
        </div>

        <div className="relative max-w-4xl mx-auto py-8">
          <div className="absolute top-0 bottom-0 left-4 md:left-1/2 w-0.5 bg-primary/10 transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {roadmap.map((milestone, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div key={idx} className="relative flex flex-col md:flex-row md:items-center">
                  <div className="absolute left-4 md:left-1/2 h-8 w-8 rounded-full border-4 border-background bg-accent text-white flex items-center justify-center transform -translate-x-1/2 z-10 shadow-sm">
                    {getRoadmapIcon(milestone.iconName)}
                  </div>

                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 md:pr-12 md:text-right ${isEven ? 'block' : 'md:invisible md:h-0 overflow-hidden'}`}>
                    {isEven && (
                      <motion.div
                        variants={fadeInDirection('right')}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="bg-surface border border-primary/5 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                      >
                        <span className="text-xs font-mono font-bold text-accent">{milestone.year}</span>
                        <h4 className="font-bold text-text mt-1 text-base sm:text-lg">{milestone.title}</h4>
                        <p className="text-xs sm:text-sm text-muted mt-2 leading-relaxed">{milestone.description}</p>
                      </motion.div>
                    )}
                  </div>

                  <div className="hidden md:block w-0" />

                  <div className={`w-full md:w-1/2 pl-12 ${!isEven ? 'block' : 'md:invisible md:h-0 overflow-hidden'}`}>
                    {(!isEven || window.innerWidth < 768) && (
                      <motion.div
                        variants={fadeInDirection('left')}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="bg-surface border border-primary/5 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                      >
                        <span className="text-xs font-mono font-bold text-accent">{milestone.year}</span>
                        <h4 className="font-bold text-text mt-1 text-base sm:text-lg">{milestone.title}</h4>
                        <p className="text-xs sm:text-sm text-muted mt-2 leading-relaxed">{milestone.description}</p>
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* 5. FEATURED PROJECTS SECTION */}
      <motion.section
        variants={fadeInDirection('up')}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full space-y-12"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-primary/10 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-wider">
              <Flag className="h-4 w-4" />
              <span>{sec04Title}</span>
            </div>
            <h2 className="text-3xl font-extrabold text-text">{sec04Headline}</h2>
            <p className="text-xs sm:text-sm text-muted max-w-xl">
              {sec04Desc}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {(['All', 'AI', 'Education', 'Web', 'Community', 'Open Source', 'Utilities'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveProjectFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                  activeProjectFilter === cat 
                    ? 'bg-accent/15 text-accent font-semibold border border-accent/20' 
                    : 'text-muted bg-surface border border-primary/5 hover:border-primary/20 hover:text-text'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-16">
          {alternatingFeatured.map((project, idx) => {
            const isImageLeft = idx % 2 === 0;

            return (
              <motion.div
                key={project.slug}
                variants={fadeInDirection('up')}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-primary/5 bg-surface/50 rounded-3xl p-6 sm:p-8 hover:shadow-md transition-shadow"
              >
                <div className={`lg:col-span-6 overflow-hidden rounded-2xl border border-primary/10 bg-background aspect-video flex justify-center items-center relative group ${
                  isImageLeft ? 'lg:order-first' : 'lg:order-last'
                }`}>
                  <Terminal className="h-10 w-10 text-accent/40 absolute z-10 animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-highlight/5 z-0" />
                  <span className="text-[10px] font-mono text-muted uppercase tracking-widest relative z-10 mt-12">Cover Placeholder (16:9)</span>
                </div>

                <div className="lg:col-span-6 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded bg-accent/15 text-accent">
                      {project.category}
                    </span>
                    <span className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded ${
                      project.status === 'completed' ? 'bg-success/15 text-success' : 'bg-warning/15 text-warning'
                    }`}>
                      {project.status}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-text">{project.title}</h3>
                    <p className="text-sm font-semibold text-accent font-mono">{project.tagline}</p>
                    <p className="text-sm text-muted leading-relaxed max-w-xl">{project.description}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 border-y border-primary/10 py-4">
                    {project.metrics.map((metric, mIdx) => (
                      <div key={mIdx} className="space-y-1 text-left">
                        <span className="text-[10px] text-muted uppercase font-mono tracking-wider">{metric.label}</span>
                        <p className="text-base font-extrabold text-accent font-mono">{metric.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 5).map((tech) => (
                      <span key={tech} className="px-2 py-0.5 rounded bg-primary/5 text-muted font-mono text-[10px]">
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 5 && (
                      <span className="px-2 py-0.5 rounded bg-accent/5 text-accent font-mono text-[10px] font-bold">
                        +{project.techStack.length - 5} More
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 pt-2">
                    <Button variant="primary" size="sm" onClick={() => navigate(`/projects/${project.slug}`)}>
                      View Project <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm">
                          GitHub
                        </Button>
                      </a>
                    )}
                    {project.demoUrl && (
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="sm" className="text-accent">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {remainingProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {remainingProjects.map((project) => (
              <motion.div
                key={project.slug}
                variants={fadeInDirection('up')}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <Card className="flex flex-col justify-between h-full bg-surface border border-primary/5 p-6 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-accent/15 text-accent">
                        {project.category}
                      </span>
                      <span className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded ${
                        project.status === 'completed' ? 'bg-success/15 text-success' : 'bg-warning/15 text-warning'
                      }`}>
                        {project.status}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-text">{project.title}</h3>
                    <p className="text-xs text-muted leading-relaxed">{project.description}</p>

                    <div className="grid grid-cols-3 gap-2 border-y border-primary/5 py-3">
                      {project.metrics.map((metric, mIdx) => (
                        <div key={mIdx} className="space-y-0.5 text-left">
                          <span className="text-[9px] text-muted uppercase font-mono tracking-wider">{metric.label}</span>
                          <p className="text-xs font-bold text-accent font-mono">{metric.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 pt-6">
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.slice(0, 5).map((tech) => (
                        <span key={tech} className="px-2 py-0.5 rounded bg-primary/5 text-muted font-mono text-[10px]">
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 5 && (
                        <span className="px-2 py-0.5 rounded bg-accent/5 text-accent font-mono text-[10px] font-bold">
                          +{project.techStack.length - 5}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      <Button variant="outline" size="sm" onClick={() => navigate(`/projects/${project.slug}`)} className="w-full text-xs">
                        View Case Study <ArrowRight className="ml-2 h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>

      {/* 6. SOLUTIONS SHOWCASE SECTION */}
      <motion.section
        variants={fadeInDirection('up')}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full space-y-12"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-primary/10 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-wider">
              <Lock className="h-4 w-4" />
              <span>{sec05Title}</span>
            </div>
            <h2 className="text-3xl font-extrabold text-text">{sec05Headline}</h2>
            <p className="text-xs sm:text-sm text-muted max-w-xl">
              {sec05Desc}
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted" />
            <input
              type="text"
              placeholder="Search solutions..."
              value={solutionSearch}
              onChange={(e) => setSolutionSearch(e.target.value)}
              className="w-full rounded-lg bg-surface border border-primary/10 pl-9 pr-4 py-2 text-text placeholder-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredSolutions.map((sol) => (
            <Card 
              key={sol.slug} 
              className="bg-surface border border-primary/5 p-6 hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-accent/5 rounded-xl border border-accent/10">
                      {sol.icon}
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-text">{sol.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-mono text-muted">v{sol.version}</span>
                        <span className="h-3 w-px bg-primary/10" />
                        <span className="text-[10px] font-mono uppercase tracking-wider text-accent">{sol.audience}</span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-accent/15 text-accent">
                    {sol.category}
                  </span>
                </div>

                <p className="text-sm text-muted leading-relaxed">{sol.description}</p>

                <div className="space-y-2 pt-2">
                  <span className="text-[10px] text-muted font-mono uppercase tracking-wider font-semibold">Key Capabilities:</span>
                  <ul className="grid grid-cols-2 gap-2">
                    {sol.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2 text-xs text-muted">
                        <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-primary/5 pt-4 mt-6">
                <div className="flex gap-2">
                  <Button variant="primary" size="sm" onClick={() => sol.demoUrl && window.open(sol.demoUrl, '_blank')}>
                    Launch Solution
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => navigate(`/solutions`)}>
                    Learn More
                  </Button>
                </div>

                <div className="flex gap-2">
                  {sol.githubUrl && (
                    <a href={sol.githubUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 text-muted hover:text-accent" aria-label="GitHub Repository">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </Card>
          ))}

          {filteredSolutions.length === 0 && (
            <div className="col-span-full py-8 text-center text-xs text-muted font-mono">
              No matching solutions found.
            </div>
          )}
        </div>
      </motion.section>

      {/* 7. DEEP CODE COMMUNITY SECTION */}
      <motion.section
        variants={fadeInDirection('up')}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full space-y-12"
      >
        <div className="border-b border-primary/10 pb-4">
          <div className="flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-wider">
            <Compass className="h-4 w-4" />
            <span>{sec06Title}</span>
          </div>
          <h2 className="text-3xl font-extrabold text-text mt-1">{sec06Headline}</h2>
          <p className="text-xs sm:text-sm text-muted max-w-xl">
            {sec06Desc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-surface border border-primary/5 p-6 space-y-3">
            <h3 className="text-lg font-bold text-accent font-mono">Our Mission</h3>
            <p className="text-sm text-muted leading-relaxed">
              Deep Code exists to empower students through peer software collaborations, AI innovational workshops, and open-source contributions. We believe that by building tools in structured university chapters, developers gain real deployment experiences while building solutions that serve concrete academic needs.
            </p>
          </Card>
          <Card className="bg-surface border border-primary/5 p-6 space-y-3">
            <h3 className="text-lg font-bold text-accent font-mono">Our Vision</h3>
            <p className="text-sm text-muted leading-relaxed">
              We aim to scale a global university chapter network that hosts annual tech hackathons, structures shared learning resources repositories, and contributes modular libraries back to the developer community ecosystem.
            </p>
          </Card>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs font-mono uppercase text-muted tracking-wider">Core Visual Constitution Values</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES_DATA.map((val, idx) => (
              <Card key={idx} className="bg-surface border border-primary/5 p-5 flex items-start gap-4 hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300">
                <div className="p-2 bg-accent/5 rounded-lg shrink-0">
                  {val.icon}
                </div>
                <div className="space-y-1">
                  <h5 className="font-bold text-text text-sm sm:text-base">{val.title}</h5>
                  <p className="text-xs text-muted leading-relaxed">{val.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            <h4 className="text-xs font-mono uppercase text-muted tracking-wider">Active Campus Registry</h4>
            <Card className="bg-surface border border-primary/5 overflow-hidden">
              <div className="divide-y divide-primary/5">
                {CHAPTERS_DATA.map((chap, idx) => (
                  <div key={idx} className="flex justify-between items-center p-4">
                    <div>
                      <h5 className="font-bold text-text text-sm sm:text-base">{chap.name}</h5>
                      <span className="text-[10px] text-muted font-mono">Lead: {chap.lead}</span>
                    </div>
                    <Badge variant="status" className="bg-accent/5 text-accent border-accent/10">
                      {chap.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-xs font-mono uppercase text-muted tracking-wider">Community Registry Metrics</h4>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-surface border border-primary/5 p-5 text-center space-y-1">
                <Counter value={250} suffix="+" className="text-2xl font-extrabold text-accent font-mono" />
                <p className="text-[9px] text-muted uppercase font-mono tracking-wider">Active Members</p>
              </Card>
              <Card className="bg-surface border border-primary/5 p-5 text-center space-y-1">
                <Counter value={10} suffix="+" className="text-2xl font-extrabold text-accent font-mono" />
                <p className="text-[9px] text-muted uppercase font-mono tracking-wider">Projects Shipped</p>
              </Card>
              <Card className="bg-surface border border-primary/5 p-5 text-center space-y-1">
                <Counter value={400} suffix="+" className="text-2xl font-extrabold text-accent font-mono" />
                <p className="text-[9px] text-muted uppercase font-mono tracking-wider">Commits Made</p>
              </Card>
              <Card className="bg-surface border border-primary/5 p-5 text-center space-y-1">
                <Counter value={6} suffix="+" className="text-2xl font-extrabold text-accent font-mono" />
                <p className="text-[9px] text-muted uppercase font-mono tracking-wider">Events Hosted</p>
              </Card>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-xs font-mono uppercase text-muted tracking-wider">Operational Growth Roadmap</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {DEEPCODE_ROADMAP.map((road, idx) => (
              <Card key={idx} className="bg-surface border border-primary/5 p-5 space-y-3 relative">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-accent">Phase 0{idx + 1}</span>
                  <div className="p-1.5 bg-accent/5 rounded text-accent">
                    {road.icon}
                  </div>
                </div>
                <h5 className="font-bold text-text text-sm">{road.title}</h5>
                <p className="text-xs text-muted leading-relaxed">{road.description}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs font-mono uppercase text-muted tracking-wider">Workshop Gallery</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Hackathons', 'Workshops', 'Meetups', 'Student Projects'].map((label, idx) => (
              <div key={idx} className="aspect-[4/3] rounded-2xl border border-dashed border-primary/10 bg-surface/50 flex flex-col justify-center items-center p-4 text-center">
                <Video className="h-6 w-6 text-muted mb-2 animate-pulse" />
                <span className="text-[10px] font-mono text-muted uppercase tracking-wider">{label} Placeholder</span>
              </div>
            ))}
          </div>
        </div>

        <Card className="bg-surface border border-primary/5 p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="font-bold text-text text-base sm:text-lg flex items-center gap-2">
              <GitBranch className="h-5 w-5 text-accent" /> Open Source Codebase Chapter
            </h4>
            <p className="text-xs sm:text-sm text-muted max-w-xl">
              We publish our schemas, components, and course scrapper algorithms publicly. Help us expand the repository footprint.
            </p>
          </div>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm">
              Explore Repositories
            </Button>
          </a>
        </Card>

        <div className="rounded-3xl bg-gradient-to-r from-accent/5 to-highlight/5 border border-primary/10 p-8 md:p-12 text-center space-y-6">
          <div className="max-w-xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-mono uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" /> Join the community
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-text leading-tight">
              Ready to create technologies that matter?
            </h3>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              Whether you are an aspiring builder, a campus chapter lead, or an open-source contributor, join us in forming the future of educational technology.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Button variant="primary" onClick={() => navigate('/contact')}>
              Join Deep Code
            </Button>
            <Button variant="outline" onClick={() => window.open('https://github.com', '_blank')}>
              Become a Contributor
            </Button>
            <Button variant="ghost" onClick={() => navigate('/projects')} className="text-accent">
              Explore Projects
            </Button>
          </div>
        </div>
      </motion.section>

      {/* 8. KNOWLEDGE HUB SECTION */}
      <motion.section
        variants={fadeInDirection('up')}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full space-y-12"
      >
        <div className="border-b border-primary/10 pb-4">
          <div className="flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-wider">
            <FileText className="h-4 w-4" />
            <span>{sec07Title}</span>
          </div>
          <h2 className="text-3xl font-extrabold text-text mt-1">{sec07Headline}</h2>
          <p className="text-xs sm:text-sm text-muted max-w-xl">
            {sec07Desc}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted" />
            <input
              type="text"
              placeholder="Search guides or cheat sheets..."
              value={notesSearch}
              onChange={(e) => setNotesSearch(e.target.value)}
              className="w-full rounded-lg bg-surface border border-primary/10 pl-9 pr-4 py-2 text-text placeholder-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent text-sm"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {(['All', 'Programming', 'AI', 'Database', 'Operating Systems', 'DSA'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveNotesFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                  activeNotesFilter === cat 
                    ? 'bg-accent/15 text-accent font-semibold border border-accent/20' 
                    : 'text-muted bg-surface border border-primary/5 hover:border-primary/20 hover:text-text'
                }`}
              >
                {cat}
              </button>
            ))}

            <select
              value={notesDifficultyFilter}
              onChange={(e) => setNotesDifficultyFilter(e.target.value as any)}
              className="rounded-lg bg-surface border border-primary/10 px-3 py-1.5 text-xs text-muted hover:border-primary/20 focus:outline-none"
            >
              <option value="All">All Difficulties</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-8">
            {featuredNote && (
              <div className="space-y-4">
                <span className="text-[10px] font-mono text-muted uppercase tracking-wider font-semibold">Featured Resource</span>
                <Card className="bg-surface border border-primary/10 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden">
                  <div className="absolute right-0 top-0 opacity-[0.03] pointer-events-none transform translate-x-12 -translate-y-12">
                    <FileText className="h-[200px] w-[200px] text-accent" />
                  </div>

                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded bg-accent/15 text-accent">
                        {featuredNote.category}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded bg-primary/5 text-muted">
                        {featuredNote.difficulty}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-text">{featuredNote.title}</h3>
                    <p className="text-sm text-muted leading-relaxed max-w-xl">{featuredNote.description}</p>

                    <div className="flex flex-wrap gap-4 text-xs font-mono text-muted">
                      <span>Type: {featuredNote.fileType}</span>
                      <span>•</span>
                      <span>Time: {featuredNote.readingTime}</span>
                      <span>•</span>
                      <span>Downloads: {featuredNote.downloads}</span>
                    </div>

                    {featuredNote.youtubeTitle && (
                      <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-xl border border-primary/5 w-fit">
                        <Play className="h-4 w-4 text-rose-500 fill-rose-500 shrink-0" />
                        <span className="text-xs text-muted">Video Guide: <strong>{featuredNote.youtubeTitle}</strong></span>
                      </div>
                    )}

                    <div className="flex gap-3 pt-2">
                      <Button variant="primary" size="sm">
                        <Download className="mr-2 h-4 w-4" /> Download Notes
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => navigate(`/notes`)}>
                        Preview
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            <div className="space-y-4">
              <span className="text-[10px] font-mono text-muted uppercase tracking-wider font-semibold">Recently Uploaded Guides</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {regularNotes.map((note) => (
                  <Card key={note.slug} className="bg-surface border border-primary/5 p-5 flex flex-col justify-between hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-accent/15 text-accent">
                          {note.category}
                        </span>
                        <span className="text-[9px] font-mono text-muted">{note.fileType}</span>
                      </div>
                      <h4 className="font-bold text-text text-sm sm:text-base leading-tight">{note.title}</h4>
                      <p className="text-xs text-muted leading-relaxed line-clamp-2">{note.description}</p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-primary/5 mt-4">
                      <span className="text-[9px] font-mono text-muted">{note.downloads} Downloads</span>
                      <button className="flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider text-accent hover:text-highlight transition-colors duration-200">
                        Get <Download className="h-3 w-3" />
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <Card className="bg-surface border border-primary/5 p-6 space-y-4">
              <h4 className="text-xs font-mono uppercase text-muted tracking-wider flex items-center gap-2">
                <Flame className="h-4 w-4 text-orange-500 fill-orange-500" /> Popular Resources
              </h4>
              <div className="divide-y divide-primary/5">
                {popularNotes.map((pop) => (
                  <div key={pop.slug} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                    <div className="space-y-0.5 max-w-[70%]">
                      <h5 className="font-bold text-text text-xs sm:text-sm truncate">{pop.title}</h5>
                      <span className="text-[9px] font-mono text-muted uppercase tracking-wider">{pop.category}</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-accent">{pop.downloads} dl</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 p-6 space-y-4 rounded-3xl relative overflow-hidden">
              <div className="space-y-2 relative z-10">
                <h4 className="font-bold text-text text-base sm:text-lg flex items-center gap-2">
                  <Mail className="h-5 w-5 text-accent animate-pulse" /> Stay Updated
                </h4>
                <p className="text-xs text-muted leading-relaxed">
                  Receive email notifications when new university notes, cheat sheets, and algorithm case guides are published.
                </p>
              </div>

              <form onSubmit={handleNewsletterSubmit} className="space-y-2 relative z-10 pt-2">
                <input 
                  type="email" 
                  placeholder="Enter email address" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  className="w-full rounded-lg bg-surface border border-primary/10 px-3 py-2 text-xs text-text placeholder-muted focus:border-accent focus:outline-none"
                />
                <Button variant="primary" type="submit" className="w-full text-xs py-2" disabled={newsletterStatus === 'loading'}>
                  {newsletterStatus === 'loading' ? 'Subscribing...' : 'Subscribe to Hub'}
                </Button>
                {newsletterStatus === 'success' && (
                  <p className="text-[10px] font-mono text-success mt-1">Successfully subscribed!</p>
                )}
                {newsletterStatus === 'error' && (
                  <p className="text-[10px] font-mono text-rose-500 mt-1">Subscription failed. Try again.</p>
                )}
              </form>
            </Card>
          </div>
        </div>
      </motion.section>

      {/* 9. CONTACT SECTION (Collab cards, form, info details, socials) */}
      <motion.section
        variants={fadeInDirection('up')}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full space-y-12"
      >
        {/* Section Header */}
        <div className="border-b border-primary/10 pb-4">
          <div className="flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-wider">
            <MessageSquare className="h-4 w-4" />
            <span>{sec08Title}</span>
          </div>
          <h2 className="text-3xl font-extrabold text-text mt-1">{sec08Headline}</h2>
          <p className="text-xs sm:text-sm text-muted max-w-xl">
            {sec08Desc}
          </p>
        </div>

        {/* Collaboration Cards Grid */}
        <div className="space-y-4">
          <h4 className="text-xs font-mono uppercase text-muted tracking-wider">Select a Collaboration Option</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {COLLABS_DATA.map((col, idx) => (
              <Card 
                key={idx} 
                onClick={() => setCategory(col.categoryValue)}
                className={`bg-surface p-5 space-y-4 hover:-translate-y-0.5 hover:shadow-sm cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                  category === col.categoryValue ? 'border-2 border-accent shadow-md' : 'border border-primary/5'
                }`}
              >
                <div className="space-y-2">
                  <div className="p-2 bg-accent/5 rounded-lg w-fit">
                    {col.icon}
                  </div>
                  <h5 className="font-bold text-text text-sm">{col.title}</h5>
                  <p className="text-[11px] text-muted leading-relaxed">{col.description}</p>
                </div>
                <span className="text-[10px] text-accent font-mono uppercase tracking-wider font-semibold">Select Option &rarr;</span>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Form & Contact Details Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
          
          {/* Left: Contact Form */}
          <form onSubmit={handleFormSubmit} className="lg:col-span-7 bg-surface border border-primary/5 p-6 rounded-3xl space-y-4 shadow-sm">
            <h4 className="font-bold text-text text-base sm:text-lg">Inquiry Form</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Your Name *</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required
                  placeholder="e.g. John Doe"
                  className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 text-xs text-text placeholder-muted focus:border-accent focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Your Email *</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required
                  placeholder="e.g. john@example.com"
                  className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 text-xs text-text placeholder-muted focus:border-accent focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Subject</label>
                <input 
                  type="text" 
                  value={subject} 
                  onChange={(e) => setSubject(e.target.value)} 
                  placeholder="Brief summary"
                  className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 text-xs text-text placeholder-muted focus:border-accent focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 text-xs text-muted focus:border-accent focus:outline-none"
                >
                  <option value="projects">Software Projects</option>
                  <option value="community">Deep Code Chapters</option>
                  <option value="guidance">Student Guidance</option>
                  <option value="consulting">Career & Recruiter</option>
                  <option value="general">General Inquiry</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Message *</label>
              <textarea 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                required
                rows={4}
                placeholder="Describe your goals..."
                className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 text-xs text-text placeholder-muted focus:border-accent focus:outline-none"
              />
            </div>

            {/* Actions & simulated states */}
            <div className="flex items-center justify-between gap-4 pt-2">
              <Button variant="primary" type="submit" disabled={formStatus === 'loading'}>
                {formStatus === 'loading' ? 'Sending...' : <><Send className="mr-2 h-4 w-4" /> Send Inquiry</>}
              </Button>

              <AnimatePresence>
                {formStatus === 'success' && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xs font-mono text-success">Inquiry logged successfully!</motion.span>
                )}
                {formStatus === 'error' && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xs font-mono text-danger">Validation failed. Check fields.</motion.span>
                )}
              </AnimatePresence>
            </div>
          </form>

          {/* Right: Contact Information */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="bg-surface border border-primary/5 p-6 space-y-4 shadow-sm">
              <h4 className="font-bold text-text text-base">Direct Details</h4>
              
              <div className="divide-y divide-primary/5 text-xs font-mono text-muted">
                <div className="flex justify-between py-2.5">
                  <span>Location</span>
                  <span className="text-text font-semibold">Zurich, Switzerland</span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span>Timezone</span>
                  <span className="text-text font-semibold">CET (UTC+1)</span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span>Availability</span>
                  <span className="text-success font-semibold flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active
                  </span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span>Expected Response</span>
                  <span className="text-text font-semibold">&lt; 24 Hours</span>
                </div>
                <div className="flex justify-between py-2.5">
                  <span>Email</span>
                  <span className="text-accent font-semibold">ali@deepcode.cc</span>
                </div>
              </div>
            </Card>

            {/* Social Block */}
            <Card className="bg-surface border border-primary/5 p-6 space-y-3 shadow-sm">
              <h4 className="font-bold text-text text-base">Social Profiles Network</h4>
              <div className="flex flex-wrap gap-3 pt-1">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg border border-primary/5 bg-surface text-xs font-mono text-muted hover:text-accent hover:border-accent/15 transition-all shadow-sm flex items-center gap-1.5">
                  GitHub
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg border border-primary/5 bg-surface text-xs font-mono text-muted hover:text-accent hover:border-accent/15 transition-all shadow-sm flex items-center gap-1.5">
                  LinkedIn
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg border border-primary/5 bg-surface text-xs font-mono text-muted hover:text-accent hover:border-accent/15 transition-all shadow-sm flex items-center gap-1.5">
                  YouTube
                </a>
              </div>
            </Card>
          </div>

        </div>

        {/* FAQ Accordion Preview */}
        <div className="space-y-6 max-w-3xl mx-auto pt-8">
          <h3 className="text-xl font-bold text-text text-center flex items-center justify-center gap-2">
            <HelpCircle className="h-5 w-5 text-accent" /> Frequently Asked Questions
          </h3>
          <div className="space-y-3">
            {FAQS_DATA.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;

              return (
                <div key={idx} className="border border-primary/10 bg-surface rounded-2xl overflow-hidden transition-all shadow-sm">
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 text-left font-bold text-text text-sm sm:text-base hover:bg-primary/5 transition-colors focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="h-4 w-4 text-accent" /> : <ChevronDown className="h-4 w-4 text-muted" />}
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="p-4 border-t border-primary/5 text-xs sm:text-sm text-muted leading-relaxed bg-background/50">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Final CTA Card Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-accent/5 to-highlight/5 border border-primary/10 p-8 md:p-12 text-center space-y-6">
          <div className="max-w-xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-mono uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" /> Launch Pad
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-text leading-tight">
              Let's Build Technology That Matters.
            </h3>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              Every great project begins with a conversation. Let's create something meaningful together.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Button variant="primary" onClick={() => {
              const element = document.getElementById('contact-form');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}>
              Start a Conversation
            </Button>
            <Button variant="outline" onClick={() => navigate('/projects')}>
              Explore My Work
            </Button>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
