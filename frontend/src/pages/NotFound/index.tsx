import React from 'react';
import { HelmetSEO } from '@/components/seo/HelmetSEO';

const NotFound: React.FC = () => {
  return (
    <div>
      <HelmetSEO title="404 - Not Found" />
      <div className="border border-dashed border-rose-500/20 p-8 rounded-lg text-center bg-surface">
        <h1 className="text-2xl font-mono text-rose-500">Error 404 - Routing Panic</h1>
        <p className="text-sm text-muted mt-2">The requested workspace route does not exist.</p>
      </div>
    </div>
  );
};

export default NotFound;
