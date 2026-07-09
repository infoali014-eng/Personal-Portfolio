import React from 'react';
import { HelmetSEO } from '@/components/seo/HelmetSEO';

const Blog: React.FC = () => {
  return (
    <div>
      <HelmetSEO title="Blog Feed" description="Read articles on startup building, AI utilities, and software design." />
      <div className="border border-dashed border-primary/20 p-8 rounded-lg text-center bg-surface">
        <h1 className="text-2xl font-mono text-accent">/blog</h1>
        <p className="text-sm text-muted mt-2">Dynamic index of tech articles and design retro logs.</p>
      </div>
    </div>
  );
};

export default Blog;
