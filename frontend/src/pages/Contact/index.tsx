import React from 'react';
import { HelmetSEO } from '@/components/seo/HelmetSEO';

const Contact: React.FC = () => {
  return (
    <div>
      <HelmetSEO title="Contact" description="Get in touch for collaborative software engineering opportunities." />
      <div className="border border-dashed border-primary/20 p-8 rounded-lg text-center bg-surface">
        <h1 className="text-2xl font-mono text-accent">/contact</h1>
        <p className="text-sm text-muted mt-2">Form fields layout mapping to the backend /api/contact handler.</p>
      </div>
    </div>
  );
};

export default Contact;
