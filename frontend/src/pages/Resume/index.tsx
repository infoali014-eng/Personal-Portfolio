import React, { useState, useEffect } from 'react';
import { HelmetSEO } from '@/components/seo/HelmetSEO';
import { Button } from '@/components/ui/Button';
import { Download, Calendar, Briefcase, GraduationCap } from 'lucide-react';
import { settingsService } from '@/services/SettingsService';

interface ResumeItem {
  role?: string;
  degree?: string;
  company?: string;
  school?: string;
  duration: string;
  desc: string;
}

const Resume: React.FC = () => {
  const [experience, setExperience] = useState<ResumeItem[]>([]);
  const [education, setEducation] = useState<ResumeItem[]>([]);
  const [resumeUrl, setResumeUrl] = useState('/assets/resume.pdf');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumeData = async () => {
      setLoading(true);
      try {
        const expStr = await settingsService.getSetting('resumeExperience', '[]');
        const eduStr = await settingsService.getSetting('resumeEducation', '[]');
        const pdfUrl = await settingsService.getSetting('resumeUrl', '/assets/resume.pdf');
        
        setExperience(JSON.parse(expStr));
        setEducation(JSON.parse(eduStr));
        setResumeUrl(pdfUrl);
      } catch (err) {
        console.error('Error parsing resume settings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchResumeData();
  }, []);

  if (loading) {
    return <div className="text-center py-12 font-mono text-xs text-muted">Loading timeline...</div>;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      <HelmetSEO title="Resume Experience" description="Ali's professional curriculum vitae and academic history." />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-primary/10 pb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text">Curriculum Vitae</h1>
          <p className="text-sm text-muted mt-1">Review my employment history and academic benchmarks.</p>
        </div>

        {resumeUrl && (
          <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="shrink-0" download>
            <Button variant="primary">
              <Download className="mr-2 h-4 w-4" /> Download PDF Resume
            </Button>
          </a>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Experience Timeline */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-text flex items-center gap-2 border-b border-primary/5 pb-2">
            <Briefcase className="h-5 w-5 text-accent" /> Work Experience
          </h3>

          <div className="space-y-6 relative pl-6 border-l border-l-accent/20">
            {experience.map((exp, idx) => (
              <div key={idx} className="space-y-1.5 relative">
                <div className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full bg-accent border-2 border-background" />
                <span className="text-[10px] font-mono font-bold text-accent flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> {exp.duration}
                </span>
                <h4 className="font-bold text-text text-sm sm:text-base">{exp.role}</h4>
                <p className="text-xs font-mono text-muted">{exp.company}</p>
                <p className="text-xs sm:text-sm text-muted leading-relaxed pt-1">{exp.desc}</p>
              </div>
            ))}

            {experience.length === 0 && (
              <p className="text-xs text-muted font-mono pl-2">No work experience entries cataloged.</p>
            )}
          </div>
        </div>

        {/* Education Timeline */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-text flex items-center gap-2 border-b border-primary/5 pb-2">
            <GraduationCap className="h-5 w-5 text-accent" /> Academic History
          </h3>

          <div className="space-y-6 relative pl-6 border-l border-l-accent/20">
            {education.map((edu, idx) => (
              <div key={idx} className="space-y-1.5 relative">
                <div className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full bg-accent border-2 border-background" />
                <span className="text-[10px] font-mono font-bold text-accent flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> {edu.duration}
                </span>
                <h4 className="font-bold text-text text-sm sm:text-base">{edu.degree}</h4>
                <p className="text-xs font-mono text-muted">{edu.school}</p>
                <p className="text-xs sm:text-sm text-muted leading-relaxed pt-1">{edu.desc}</p>
              </div>
            ))}

            {education.length === 0 && (
              <p className="text-xs text-muted font-mono pl-2">No academic history entries cataloged.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Resume;
