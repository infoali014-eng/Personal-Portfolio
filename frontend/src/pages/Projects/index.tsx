import React, { useState } from 'react';
import { useProjects } from '@/hooks/useProjects';
import { HelmetSEO } from '@/components/seo/HelmetSEO';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageLoader } from '@/components/ui/PageLoader';
import { useNavigate } from 'react-router-dom';
import { Search, ExternalLink, ArrowRight } from 'lucide-react';

const Projects: React.FC = () => {
  const navigate = useNavigate();
  const { data: projects, loading, error } = useProjects();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          p.tagline.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || p.category === filter;
    return matchesSearch && matchesFilter;
  });

  const categories = ['All', ...new Set(projects.map(p => p.category))];

  if (loading) return <PageLoader />;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-8">
      <HelmetSEO title="Projects Gallery" description="Explore my completed tech utilities and case studies." />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-primary/10 pb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text">Projects Catalog</h1>
          <p className="text-sm text-muted mt-1">Explore live developer tools, utilities, and algorithm solvers.</p>
        </div>

        {/* Search */}
        <div className="relative max-w-xs w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted" />
          <input 
            type="text" 
            placeholder="Search projects..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg bg-surface border border-primary/10 pl-9 pr-4 py-2 text-xs text-text focus:outline-none focus:border-accent"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all border ${
              filter === cat 
                ? 'bg-accent text-white font-bold border-accent shadow-sm'
                : 'text-muted bg-surface border-primary/5 hover:border-primary/20'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {error && (
        <div className="text-xs font-mono text-rose-500 bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl">
          Error loading projects: {error}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project) => (
          <Card key={project.slug} className="bg-surface border border-primary/5 p-6 flex flex-col justify-between space-y-4 hover:shadow-md transition-all">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <Badge variant="tech">{project.category}</Badge>
                <div className="flex gap-2">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent">
                      <span className="sr-only">GitHub</span>
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
                    </a>
                  )}
                  {project.demoUrl && (
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="text-lg font-bold text-text truncate">{project.title}</h3>
              <p className="text-xs text-muted leading-relaxed line-clamp-3">{project.tagline}</p>
            </div>

            <button 
              onClick={() => navigate(`/projects/${project.slug}`)}
              className="text-xs font-mono font-bold uppercase tracking-wider text-accent hover:text-highlight flex items-center gap-1.5 pt-2"
            >
              Case Study Details <ArrowRight className="h-3 w-3" />
            </button>
          </Card>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full text-center py-12 text-xs text-muted font-mono bg-surface border border-primary/5 rounded-3xl">
            No projects matched search parameters.
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
