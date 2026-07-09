import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Cpu, ExternalLink, Terminal } from 'lucide-react';
import { HelmetSEO } from '@/components/seo/HelmetSEO';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PROJECTS_REGISTRY } from '@/data/projects';

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Find project in data registry
  const project = slug ? PROJECTS_REGISTRY[slug] : null;

  if (!project) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center space-y-6">
        <HelmetSEO title="Project Not Found" />
        <Terminal className="h-12 w-12 text-muted mx-auto animate-pulse" />
        <h2 className="text-xl font-mono text-text font-bold">Case Study Not Found</h2>
        <p className="text-sm text-muted">
          The requested project record is not found in the config files registry.
        </p>
        <Button variant="outline" onClick={() => navigate('/projects')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to projects list
        </Button>
      </div>
    );
  }

  // Find next/prev projects
  const keys = Object.keys(PROJECTS_REGISTRY);
  const currentIdx = keys.indexOf(project.slug);
  const prevSlug = currentIdx > 0 ? keys[currentIdx - 1] : null;
  const nextSlug = currentIdx < keys.length - 1 ? keys[currentIdx + 1] : null;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
      <HelmetSEO 
        title={`${project.title} | Case Study`} 
        description={project.tagline}
      />

      {/* Back navigation */}
      <button 
        onClick={() => navigate('/projects')}
        className="flex items-center gap-2 text-xs font-mono text-muted hover:text-accent transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to projects catalog
      </button>

      {/* Project Hero header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-primary/10 pb-8">
        <div className="lg:col-span-8 space-y-4">
          <Badge variant="tech" className="bg-accent/15 text-accent border-accent/20">
            {project.category}
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text">
            {project.title}
          </h1>
          <p className="text-base sm:text-lg text-muted max-w-2xl leading-relaxed">
            {project.tagline}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="primary">
                  Launch Demo <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline">
                  GitHub Codebase
                </Button>
              </a>
            )}
          </div>
        </div>

        {/* Metrics side card */}
        <div className="lg:col-span-4 w-full">
          <Card className="bg-surface border border-primary/5 p-6 space-y-4 shadow-sm">
            <h3 className="text-xs font-mono uppercase text-muted tracking-wider">Project Indicators</h3>
            <div className="divide-y divide-primary/5">
              {project.metrics.map((metric, idx) => (
                <div key={idx} className="flex justify-between py-2.5 text-xs font-mono">
                  <span className="text-muted">{metric.label}</span>
                  <span className="text-accent font-semibold">{metric.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Case Study Body Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Details */}
        <div className="lg:col-span-8 space-y-12">
          {/* Overview */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-text">Overview</h2>
            <p className="text-sm sm:text-base text-muted leading-relaxed">{project.overview}</p>
          </div>

          {/* Problem & Solution block */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <Card className="bg-surface border border-primary/5 p-6 space-y-3">
              <h3 className="font-bold text-text text-base flex items-center gap-2">
                <Terminal className="h-4 w-4 text-accent" /> The Problem
              </h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">{project.problem}</p>
            </Card>
            <Card className="bg-surface border border-primary/5 p-6 space-y-3">
              <h3 className="font-bold text-text text-base flex items-center gap-2">
                <Cpu className="h-4 w-4 text-accent animate-pulse" /> The Solution
              </h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">{project.solution}</p>
            </Card>
          </div>

          {/* Key capabilities list */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-text">Key Features</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted">
                  <span className="h-5 w-5 rounded bg-accent/5 text-accent font-mono text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="leading-normal">{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Journey, challenges & lessons */}
          <div className="space-y-8">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-text">Development Journey</h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">{project.journey}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-text">Key Technical Challenges</h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">{project.challenges}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-text">Lessons Learned</h3>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">{project.lessons}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Stack & Actions */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="bg-surface border border-primary/5 p-6 space-y-6 shadow-sm">
            <h3 className="text-sm font-bold text-text">Technology Stack</h3>
            <div className="space-y-4">
              {project.techStack.map((stack, idx) => (
                <div key={idx} className="space-y-2">
                  <span className="text-[10px] text-muted font-mono uppercase tracking-wider font-semibold">{stack.category}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {stack.items.map((item) => (
                      <span key={item} className="px-2 py-0.5 rounded bg-primary/5 text-muted font-mono text-[10px]">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

      </div>

      {/* Case Studies Adjacent Navigation */}
      <div className="flex justify-between items-center border-t border-primary/10 pt-8 mt-12 text-xs font-mono">
        {prevSlug ? (
          <button 
            onClick={() => navigate(`/projects/${prevSlug}`)}
            className="flex items-center gap-2 text-muted hover:text-accent transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Previous Project Case
          </button>
        ) : <div />}

        {nextSlug ? (
          <button 
            onClick={() => navigate(`/projects/${nextSlug}`)}
            className="flex items-center gap-2 text-muted hover:text-accent transition-colors"
          >
            Next Project Case <ArrowRight className="h-4 w-4" />
          </button>
        ) : <div />}
      </div>
    </div>
  );
};

export default ProjectDetail;
