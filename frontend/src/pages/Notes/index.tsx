import React, { useState } from 'react';
import { useNotes } from '@/hooks/useNotes';
import { HelmetSEO } from '@/components/seo/HelmetSEO';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageLoader } from '@/components/ui/PageLoader';
import { useNavigate } from 'react-router-dom';
import { Search, Download, Eye } from 'lucide-react';

const Notes: React.FC = () => {
  const navigate = useNavigate();
  const { data: notes, loading, error } = useNotes();
  const [search, setSearch] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');

  const filtered = notes.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(search.toLowerCase()) || 
                          n.description.toLowerCase().includes(search.toLowerCase());
    const matchesDifficulty = difficultyFilter === 'All' || n.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  if (loading) return <PageLoader />;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-8">
      <HelmetSEO title="Knowledge Hub" description="Download university cheat sheets, guides PDFs, and learning resources." />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-primary/10 pb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text">Knowledge Hub</h1>
          <p className="text-sm text-muted mt-1">Download university exam cheat sheets, technical notes PDFs, and algorithm screencasts.</p>
        </div>

        {/* Search */}
        <div className="relative max-w-xs w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted" />
          <input 
            type="text" 
            placeholder="Search resources..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg bg-surface border border-primary/10 pl-9 pr-4 py-2 text-xs text-text focus:outline-none focus:border-accent"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {['All', 'Beginner', 'Intermediate', 'Advanced'].map((diff) => (
          <button
            key={diff}
            onClick={() => setDifficultyFilter(diff)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all border ${
              difficultyFilter === diff 
                ? 'bg-accent text-white font-bold border-accent shadow-sm'
                : 'text-muted bg-surface border-primary/5 hover:border-primary/20'
            }`}
          >
            {diff}
          </button>
        ))}
      </div>

      {error && (
        <div className="text-xs font-mono text-rose-500 bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl">
          Error loading resources: {error}
        </div>
      )}

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((note) => (
          <Card key={note.slug} className="bg-surface border border-primary/5 p-6 space-y-4 hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Badge variant="tech">{note.category}</Badge>
                <span className="text-[10px] font-mono text-muted uppercase tracking-wider">{note.difficulty} • {note.readingTime}</span>
              </div>
              <h3 className="text-lg font-bold text-text truncate">{note.title}</h3>
              <p className="text-xs text-muted leading-relaxed line-clamp-2">{note.description}</p>
            </div>

            <div className="border-t border-primary/5 pt-4 flex justify-between items-center">
              <div className="flex gap-1.5 items-center text-[10px] font-mono text-muted">
                <Download className="h-3.5 w-3.5" />
                <span>{note.downloadsCount} downloads</span>
              </div>

              <button
                onClick={() => navigate(`/notes/${note.slug}`)}
                className="text-xs font-mono font-bold uppercase tracking-wider text-accent hover:text-highlight flex items-center gap-1"
              >
                <Eye className="h-3.5 w-3.5" /> View Resource
              </button>
            </div>
          </Card>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full text-center py-12 text-xs text-muted font-mono bg-surface border border-primary/5 rounded-3xl">
            No resources matched search parameters.
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
