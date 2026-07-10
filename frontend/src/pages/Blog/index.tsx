import React, { useState } from 'react';
import { useArticles } from '@/hooks/useArticles';
import { HelmetSEO } from '@/components/seo/HelmetSEO';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageLoader } from '@/components/ui/PageLoader';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, Clock, ArrowRight } from 'lucide-react';

const Blog: React.FC = () => {
  const navigate = useNavigate();
  const { data: articles, loading, error } = useArticles();
  const [search, setSearch] = useState('');

  const filtered = articles.filter(a => 
    a.title.toLowerCase().includes(search.toLowerCase()) || 
    a.excerpt.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <PageLoader />;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-8">
      <HelmetSEO title="Blog Feed" description="Read my articles on software design, serverless architectures, and campus builders." />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-primary/10 pb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text">Blog & Retro logs</h1>
          <p className="text-sm text-muted mt-1">Read guides and logs detailing typescript patterns, database hacks, and team leading.</p>
        </div>

        {/* Search */}
        <div className="relative max-w-xs w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted" />
          <input 
            type="text" 
            placeholder="Search articles..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg bg-surface border border-primary/10 pl-9 pr-4 py-2 text-xs text-text focus:outline-none focus:border-accent"
          />
        </div>
      </div>

      {error && (
        <div className="text-xs font-mono text-rose-500 bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl">
          Error loading articles: {error}
        </div>
      )}

      {/* Articles List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((art) => (
          <Card key={art.slug} className="bg-surface border border-primary/5 p-6 hover:shadow-md transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[10px] font-mono text-muted uppercase tracking-wider">
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {art.date}</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {art.readingTime} read</span>
              </div>

              <h3 className="text-lg font-bold text-text hover:text-accent cursor-pointer transition-colors" onClick={() => navigate(`/blog/${art.slug}`)}>
                {art.title}
              </h3>
              
              <p className="text-xs text-muted leading-relaxed line-clamp-3">{art.excerpt}</p>
            </div>

            <div className="pt-2 flex justify-between items-center">
              <Badge variant="tech">{art.category}</Badge>
              <button 
                onClick={() => navigate(`/blog/${art.slug}`)}
                className="text-xs font-mono font-bold uppercase tracking-wider text-accent hover:text-highlight flex items-center gap-1"
              >
                Read Article <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </Card>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-2 text-center py-12 text-xs text-muted font-mono bg-surface border border-primary/5 rounded-3xl">
            No articles matched search parameters.
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
