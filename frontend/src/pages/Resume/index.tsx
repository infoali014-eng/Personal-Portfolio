import React from 'react';
import { HelmetSEO } from '@/components/seo/HelmetSEO';

const Resume: React.FC = () => {
  return (
    <div>
      <HelmetSEO title="Resume" description="Ali's experience history, tech stacks, and academic background." />
      <div className="border border-dashed border-primary/20 p-8 rounded-lg text-center bg-surface">
        <h1 className="text-2xl font-mono text-accent">/resume</h1>
        <p className="text-sm text-muted mt-2">Work highlights viewer and PDF download connector.</p>
      </div>
    </div>
  );
};

export default Resume;
