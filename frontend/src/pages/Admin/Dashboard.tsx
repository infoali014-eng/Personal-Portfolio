import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Layers, 
  Server, 
  BookOpen, 
  Rss, 
  Inbox, 
  Image, 
  Plus, 
  Clock, 
  TrendingUp 
} from 'lucide-react';
import { HelmetSEO } from '@/components/seo/HelmetSEO';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProjectsService } from '@/services/ProjectsService';
import { SolutionsService } from '@/services/SolutionsService';
import { NotesService } from '@/services/NotesService';
import { BlogService } from '@/services/BlogService';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const [projectCount, setProjectCount] = useState(4);
  const [solutionsCount, setSolutionsCount] = useState(2);
  const [notesCount, setNotesCount] = useState(4);
  const [blogCount, setBlogCount] = useState(1);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const projects = await new ProjectsService().getProjects();
        setProjectCount(projects.length);
      } catch {}
      try {
        const solutions = await new SolutionsService().getSolutions();
        setSolutionsCount(solutions.length);
      } catch {}
      try {
        const notes = await new NotesService().getNotes();
        setNotesCount(notes.length);
      } catch {}
      try {
        const blogs = await new BlogService().getArticles();
        setBlogCount(blogs.length);
      } catch {}
    };
    fetchStats();
  }, []);

  const stats = [
    { label: 'Total Projects', value: projectCount, icon: <Layers className="h-5 w-5 text-accent" />, path: '/admin/projects' },
    { label: 'Solutions Live', value: solutionsCount, icon: <Server className="h-5 w-5 text-accent" />, path: '/admin/solutions' },
    { label: 'Notes Cataloged', value: notesCount, icon: <BookOpen className="h-5 w-5 text-accent" />, path: '/admin/notes' },
    { label: 'Blog Articles', value: blogCount, icon: <Rss className="h-5 w-5 text-accent" />, path: '/admin/blog' },
    { label: 'Unread Messages', value: 3, icon: <Inbox className="h-5 w-5 text-rose-500 animate-pulse" />, path: '/admin/messages' },
    { label: 'Media Assets', value: 4, icon: <Image className="h-5 w-5 text-accent" />, path: '/admin/media' }
  ];

  const recentActivity = [
    { type: 'note', desc: 'Uploaded "Advanced TypeScript Notes" PDF asset', time: '2 hours ago' },
    { type: 'blog', desc: 'Published article "How We Structure TypeScript Type Safeties in Monorepos"', time: '1 day ago' },
    { type: 'project', desc: 'Modified Study Mate AI case study features checklist', time: '3 days ago' },
    { type: 'message', desc: 'Received speaking invitation request from Tech University', time: '4 days ago' }
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

      {/* Stats Cards grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat) => (
          <Card 
            key={stat.label} 
            onClick={() => navigate(stat.path)}
            className="bg-surface border border-primary/5 hover:border-accent/25 hover:shadow-md cursor-pointer transition-all duration-300 p-4 flex flex-col justify-between h-28 group"
          >
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-mono text-muted uppercase tracking-wider leading-tight">{stat.label}</span>
              <div className="p-1.5 rounded-lg bg-primary/5 group-hover:bg-accent/5 transition-colors">
                {stat.icon}
              </div>
            </div>
            <div className="text-2xl font-bold text-text mt-2">{stat.value}</div>
          </Card>
        ))}
      </div>

      {/* Activity and Fast Actions row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Activity */}
        <div className="lg:col-span-8 space-y-4">
          <h3 className="text-sm font-mono text-muted uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-accent" /> Recent Activity Logs
          </h3>
          <Card className="bg-surface border border-primary/5 p-6 divide-y divide-primary/5">
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="flex justify-between items-center py-3.5 first:pt-0 last:pb-0 text-xs sm:text-sm">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-accent uppercase px-2 py-0.5 rounded bg-accent/5 border border-accent/10">
                    {activity.type}
                  </span>
                  <p className="text-muted leading-relaxed">{activity.desc}</p>
                </div>
                <span className="text-[10px] font-mono text-muted shrink-0 ml-4">{activity.time}</span>
              </div>
            ))}
          </Card>
        </div>

        {/* Fast Insights */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-sm font-mono text-muted uppercase tracking-wider flex items-center gap-1.5">
            <TrendingUp className="h-4 w-4 text-accent" /> System Health
          </h3>
          <Card className="bg-surface border border-primary/5 p-6 space-y-4">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-muted">Storage Sync</span>
              <span className="text-success flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-success animate-ping" /> Synchronized</span>
            </div>
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-muted">Database Engine</span>
              <span className="text-success flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-success" /> Active</span>
            </div>
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-muted">Version History</span>
              <span className="text-muted">v1.0.0</span>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
