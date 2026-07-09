import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Download, FileText, Play, Tag, Clock } from 'lucide-react';
import { HelmetSEO } from '@/components/seo/HelmetSEO';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { NOTES_REGISTRY } from '@/data/notes';

const NoteDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Find note in data registry
  const note = slug ? NOTES_REGISTRY[slug] : null;

  if (!note) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center space-y-6">
        <HelmetSEO title="Note Not Found" />
        <FileText className="h-12 w-12 text-muted mx-auto animate-pulse" />
        <h2 className="text-xl font-mono text-text font-bold">Resource Not Found</h2>
        <p className="text-sm text-muted">
          The requested educational resource is not found.
        </p>
        <Button variant="outline" onClick={() => navigate('/notes')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to knowledge hub
        </Button>
      </div>
    );
  }

  // Find related notes
  const relatedNotes = Object.values(NOTES_REGISTRY)
    .filter(n => n.slug !== note.slug && (n.category === note.category || n.difficulty === note.difficulty))
    .slice(0, 2);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
      <HelmetSEO 
        title={`${note.title} | Knowledge Hub`} 
        description={note.description}
      />

      {/* Back button */}
      <button 
        onClick={() => navigate('/notes')}
        className="flex items-center gap-2 text-xs font-mono text-muted hover:text-accent transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Knowledge Hub
      </button>

      {/* Note Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-primary/10 pb-8">
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant="tech" className="bg-accent/15 text-accent border-accent/20">
              {note.category}
            </Badge>
            <span className="text-xs font-mono text-muted">Updated: {note.lastUpdated}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text">
            {note.title}
          </h1>
          <p className="text-base sm:text-lg text-muted max-w-2xl leading-relaxed">
            {note.description}
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Button variant="primary">
              <Download className="mr-2 h-4 w-4" /> Download {note.fileType} Resource
            </Button>
            {note.youtubeUrl && (
              <a href={note.youtubeUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline">
                  <Play className="mr-2 h-4 w-4 text-rose-500 fill-rose-500" /> Watch Video Tutorial
                </Button>
              </a>
            )}
          </div>
        </div>

        {/* Note indicators card */}
        <div className="lg:col-span-4 w-full">
          <Card className="bg-surface border border-primary/5 p-6 space-y-4 shadow-sm">
            <h3 className="text-xs font-mono uppercase text-muted tracking-wider">Resource Parameters</h3>
            <div className="divide-y divide-primary/5 text-xs font-mono">
              <div className="flex justify-between py-2.5">
                <span className="text-muted">Difficulty</span>
                <span className="text-accent font-semibold">{note.difficulty}</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-muted">Reading Time</span>
                <span className="text-accent font-semibold flex items-center gap-1"><Clock className="h-3 w-3" /> {note.readingTime}</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-muted">Downloads Count</span>
                <span className="text-accent font-semibold">{note.downloadsCount}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Note Body Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Descriptions, paths, YouTube details */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Learning path */}
          {note.learningPath && (
            <div className="space-y-3 p-5 border border-primary/10 bg-primary/5 rounded-2xl">
              <h3 className="font-bold text-text text-sm flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-accent" /> Part of Learning Path:
              </h3>
              <p className="text-xs sm:text-sm text-muted font-mono">{note.learningPath}</p>
            </div>
          )}

          {/* YouTube Guide integrated card */}
          {note.youtubeTitle && (
            <Card className="bg-surface border border-primary/5 p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Play className="h-5 w-5 text-rose-500 fill-rose-500 shrink-0" />
                <h4 className="font-bold text-text text-base">Linked Video Tutorial</h4>
              </div>
              <p className="text-xs sm:text-sm text-muted">
                This document was compiled alongside my video: <strong>"{note.youtubeTitle}"</strong>. Check the screencast for step-by-step layouts guides.
              </p>
              {note.youtubeUrl && (
                <a href={note.youtubeUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm">
                    Watch Screencast
                  </Button>
                </a>
              )}
            </Card>
          )}

          {/* Note Tags */}
          <div className="space-y-3 pt-4">
            <span className="text-xs font-mono uppercase text-muted tracking-wider flex items-center gap-2">
              <Tag className="h-4 w-4" /> Metadata Tags
            </span>
            <div className="flex flex-wrap gap-2">
              {note.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full border border-primary/10 bg-surface text-xs text-muted font-mono">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Related resources list */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="bg-surface border border-primary/5 p-6 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-text">Related Resources</h3>
            <div className="space-y-4">
              {relatedNotes.map((rel) => (
                <div 
                  key={rel.slug} 
                  onClick={() => navigate(`/notes/${rel.slug}`)}
                  className="space-y-2 group cursor-pointer border-b border-primary/5 pb-4 last:border-b-0 last:pb-0"
                >
                  <Badge variant="tech" className="text-[9px] px-2 py-0.5">
                    {rel.category}
                  </Badge>
                  <h4 className="font-bold text-text text-xs sm:text-sm group-hover:text-accent transition-colors leading-tight">
                    {rel.title}
                  </h4>
                  <p className="text-[11px] text-muted line-clamp-2 leading-relaxed">{rel.description}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default NoteDetail;
