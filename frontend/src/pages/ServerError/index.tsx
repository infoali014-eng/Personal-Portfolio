import React from 'react';
import { HelmetSEO } from '@/components/seo/HelmetSEO';

const ServerError: React.FC = () => {
  return (
    <div>
      <HelmetSEO title="500 - Server Error" />
      <div className="border border-dashed border-rose-500/20 p-8 rounded-lg text-center bg-surface">
        <h1 className="text-2xl font-mono text-rose-500">Error 500 - Exception Pane</h1>
        <p className="text-sm text-muted mt-2">API layer failed to resolve requests.</p>
      </div>
    </div>
  );
};

export default ServerError;
