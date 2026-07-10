import React from 'react';
import { HelmetSEO } from '@/components/seo/HelmetSEO';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Cpu, Terminal, Users, Award } from 'lucide-react';

const About: React.FC = () => {
  const skills = [
    { name: 'TypeScript / React', category: 'Frontend' },
    { name: 'Node.js / Express', category: 'Backend' },
    { name: 'Supabase / PostgreSQL', category: 'Database' },
    { name: 'Python / PyTorch', category: 'AI' },
    { name: 'Git / Docker', category: 'Tools' }
  ];

  const highlights = [
    { title: 'Computer Science Student', desc: 'Focusing on distributed systems, database architectures, and algorithm design.', icon: <Terminal className="h-5 w-5 text-accent" /> },
    { title: 'Community Founder', desc: 'Leading Deep Code developer network to coordinate student-built tools.', icon: <Users className="h-5 w-5 text-accent" /> },
    { title: 'Full Stack Architect', desc: 'Engineering database integrations, transactional safety, and responsive UI/UX.', icon: <Cpu className="h-5 w-5 text-accent" /> }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      <HelmetSEO title="About Me" description="Ali's biography, core competencies, and professional background." />

      {/* Header */}
      <div className="border-b border-primary/10 pb-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text">About Ali</h1>
        <p className="text-sm text-muted mt-1">Computer Science Student, Full-Stack Developer, and Community Builder.</p>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Biography */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="bg-surface border border-primary/5 p-6 space-y-4">
            <h3 className="text-lg font-bold text-accent font-mono flex items-center gap-2">
              <Award className="h-5 w-5" /> Professional Background
            </h3>
            <p className="text-sm sm:text-base text-muted leading-relaxed">
              I am a software engineer and CS student committed to building tools that solve real academic and operational issues. With a strong interest in full-stack architectures, clean code systems, and community open-source networks, I design applications that are scalable, secure, and transactional.
            </p>
            <p className="text-sm sm:text-base text-muted leading-relaxed">
              As the founder of the Deep Code community, I lead student development squads to build software solutions that assist campus registration, resource sharing, and peer networking.
            </p>
          </Card>

          {/* Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {highlights.map((high, idx) => (
              <Card key={idx} className="bg-surface border border-primary/5 p-5 space-y-2 flex flex-col justify-between">
                <div className="p-2.5 bg-primary/5 rounded-xl w-fit border border-primary/10 mb-2">
                  {high.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-text text-sm sm:text-base">{high.title}</h4>
                  <p className="text-xs text-muted leading-relaxed">{high.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Column: Skills */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="bg-surface border border-primary/5 p-6 space-y-4">
            <h3 className="text-sm font-bold text-text border-b border-primary/5 pb-2 uppercase font-mono tracking-wider text-muted">Core Skills</h3>
            <div className="space-y-3">
              {skills.map((skill, idx) => (
                <div key={idx} className="flex justify-between items-center py-2 border-b border-primary/5 last:border-0">
                  <span className="text-xs sm:text-sm font-medium text-text">{skill.name}</span>
                  <Badge variant="tech" className="text-[10px]">{skill.category}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
