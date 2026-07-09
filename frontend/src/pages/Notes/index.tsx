import React from 'react';
import { HelmetSEO } from '@/components/seo/HelmetSEO';

const Notes: React.FC = () => {
  return (
    <div>
      <HelmetSEO title="Notes Library" description="Searchable list of university course notes and guides." />
      <div className="border border-dashed border-primary/20 p-8 rounded-lg text-center bg-surface">
        <h1 className="text-2xl font-mono text-accent">/notes</h1>
        <p className="text-sm text-muted mt-2">Filterable course notes index mapping to YouTube lectures.</p>
      </div>
    </div>
  );
};

export default Notes;
