import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, FileText, Bookmark } from 'lucide-react';
import { HelmetSEO } from '@/components/seo/HelmetSEO';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PageLoader } from '@/components/ui/PageLoader';
import { BlogService } from '@/services/BlogService';
import type { BlogArticleData } from '@/data/blog';

const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const [blog, setBlog] = useState<BlogArticleData | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<BlogArticleData[]>([]);
  const [loading, setLoading] = useState(true);

  const blogService = new BlogService();

  useEffect(() => {
    if (!slug) return;
    const fetchArticle = async () => {
      setLoading(true);
      try {
        const item = await blogService.getArticle(slug);
        setBlog(item);
        if (item) {
          const list = await blogService.getArticles();
          setRelatedArticles(list.filter(a => a.slug !== item.slug).slice(0, 2));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [slug]);

  if (loading) {
    return <PageLoader />;
  }

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

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      <HelmetSEO 
        title={`${blog.title} | Blog Details`} 
        description={blog.excerpt}
      />

      {/* Back button */}
      <button 
        onClick={() => navigate('/blog')}
        className="flex items-center gap-2 text-xs font-mono text-muted hover:text-accent transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Blog List
      </button>

      {/* Blog Header */}
      <div className="space-y-6 max-w-3xl border-b border-primary/10 pb-8">
        <Badge variant="tech" className="bg-accent/15 text-accent border-accent/20">
          {blog.category}
        </Badge>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text leading-tight">
          {blog.title}
        </h1>

        <p className="text-base sm:text-lg text-muted leading-relaxed">
          {blog.excerpt}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted pt-2">
          <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {blog.date}</span>
          <span>•</span>
          <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {blog.readingTime} read</span>
        </div>
      </div>

      {/* Blog Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Markdown content */}
        <div className="lg:col-span-8 space-y-8">
          <Card className="bg-surface border border-primary/5 p-6 sm:p-8 rounded-3xl shadow-sm leading-relaxed text-muted whitespace-pre-wrap text-sm sm:text-base">
            {blog.content}
          </Card>
        </div>

        {/* Right Column: Author card & Related articles list */}
        <div className="lg:col-span-4 space-y-6">
          {/* Author Card */}
          <Card className="bg-surface border border-primary/5 p-6 space-y-4 shadow-sm text-center">
            <div className="w-16 h-16 rounded-full bg-accent/5 mx-auto flex items-center justify-center border border-accent/10">
              <span className="text-accent font-bold font-mono">A</span>
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-text text-base">{blog.author.name}</h4>
              <p className="text-xs text-muted">{blog.author.role}</p>
            </div>
          </Card>

          {/* Related Articles list */}
          {relatedArticles.length > 0 && (
            <Card className="bg-surface border border-primary/5 p-6 space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-text flex items-center gap-1.5">
                <Bookmark className="h-4 w-4 text-accent" /> Related Articles
              </h3>
              <div className="space-y-4">
                {relatedArticles.map((art) => (
                  <div 
                    key={art.slug} 
                    onClick={() => navigate(`/blog/${art.slug}`)}
                    className="space-y-2 group cursor-pointer border-b border-primary/5 pb-4 last:border-b-0 last:pb-0"
                  >
                    <Badge variant="tech" className="text-[9px] px-2 py-0.5">
                      {art.category}
                    </Badge>
                    <h4 className="font-bold text-text text-xs sm:text-sm group-hover:text-accent transition-colors leading-tight">
                      {art.title}
                    </h4>
                    <span className="text-[10px] font-mono text-muted">{art.date}</span>
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
