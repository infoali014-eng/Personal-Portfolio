import React, { useState } from 'react';
import { useSolutions } from '@/hooks/useSolutions';
import { HelmetSEO } from '@/components/seo/HelmetSEO';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageLoader } from '@/components/ui/PageLoader';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';

const Solutions: React.FC = () => {
  const navigate = useNavigate();
  const { data: solutions, loading, error } = useSolutions();
  const [search, setSearch] = useState('');

  const filtered = solutions.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.tagline.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <PageLoader />;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-8">
      <HelmetSEO title="SaaS Solutions" description="Explore my commercial-grade products and deployed SaaS solutions." />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-primary/10 pb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text">SaaS Solutions</h1>
          <p className="text-sm text-muted mt-1">Discover commercial deployments, tools integrations, and target audiences statistics.</p>
        </div>

        {/* Search */}
        <div className="relative max-w-xs w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted" />
          <input 
            type="text" 
            placeholder="Search solutions..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg bg-surface border border-primary/10 pl-9 pr-4 py-2 text-xs text-text focus:outline-none focus:border-accent"
          />
        </div>
      </div>

      {error && (
        <div className="text-xs font-mono text-rose-500 bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl">
          Error loading solutions: {error}
        </div>
      )}

      {/* Solutions list */}
      <div className="grid grid-cols-1 gap-6">
        {filtered.map((sol) => (
          <Card key={sol.slug} className="bg-surface border border-primary/5 p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:shadow-md transition-all">
            <div className="space-y-4 max-w-2xl">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="tech" className="bg-accent/10 text-accent font-semibold">{sol.category || 'SaaS'}</Badge>
                <span className="text-xs font-mono text-muted">Version: {sol.version}</span>
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-text">{sol.name}</h3>
                <p className="text-xs sm:text-sm text-muted leading-relaxed">{sol.tagline}</p>
              </div>
            </div>

            <button 
              onClick={() => navigate(`/solutions/${sol.slug}`)}
              className="text-xs font-mono font-bold uppercase tracking-wider text-accent hover:text-highlight flex items-center gap-1.5 border border-primary/5 hover:border-accent/15 px-4 py-2 rounded-xl bg-surface/50 transition-all shrink-0 w-full md:w-auto justify-center"
            >
              Explore Solution <ArrowRight className="h-3.5 w-3.5 animate-pulse" />
            </button>
          </Card>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-xs text-muted font-mono bg-surface border border-primary/5 rounded-3xl">
            No solutions matched search parameters.
          </div>
        )}
      </div>
    </div>
  );
};

export default Solutions;
