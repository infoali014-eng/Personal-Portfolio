import React from 'react';
import { HelmetSEO } from '@/components/seo/HelmetSEO';

const Projects: React.FC = () => {
  return (
    <div className="py-8 text-center">
      <HelmetSEO title="Projects" />
      <h1 className="text-xl font-mono">Projects Directory Shell</h1>
    </div>
  );
};

export default Projects;
