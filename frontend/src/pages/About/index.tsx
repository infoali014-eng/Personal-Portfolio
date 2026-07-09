import React from 'react';
import { HelmetSEO } from '@/components/seo/HelmetSEO';

const About: React.FC = () => {
  return (
    <div>
      <HelmetSEO title="About" description="Ali's biography and background story." />
      <div className="border border-dashed border-primary/20 p-8 rounded-lg text-center bg-surface">
        <h1 className="text-2xl font-mono text-accent">/about</h1>
        <p className="text-sm text-muted mt-2">Biography and background story skeleton.</p>
      </div>
    </div>
  );
};

export default About;
