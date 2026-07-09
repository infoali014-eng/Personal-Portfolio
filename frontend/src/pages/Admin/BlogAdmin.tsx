import React, { useState, useEffect } from 'react';
import { Rss, Eye, Edit2, CheckCircle } from 'lucide-react';
import { HelmetSEO } from '@/components/seo/HelmetSEO';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { BlogService } from '@/services/BlogService';
import type { BlogArticleData } from '@/data/blog';

const BlogAdmin: React.FC = () => {
  const [articles, setArticles] = useState<BlogArticleData[]>([]);
  const [activeArticle, setActiveArticle] = useState<BlogArticleData | null>(null);
  const [isEditMode, setIsEditMode] = useState(true);

  // Form states matching active article
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  const blogService = new BlogService();

  const loadArticles = async () => {
    try {
      const res = await blogService.getArticles();
      setArticles(res);
      if (res.length > 0 && !activeArticle) {
        selectArticle(res[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const selectArticle = (art: BlogArticleData) => {
    setActiveArticle(art);
    setTitle(art.title);
    setCategory(art.category);
    setExcerpt(art.excerpt);
    setContent(art.content);
    setSuccessMsg(false);
  };

  const handleSave = async () => {
    if (!activeArticle) return;
    try {
      await blogService.updateArticle(activeArticle.slug, {
        title,
        category,
        excerpt,
        content
      });
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 2000);
      loadArticles();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateNew = async () => {
    const newArt: BlogArticleData = {
      slug: 'new-article-' + Date.now(),
      title: 'Draft Article Title',
      category: 'Engineering',
      excerpt: 'Brief introductory details about the subject matter.',
      content: '# Heading 1\n\nWrite your markdown content here...',
      author: { name: 'Ali', avatar: '/assets/avatar.jpg', role: 'Lead developer' },
      date: new Date().toISOString().split('T')[0],
      readingTime: '5 min',
      toc: [],
      tags: []
    };
    try {
      await blogService.createArticle(newArt);
      loadArticles();
      selectArticle(newArt);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      <HelmetSEO title="Manage Blog | Creator CMS" />

      {/* Header */}
      <div className="flex justify-between items-center border-b border-primary/10 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-text flex items-center gap-2">
            <Rss className="h-6 w-6 text-accent animate-pulse" /> Blog CMS Workspace
          </h2>
          <p className="text-xs text-muted mt-0.5">Write articles and preview formatting blocks before deploying.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleCreateNew}>
            New Draft
          </Button>
          <Button variant="primary" size="sm" onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>

      {successMsg && (
        <div className="flex items-center gap-2 text-xs font-mono text-success bg-success/10 border border-success/20 p-3 rounded-lg">
          <CheckCircle className="h-4 w-4" />
          <span>Article changes saved to local runtime successfully!</span>
        </div>
      )}

      {/* Article Selector row */}
      <div className="flex gap-2 border-b border-primary/5 pb-2 overflow-x-auto">
        {articles.map((art: BlogArticleData) => (
          <button
            key={art.slug}
            onClick={() => selectArticle(art)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border whitespace-nowrap ${
              activeArticle?.slug === art.slug
                ? 'bg-accent/15 text-accent border-accent/20 font-bold'
                : 'text-muted bg-surface border-primary/5 hover:border-primary/20'
            }`}
          >
            {art.title}
          </button>
        ))}
      </div>

      {/* Split screen editor workspace */}
      {activeArticle && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Input parameters & Markdown Editor */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between border-b border-primary/5 pb-2">
              <h4 className="font-bold text-text text-sm">Editor Workspace</h4>
              <div className="flex gap-2 text-xs font-mono">
                <button 
                  onClick={() => setIsEditMode(true)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded ${isEditMode ? 'bg-primary/5 text-text font-bold' : 'text-muted'}`}
                >
                  <Edit2 className="h-3.5 w-3.5" /> Edit
                </button>
                <button 
                  onClick={() => setIsEditMode(false)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded ${!isEditMode ? 'bg-primary/5 text-text font-bold' : 'text-muted'}`}
                >
                  <Eye className="h-3.5 w-3.5" /> Preview Tab
                </button>
              </div>
            </div>

            {isEditMode ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Article Title</label>
                    <input 
                      type="text" 
                      value={title} 
                      onChange={(e) => setTitle(e.target.value)} 
                      className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 text-xs focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Category</label>
                    <input 
                      type="text" 
                      value={category} 
                      onChange={(e) => setCategory(e.target.value)} 
                      className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Excerpt Text</label>
                  <input 
                    type="text" 
                    value={excerpt} 
                    onChange={(e) => setExcerpt(e.target.value)} 
                    className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 text-xs focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Markdown Content</label>
                  <textarea 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                    rows={15}
                    className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
              </div>
            ) : (
              <Card className="bg-surface border border-primary/5 p-5 min-h-[400px] prose prose-slate max-w-none text-muted leading-relaxed">
                <h1 className="text-xl font-bold text-text mb-4">{title}</h1>
                <div className="whitespace-pre-line text-xs sm:text-sm">
                  {content}
                </div>
              </Card>
            )}
          </div>

          {/* Right: Live Preview Panel */}
          <div className="lg:col-span-6 space-y-4">
            <h4 className="font-bold text-text text-sm border-b border-primary/5 pb-2">Dynamic Render Preview</h4>
            <Card className="bg-surface border border-primary/5 p-6 space-y-4">
              <span className="text-[10px] font-mono text-accent uppercase tracking-wider px-2 py-0.5 rounded bg-accent/10 w-fit">
                {category || 'Uncategorized'}
              </span>
              <h2 className="text-2xl font-bold text-text leading-tight">{title || 'Untitled Draft'}</h2>
              <p className="text-xs text-muted italic">{excerpt || 'No excerpt summary defined.'}</p>
              <div className="border-t border-primary/5 pt-4 text-xs text-muted flex items-center gap-4">
                <span>Author: Ali</span>
                <span>•</span>
                <span>Date: Today</span>
              </div>
            </Card>
          </div>

        </div>
      )}
    </div>
  );
};

export default BlogAdmin;
