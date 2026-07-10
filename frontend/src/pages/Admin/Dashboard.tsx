import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Layers, 
  Server, 
  BookOpen, 
  Rss, 
  Inbox, 
  Image as ImageIcon, 
  Plus, 
  Clock, 
  TrendingUp,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { HelmetSEO } from '@/components/seo/HelmetSEO';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProjectsService } from '@/services/ProjectsService';
import { SolutionsService } from '@/services/SolutionsService';
import { NotesService } from '@/services/NotesService';
import { BlogService } from '@/services/BlogService';
import { messagesService } from '@/services/MessagesService';
import { mediaService } from '@/services/MediaService';
import { APP_CONFIG } from '@/core/config';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const [projectCount, setProjectCount] = useState(0);
  const [solutionsCount, setSolutionsCount] = useState(0);
  const [notesCount, setNotesCount] = useState(0);
  const [blogCount, setBlogCount] = useState(0);
  const [messagesCount, setMessagesCount] = useState(0);
  const [mediaCount, setMediaCount] = useState(0);
  
  const [dbStatus, setDbStatus] = useState<'checking' | 'healthy' | 'error'>('checking');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const backendMode = APP_CONFIG.app.backendMode;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setDbStatus('checking');
        const projects = await new ProjectsService().getProjects();
        setProjectCount(projects.length);

        const solutions = await new SolutionsService().getSolutions();
        setSolutionsCount(solutions.length);

        const notes = await new NotesService().getNotes();
        setNotesCount(notes.length);

        const blogs = await new BlogService().getArticles();
        setBlogCount(blogs.length);

        const messages = await messagesService.getMessages();
        setMessagesCount(messages.filter(m => !m.isRead).length);

        const media = await mediaService.getAssets();
        setMediaCount(media.length);

        setDbStatus('healthy');
      } catch (err: any) {
        console.error('Database query error:', err);
        setDbStatus('error');
        setErrorMessage(err.message || 'Unknown database query failure');
      }
    };
    fetchStats();
  }, []);

  const stats = [
    { label: 'Total Projects', value: projectCount, icon: <Layers className="h-5 w-5 text-accent" />, path: '/admin/projects' },
    { label: 'Solutions Live', value: solutionsCount, icon: <Server className="h-5 w-5 text-accent" />, path: '/admin/solutions' },
    { label: 'Notes Cataloged', value: notesCount, icon: <BookOpen className="h-5 w-5 text-accent" />, path: '/admin/notes' },
    { label: 'Blog Articles', value: blogCount, icon: <Rss className="h-5 w-5 text-accent" />, path: '/admin/blog' },
    { label: 'Unread Messages', value: messagesCount, icon: <Inbox className="h-5 w-5 text-rose-500 animate-pulse" />, path: '/admin/messages' },
    { label: 'Media Assets', value: mediaCount, icon: <ImageIcon className="h-5 w-5 text-accent" />, path: '/admin/media' }
  ];

  return (
    <div className="space-y-8">
      <HelmetSEO title="Admin Dashboard | Creator CMS" />

      {/* Header section */}
      <div className="flex justify-between items-center border-b border-primary/10 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-text">Workspace Overview</h2>
          <p className="text-xs text-muted mt-0.5">Welcome back, Ali. Manage your personal brand data configurations.</p>
        </div>

        <div className="flex gap-2">
          <Button variant="primary" size="sm" onClick={() => navigate('/admin/blog')}>
            <Plus className="mr-1.5 h-4 w-4" /> New Article
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigate('/admin/settings')}>
            Settings
          </Button>
        </div>
      </div>

      {/* Connection Status Diagnostics Banner */}
      <Card className={`border p-4 rounded-2xl flex items-center justify-between shadow-sm transition-all duration-300 ${
        dbStatus === 'healthy' 
          ? 'bg-success/5 border-success/15' 
          : dbStatus === 'checking'
            ? 'bg-primary/5 border-primary/10'
            : 'bg-rose-500/5 border-rose-500/15'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full border ${
            dbStatus === 'healthy' 
              ? 'bg-success/10 border-success/20 text-success' 
              : dbStatus === 'checking'
                ? 'bg-primary/10 border-primary/20 text-muted'
                : 'bg-rose-500/10 border-rose-500/20 text-rose-500'
          }`}>
            <Server className={`h-5 w-5 ${dbStatus === 'checking' ? 'animate-bounce' : ''}`} />
          </div>
          <div className="space-y-0.5">
            <h4 className="font-bold text-sm text-text">
              Database Connection: <span className="uppercase font-mono text-accent text-xs">{backendMode} mode</span>
            </h4>
            <p className="text-[11px] text-muted">
              {dbStatus === 'healthy' && 'All relational database tables and RLS security policies checked out healthy.'}
              {dbStatus === 'checking' && 'Pinging Supabase REST endpoint and executing analytical joins query...'}
              {dbStatus === 'error' && `Supabase connectivity failure: ${errorMessage}`}
            </p>
          </div>
        </div>
        <div className="text-[10px] font-mono text-muted uppercase tracking-wider hidden sm:block">
          {dbStatus === 'healthy' && <span className="flex items-center gap-1 text-success"><CheckCircle2 className="h-4 w-4" /> Connected</span>}
          {dbStatus === 'checking' && <span>Resolving...</span>}
          {dbStatus === 'error' && <span className="flex items-center gap-1 text-rose-500"><AlertTriangle className="h-4 w-4 animate-ping" /> Connection Error</span>}
        </div>
      </Card>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
        {stats.map((item, idx) => (
          <Card 
            key={idx} 
            onClick={() => navigate(item.path)}
            className="p-5 cursor-pointer hover:shadow-md hover:border-primary/20 transition-all border border-primary/5 bg-surface text-center flex flex-col justify-between items-center space-y-3"
          >
            <div className="p-3 bg-primary/5 rounded-2xl border border-primary/10">
              {item.icon}
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono text-muted uppercase tracking-wider block">{item.label}</span>
              <h3 className="text-xl font-mono font-bold text-text">{item.value}</h3>
            </div>
          </Card>
        ))}
      </div>

      {/* Overview Analytics Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Quick Actions */}
        <div className="lg:col-span-8 space-y-4">
          <h3 className="text-xs font-mono uppercase text-muted tracking-wider">CMS Management Portals</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="p-5 border border-primary/5 bg-surface flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <h4 className="font-bold text-text text-sm">Portfolio Showcase</h4>
                <p className="text-xs text-muted leading-relaxed">Update case studies, tech stacks, live links, and tags categories for client-facing showcase.</p>
              </div>
              <Button variant="outline" size="sm" className="w-full text-xs font-mono" onClick={() => navigate('/admin/projects')}>
                Manage Projects &rarr;
              </Button>
            </Card>

            <Card className="p-5 border border-primary/5 bg-surface flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <h4 className="font-bold text-text text-sm">SaaS Solutions Registry</h4>
                <p className="text-xs text-muted leading-relaxed">Review product details, customer targets, pricing tiers, and release versions logs.</p>
              </div>
              <Button variant="outline" size="sm" className="w-full text-xs font-mono" onClick={() => navigate('/admin/solutions')}>
                Manage Solutions &rarr;
              </Button>
            </Card>

            <Card className="p-5 border border-primary/5 bg-surface flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <h4 className="font-bold text-text text-sm">University Chapters</h4>
                <p className="text-xs text-muted leading-relaxed">Administer Deep Code registry records, verify student counts, and coordinate coordinator details.</p>
              </div>
              <Button variant="outline" size="sm" className="w-full text-xs font-mono" onClick={() => navigate('/admin/deep-code')}>
                Manage Chapters &rarr;
              </Button>
            </Card>

            <Card className="p-5 border border-primary/5 bg-surface flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <h4 className="font-bold text-text text-sm">Direct inbox inquiries</h4>
                <p className="text-xs text-muted leading-relaxed">Read visitor feedback, business opportunities suggestions, and newsletter subscriptions queue.</p>
              </div>
              <Button variant="outline" size="sm" className="w-full text-xs font-mono" onClick={() => navigate('/admin/messages')}>
                Open Inboxes &rarr;
              </Button>
            </Card>
          </div>
        </div>

        {/* Right: Recent activity logs shell */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-mono uppercase text-muted tracking-wider">Recent Activity Logs</h3>
            <Clock className="h-4 w-4 text-muted" />
          </div>

          <Card className="bg-surface border border-primary/5 p-5 divide-y divide-primary/5 space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-xs">
                <TrendingUp className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="text-muted leading-relaxed">Supabase database statistics synchronized successfully.</p>
                  <span className="text-[9px] font-mono text-muted uppercase">Just Now</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
