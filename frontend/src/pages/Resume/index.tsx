import React from 'react';
import { HelmetSEO } from '@/components/seo/HelmetSEO';
import { Button } from '@/components/ui/Button';
import { Download, Calendar, Briefcase, GraduationCap } from 'lucide-react';

const Resume: React.FC = () => {
  const experience = [
    { role: 'Founder & Software Architect', company: 'Deep Code Community', duration: '2025 - Present', desc: 'Coordinating student groups and structuring full stack codebases for campus tools.' },
    { role: 'Freelance Full Stack Engineer', company: 'Self-employed', duration: '2023 - Present', desc: 'Integrating web application databases, auth policies, and Vercel hosting rules.' }
  ];

  const education = [
    { degree: 'B.Sc. in Computer Science', school: 'ETH Zurich (or University)', duration: '2024 - Present', desc: 'Acquiring theoretical computer science core concepts, virtual memory kernels, and compilers logic.' }
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      <HelmetSEO title="Resume Experience" description="Ali's professional curriculum vitae and academic history." />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-primary/10 pb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text">Curriculum Vitae</h1>
          <p className="text-sm text-muted mt-1">Review my employment history and academic benchmarks.</p>
        </div>

        <a href="/assets/resume.pdf" download className="shrink-0">
          <Button variant="primary">
            <Download className="mr-2 h-4 w-4" /> Download PDF Resume
          </Button>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Experience Timeline */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-text flex items-center gap-2 border-b border-primary/5 pb-2">
            <Briefcase className="h-5 w-5 text-accent" /> Work Experience
          </h3>

          <div className="space-y-6 relative pl-6 border-l border-primary/10">
            {experience.map((exp, idx) => (
              <div key={idx} className="space-y-1.5 relative">
                <div className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full bg-accent border-2 border-background" />
                <span className="text-[10px] font-mono font-bold text-accent flex items-center gap-1"><Calendar className="h-3 w-3" /> {exp.duration}</span>
                <h4 className="font-bold text-text text-sm sm:text-base">{exp.role}</h4>
                <p className="text-xs font-mono text-muted">{exp.company}</p>
                <p className="text-xs sm:text-sm text-muted leading-relaxed pt-1">{exp.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education Timeline */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-text flex items-center gap-2 border-b border-primary/5 pb-2">
            <GraduationCap className="h-5 w-5 text-accent" /> Academic History
          </h3>

          <div className="space-y-6 relative pl-6 border-l border-primary/10">
            {education.map((edu, idx) => (
              <div key={idx} className="space-y-1.5 relative">
                <div className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full bg-accent border-2 border-background" />
                <span className="text-[10px] font-mono font-bold text-accent flex items-center gap-1"><Calendar className="h-3 w-3" /> {edu.duration}</span>
                <h4 className="font-bold text-text text-sm sm:text-base">{edu.degree}</h4>
                <p className="text-xs font-mono text-muted">{edu.school}</p>
                <p className="text-xs sm:text-sm text-muted leading-relaxed pt-1">{edu.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Resume;
