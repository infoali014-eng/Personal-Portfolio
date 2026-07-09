import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Share2, Mail, FileText, Bookmark } from 'lucide-react';
import { HelmetSEO } from '@/components/seo/HelmetSEO';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { BLOG_REGISTRY } from '@/data/blog';

const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Find blog in data registry
  const blog = slug ? BLOG_REGISTRY[slug] : null;

  if (!blog) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center space-y-6">
        <HelmetSEO title="Article Not Found" />
        <FileText className="h-12 w-12 text-muted mx-auto animate-pulse" />
        <h2 className="text-xl font-mono text-text font-bold">Article Not Found</h2>
        <p className="text-sm text-muted">
          The requested blog article is not cataloged.
        </p>
        <Button variant="outline" onClick={() => navigate('/blog')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to blog list
        </Button>
      </div>
    );
  }

  // Find related articles
  const relatedArticles = Object.values(BLOG_REGISTRY)
    .filter(a => a.slug !== blog.slug && a.category === blog.category)
    .slice(0, 2);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      <HelmetSEO 
        title={`${blog.title} | Blog Feed`} 
        description={blog.excerpt}
      />

      {/* Back button */}
      <button 
        onClick={() => navigate('/blog')}
        className="flex items-center gap-2 text-xs font-mono text-muted hover:text-accent transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to blog feed
      </button>

      {/* Article Hero */}
      <div className="space-y-4 max-w-3xl">
        <div className="flex items-center gap-3">
          <Badge variant="tech" className="bg-accent/15 text-accent border-accent/20">
            {blog.category}
          </Badge>
          <span className="text-xs font-mono text-muted flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {blog.readingTime} read
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text leading-tight">
          {blog.title}
        </h1>

        {/* Author details */}
        <div className="flex items-center gap-4 pt-4 border-b border-primary/5 pb-6">
          <div className="h-10 w-10 rounded-full bg-accent/10 border border-accent/10 overflow-hidden flex items-center justify-center font-bold text-accent">
            A
          </div>
          <div>
            <h4 className="font-bold text-text text-sm">{blog.author.name}</h4>
            <span className="text-[10px] text-muted font-mono">{blog.author.role}</span>
          </div>
          <span className="h-4 w-px bg-primary/10" />
          <div className="text-xs font-mono text-muted flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" /> {blog.date}
          </div>
        </div>
      </div>

      {/* Double Column: Outline left, Content center, Actions right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Table of contents sidebar */}
        <div className="lg:col-span-3 space-y-4 lg:sticky lg:top-24">
          <span className="text-[10px] text-muted font-mono uppercase tracking-wider font-semibold">Table of Contents</span>
          <ul className="space-y-2 text-xs font-mono">
            {blog.toc.map((heading) => (
              <li key={heading.id}>
                <a 
                  href={`#${heading.id}`}
                  className="text-muted hover:text-accent transition-colors block py-1"
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Simulated Markdown content rendering wrapper */}
        <div className="lg:col-span-6 space-y-8 prose prose-slate max-w-none text-muted leading-relaxed">
          <div className="space-y-6 whitespace-pre-line text-sm sm:text-base">
            {blog.content}
          </div>

          {/* Social share actions */}
          <div className="flex items-center gap-4 border-t border-primary/5 pt-6 text-xs font-mono">
            <span className="text-muted flex items-center gap-1"><Share2 className="h-4 w-4" /> Share:</span>
            <button className="text-accent hover:text-highlight">Twitter</button>
            <button className="text-accent hover:text-highlight">LinkedIn</button>
          </div>
        </div>

        {/* Sidebar right: newsletter, related list */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 p-6 space-y-4 rounded-3xl">
            <h4 className="font-bold text-text text-sm flex items-center gap-2">
              <Mail className="h-5 w-5 text-accent animate-pulse" /> Stay Updated
            </h4>
            <p className="text-xs text-muted leading-relaxed">
              Join our mailing list to receive development alerts and open-source updates.
            </p>
            <input 
              type="email" 
              placeholder="Enter email"
              className="w-full rounded-lg bg-surface border border-primary/10 px-3 py-2 text-xs text-text focus:outline-none"
            />
            <Button variant="primary" className="w-full text-xs">
              Subscribe
            </Button>
          </Card>

          {relatedArticles.length > 0 && (
            <Card className="bg-surface border border-primary/5 p-6 space-y-4 shadow-sm">
              <h4 className="text-xs font-mono uppercase text-muted tracking-wider flex items-center gap-2">
                <Bookmark className="h-4 w-4 text-accent" /> Related Articles
              </h4>
              <div className="space-y-4">
                {relatedArticles.map((rel) => (
                  <div 
                    key={rel.slug}
                    onClick={() => navigate(`/blog/${rel.slug}`)}
                    className="space-y-1 cursor-pointer group"
                  >
                    <span className="text-[10px] text-accent font-mono">{rel.category}</span>
                    <h5 className="font-bold text-text text-xs sm:text-sm group-hover:text-accent transition-colors leading-tight">
                      {rel.title}
                    </h5>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

      </div>
    </div>
  );
};

export default BlogDetail;
