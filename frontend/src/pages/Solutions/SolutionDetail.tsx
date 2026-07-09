import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ChevronDown, ChevronUp, Download, ExternalLink, Flame, Info } from 'lucide-react';
import { HelmetSEO } from '@/components/seo/HelmetSEO';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SOLUTIONS_REGISTRY } from '@/data/solutions';

const SolutionDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  // Find solution in data registry
  const solution = slug ? SOLUTIONS_REGISTRY[slug] : null;

  if (!solution) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center space-y-6">
        <HelmetSEO title="Solution Not Found" />
        <Info className="h-12 w-12 text-muted mx-auto animate-pulse" />
        <h2 className="text-xl font-mono text-text font-bold">Solution Not Found</h2>
        <p className="text-sm text-muted">
          The requested solution is not cataloged in the data configuration.
        </p>
        <Button variant="outline" onClick={() => navigate('/solutions')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to solutions
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
      <HelmetSEO 
        title={`${solution.name} | Solution Detail`} 
        description={solution.tagline}
      />

      {/* Back button */}
      <button 
        onClick={() => navigate('/solutions')}
        className="flex items-center gap-2 text-xs font-mono text-muted hover:text-accent transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to solutions catalog
      </button>

      {/* Solution Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-primary/10 pb-8">
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant="tech" className="bg-accent/15 text-accent border-accent/20">
              {solution.category}
            </Badge>
            <span className="text-xs font-mono text-muted">Version v{solution.version}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-text">
            {solution.name}
          </h1>
          <p className="text-base sm:text-lg text-muted max-w-2xl leading-relaxed">
            {solution.tagline}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            {solution.demoUrl && (
              <a href={solution.demoUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="primary">
                  Launch App <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </a>
            )}
            {solution.githubUrl && (
              <a href={solution.githubUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline">
                  GitHub Code
                </Button>
              </a>
            )}
          </div>
        </div>

        {/* Info stats card */}
        <div className="lg:col-span-4 w-full">
          <Card className="bg-surface border border-primary/5 p-6 space-y-4 shadow-sm">
            <h3 className="text-xs font-mono uppercase text-muted tracking-wider">Solution Metrics</h3>
            <div className="divide-y divide-primary/5 text-xs font-mono">
              <div className="flex justify-between py-2.5">
                <span className="text-muted">Target Audience</span>
                <span className="text-accent font-semibold">{solution.audience}</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-muted">Downloads</span>
                <span className="text-accent font-semibold">{solution.downloadsCount}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Main body content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left: Overview, features, benefits, FAQs */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Overview */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-text">Overview</h2>
            <p className="text-sm sm:text-base text-muted leading-relaxed">{solution.overview}</p>
          </div>

          {/* Features check grid */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-text">Key Features</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {solution.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-muted">
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Value benefits cards */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-text">Primary Benefits</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {solution.benefits.map((benefit, idx) => (
                <Card key={idx} className="bg-surface border border-primary/5 p-5 space-y-2">
                  <span className="text-xs font-mono font-bold text-accent">Benefit 0{idx + 1}</span>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">{benefit}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* FAQs List */}
          <div className="space-y-6 pt-4">
            <h3 className="text-lg font-bold text-text">Frequently Asked Questions</h3>
            <div className="space-y-3">
              {solution.faqs.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div key={idx} className="border border-primary/10 bg-surface rounded-xl overflow-hidden transition-all shadow-sm">
                    <button
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-4 text-left font-bold text-text text-sm hover:bg-primary/5 transition-colors focus:outline-none"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronDown className="h-4 w-4 text-accent" /> : <ChevronUp className="h-4 w-4 text-muted" />}
                    </button>
                    {isOpen && (
                      <p className="p-4 border-t border-primary/5 text-xs sm:text-sm text-muted leading-relaxed bg-background/50">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right: Roadmap timelines */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="bg-surface border border-primary/5 p-6 space-y-4 shadow-sm">
            <h4 className="text-xs font-mono uppercase text-muted tracking-wider flex items-center gap-2">
              <Flame className="h-4 w-4 text-orange-500 fill-orange-500" /> Operational Roadmap
            </h4>
            <div className="space-y-4">
              {solution.roadmap.map((road, idx) => (
                <div key={idx} className="space-y-1 relative pl-4 border-l border-primary/10">
                  <span className="text-[10px] text-accent font-mono font-bold">{road.phase}</span>
                  <h5 className="font-bold text-text text-xs sm:text-sm">{road.title}</h5>
                  <p className="text-[11px] text-muted leading-relaxed">{road.desc}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 p-6 space-y-4 rounded-3xl text-center">
            <h4 className="font-bold text-text text-sm flex items-center justify-center gap-2">
              <Download className="h-5 w-5 text-accent animate-pulse" /> Document Registry
            </h4>
            <p className="text-xs text-muted leading-relaxed">
              Download the deployment sheets and local configuration manuals.
            </p>
            <Button variant="primary" className="w-full text-xs">
              Download Package
            </Button>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default SolutionDetail;
