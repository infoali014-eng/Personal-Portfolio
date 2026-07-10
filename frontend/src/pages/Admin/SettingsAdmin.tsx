import React, { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle, Globe, Layout, User, FileText } from 'lucide-react';
import { HelmetSEO } from '@/components/seo/HelmetSEO';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { settingsService } from '@/services/SettingsService';

const SettingsAdmin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'sections' | 'about' | 'resume'>('general');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  // --- 1. General & SEO States ---
  const [logoText, setLogoText] = useState('');
  const [siteTitle, setSiteTitle] = useState('');
  const [siteDescription, setSiteDescription] = useState('');
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [youtube, setYoutube] = useState('');

  // --- 2. Homepage Sections States (01 - 08) ---
  const [sec01Title, setSec01Title] = useState('');
  const [sec01Headline, setSec01Headline] = useState('');
  const [sec01Desc, setSec01Desc] = useState('');
  
  const [sec02Title, setSec02Title] = useState('');
  const [sec02Headline, setSec02Headline] = useState('');

  const [sec03Title, setSec03Title] = useState('');
  const [sec03Val1, setSec03Val1] = useState('');
  const [sec03Lbl1, setSec03Lbl1] = useState('');
  const [sec03Val2, setSec03Val2] = useState('');
  const [sec03Lbl2, setSec03Lbl2] = useState('');
  const [sec03Val3, setSec03Val3] = useState('');
  const [sec03Lbl3, setSec03Lbl3] = useState('');
  const [sec03Val4, setSec03Val4] = useState('');
  const [sec03Lbl4, setSec03Lbl4] = useState('');

  const [sec04Title, setSec04Title] = useState('');
  const [sec04Headline, setSec04Headline] = useState('');
  const [sec04Desc, setSec04Desc] = useState('');

  const [sec05Title, setSec05Title] = useState('');
  const [sec05Headline, setSec05Headline] = useState('');
  const [sec05Desc, setSec05Desc] = useState('');

  const [sec06Title, setSec06Title] = useState('');
  const [sec06Headline, setSec06Headline] = useState('');
  const [sec06Desc, setSec06Desc] = useState('');

  const [sec07Title, setSec07Title] = useState('');
  const [sec07Headline, setSec07Headline] = useState('');
  const [sec07Desc, setSec07Desc] = useState('');

  const [sec08Title, setSec08Title] = useState('');
  const [sec08Headline, setSec08Headline] = useState('');
  const [sec08Desc, setSec08Desc] = useState('');

  // --- 3. About Page States ---
  const [aboutBio, setAboutBio] = useState('');
  const [aboutSkills, setAboutSkills] = useState('');
  const [aboutHighlights, setAboutHighlights] = useState('');

  // --- 4. Resume Page States ---
  const [resumeUrl, setResumeUrl] = useState('');
  const [resumeExperience, setResumeExperience] = useState('');
  const [resumeEducation, setResumeEducation] = useState('');

  useEffect(() => {
    const loadSettings = async () => {
      setLoading(true);
      try {
        // General
        setLogoText(await settingsService.getSetting('logoText', 'ALI.OS'));
        setSiteTitle(await settingsService.getSetting('siteTitle', 'Ali | CS Student & AI Builder'));
        setSiteDescription(await settingsService.getSetting('siteDescription', 'Portfolio OS - CS Student, Software Developer, and Founder of Deep Code.'));
        setGithub(await settingsService.getSetting('github', 'https://github.com'));
        setLinkedin(await settingsService.getSetting('linkedin', 'https://linkedin.com'));
        setYoutube(await settingsService.getSetting('youtube', 'https://youtube.com'));

        // Sec 01
        setSec01Title(await settingsService.getSetting('sec01Title', '01 / Story & Mission'));
        setSec01Headline(await settingsService.getSetting('sec01Headline', 'Engineering solutions for educational systems.'));
        setSec01Desc(await settingsService.getSetting('sec01Desc', `I'm a Computer Science student dedicated to developing systems that address actual constraints. My mission is to bridge the gap between academic theory and practical developer execution.\n\nAs the founder of Deep Code, I coordinate university developer networks, building tools like Study Mate AI to synthesize course documents and help students review materials dynamically.`));

        // Sec 02
        setSec02Title(await settingsService.getSetting('sec02Title', '02 / Capabilities'));
        setSec02Headline(await settingsService.getSetting('sec02Headline', 'Skills & Tooling Matrix'));

        // Sec 03
        setSec03Title(await settingsService.getSetting('sec03Title', '03 / Milestones'));
        setSec03Val1(await settingsService.getSetting('sec03Val1', '12'));
        setSec03Lbl1(await settingsService.getSetting('sec03Lbl1', 'Projects Shipped'));
        setSec03Val2(await settingsService.getSetting('sec03Val2', '1500'));
        setSec03Lbl2(await settingsService.getSetting('sec03Lbl2', 'Students Helped'));
        setSec03Val3(await settingsService.getSetting('sec03Val3', '4'));
        setSec03Lbl3(await settingsService.getSetting('sec03Lbl3', 'Years Learning'));
        setSec03Val4(await settingsService.getSetting('sec03Val4', '10'));
        setSec03Lbl4(await settingsService.getSetting('sec03Lbl4', 'Technologies'));

        // Sec 04
        setSec04Title(await settingsService.getSetting('sec04Title', '04 / Software Catalog'));
        setSec04Headline(await settingsService.getSetting('sec04Headline', 'Featured Projects'));
        setSec04Desc(await settingsService.getSetting('sec04Desc', "A collection of software, AI tools, and educational platforms I've built to solve real problems."));

        // Sec 05
        setSec05Title(await settingsService.getSetting('sec05Title', '05 / Operational Products'));
        setSec05Headline(await settingsService.getSetting('sec05Headline', 'SaaS Products & Deployed Solutions'));
        setSec05Desc(await settingsService.getSetting('sec05Desc', 'Explore commercial deployments, release frameworks, and target user statistics.'));

        // Sec 06
        setSec06Title(await settingsService.getSetting('sec06Title', '06 / Developer Society Network'));
        setSec06Headline(await settingsService.getSetting('sec06Headline', 'Deep Code Campus Chapters'));
        setSec06Desc(await settingsService.getSetting('sec06Desc', 'Scaling student-built technologies solving real academic issues.'));

        // Sec 07
        setSec07Title(await settingsService.getSetting('sec07Title', '07 / Educational Resources Registry'));
        setSec07Headline(await settingsService.getSetting('sec07Headline', 'University Cheat Sheets & Technical Notes'));
        setSec07Desc(await settingsService.getSetting('sec07Desc', 'Download open-source study guides, algorithm screencasts, and exam notes.'));

        // Sec 08
        setSec08Title(await settingsService.getSetting('sec08Title', '08 / Direct Inquiries Gateway'));
        setSec08Headline(await settingsService.getSetting('sec08Headline', "Let's Build Something Meaningful"));
        setSec08Desc(await settingsService.getSetting('sec08Desc', "Whether you're a student, developer, educator, recruiter, or organization, I'd love to hear from you. Let's build something that creates real impact."));

        // About page
        setAboutBio(await settingsService.getSetting(
          'aboutBio', 
          'I am a software engineer and CS student committed to building tools that solve real academic and operational issues. With a strong interest in full-stack architectures, clean code systems, and community open-source networks, I design applications that are scalable, secure, and transactional.'
        ));
        setAboutSkills(await settingsService.getSetting(
          'aboutSkills', 
          JSON.stringify([
            { name: 'TypeScript / React', category: 'Frontend' },
            { name: 'Node.js / Express', category: 'Backend' },
            { name: 'Supabase / PostgreSQL', category: 'Database' },
            { name: 'Python / PyTorch', category: 'AI' },
            { name: 'Git / Docker', category: 'Tools' }
          ], null, 2)
        ));
        setAboutHighlights(await settingsService.getSetting(
          'aboutHighlights',
          JSON.stringify([
            { title: 'Computer Science Student', desc: 'Focusing on distributed systems, database architectures, and algorithm design.', iconName: 'Terminal' },
            { title: 'Community Founder', desc: 'Leading Deep Code developer network to coordinate student-built tools.', iconName: 'Users' },
            { title: 'Full Stack Architect', desc: 'Engineering database integrations, transactional safety, and responsive UI/UX.', iconName: 'Cpu' }
          ], null, 2)
        ));

        // Resume page
        setResumeUrl(await settingsService.getSetting('resumeUrl', '/assets/resume.pdf'));
        setResumeExperience(await settingsService.getSetting(
          'resumeExperience',
          JSON.stringify([
            { role: 'Founder & Software Architect', company: 'Deep Code Community', duration: '2025 - Present', desc: 'Coordinating student groups and structuring full stack codebases for campus tools.' },
            { role: 'Freelance Full Stack Engineer', company: 'Self-employed', duration: '2023 - Present', desc: 'Integrating web application databases, auth policies, and Vercel hosting rules.' }
          ], null, 2)
        ));
        setResumeEducation(await settingsService.getSetting(
          'resumeEducation',
          JSON.stringify([
            { degree: 'B.Sc. in Computer Science', school: 'ETH Zurich (or University)', duration: '2024 - Present', desc: 'Acquiring theoretical computer science core concepts, virtual memory kernels, and compilers logic.' }
          ], null, 2)
        ));

      } catch (err) {
        console.error('Failed to load settings:', err);
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validate JSON fields first
      if (activeTab === 'about') {
        JSON.parse(aboutSkills);
        JSON.parse(aboutHighlights);
      }
      if (activeTab === 'resume') {
        JSON.parse(resumeExperience);
        JSON.parse(resumeEducation);
      }
    } catch (err: any) {
      alert('Invalid JSON structure! Please fix your formatting errors before saving.\nDetails: ' + err.message);
      return;
    }

    try {
      if (activeTab === 'general') {
        await settingsService.setSetting('logoText', logoText);
        await settingsService.setSetting('siteTitle', siteTitle);
        await settingsService.setSetting('siteDescription', siteDescription);
        await settingsService.setSetting('github', github);
        await settingsService.setSetting('linkedin', linkedin);
        await settingsService.setSetting('youtube', youtube);
      }

      if (activeTab === 'sections') {
        await settingsService.setSetting('sec01Title', sec01Title);
        await settingsService.setSetting('sec01Headline', sec01Headline);
        await settingsService.setSetting('sec01Desc', sec01Desc);

        await settingsService.setSetting('sec02Title', sec02Title);
        await settingsService.setSetting('sec02Headline', sec02Headline);

        await settingsService.setSetting('sec03Title', sec03Title);
        await settingsService.setSetting('sec03Val1', sec03Val1);
        await settingsService.setSetting('sec03Lbl1', sec03Lbl1);
        await settingsService.setSetting('sec03Val2', sec03Val2);
        await settingsService.setSetting('sec03Lbl2', sec03Lbl2);
        await settingsService.setSetting('sec03Val3', sec03Val3);
        await settingsService.setSetting('sec03Lbl3', sec03Lbl3);
        await settingsService.setSetting('sec03Val4', sec03Val4);
        await settingsService.setSetting('sec03Lbl4', sec03Lbl4);

        await settingsService.setSetting('sec04Title', sec04Title);
        await settingsService.setSetting('sec04Headline', sec04Headline);
        await settingsService.setSetting('sec04Desc', sec04Desc);

        await settingsService.setSetting('sec05Title', sec05Title);
        await settingsService.setSetting('sec05Headline', sec05Headline);
        await settingsService.setSetting('sec05Desc', sec05Desc);

        await settingsService.setSetting('sec06Title', sec06Title);
        await settingsService.setSetting('sec06Headline', sec06Headline);
        await settingsService.setSetting('sec06Desc', sec06Desc);

        await settingsService.setSetting('sec07Title', sec07Title);
        await settingsService.setSetting('sec07Headline', sec07Headline);
        await settingsService.setSetting('sec07Desc', sec07Desc);

        await settingsService.setSetting('sec08Title', sec08Title);
        await settingsService.setSetting('sec08Headline', sec08Headline);
        await settingsService.setSetting('sec08Desc', sec08Desc);
      }

      if (activeTab === 'about') {
        await settingsService.setSetting('aboutBio', aboutBio);
        await settingsService.setSetting('aboutSkills', aboutSkills);
        await settingsService.setSetting('aboutHighlights', aboutHighlights);
      }

      if (activeTab === 'resume') {
        await settingsService.setSetting('resumeUrl', resumeUrl);
        await settingsService.setSetting('resumeExperience', resumeExperience);
        await settingsService.setSetting('resumeEducation', resumeEducation);
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (err) {
      console.error('Error saving settings:', err);
    }
  };

  if (loading) {
    return <div className="text-center py-12 font-mono text-xs text-muted">Loading settings parameters...</div>;
  }

  return (
    <div className="space-y-8">
      <HelmetSEO title="Platform Settings | Creator CMS" />

      {/* Header */}
      <div className="flex justify-between items-center border-b border-primary/10 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-text flex items-center gap-2">
            <Settings className="h-6 w-6 text-accent" /> Platform Settings
          </h2>
          <p className="text-xs text-muted mt-0.5">Configure global default SEO, homepage sections, biography text, and timelines.</p>
        </div>
      </div>

      {saveSuccess && (
        <div className="text-xs font-mono text-success bg-success/15 border border-success/20 p-3 rounded-lg flex items-center gap-2">
          <CheckCircle className="h-4 w-4 shrink-0" />
          <span>Settings parameters updated successfully!</span>
        </div>
      )}

      {/* Navigation tabs */}
      <div className="flex flex-wrap gap-2 border-b border-primary/10 pb-2">
        <button
          onClick={() => setActiveTab('general')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all border ${
            activeTab === 'general'
              ? 'bg-accent text-white font-bold border-accent shadow-sm'
              : 'text-muted bg-surface border-primary/5 hover:border-primary/20'
          }`}
        >
          <Globe className="h-4 w-4" /> General & SEO
        </button>
        <button
          onClick={() => setActiveTab('sections')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all border ${
            activeTab === 'sections'
              ? 'bg-accent text-white font-bold border-accent shadow-sm'
              : 'text-muted bg-surface border-primary/5 hover:border-primary/20'
          }`}
        >
          <Layout className="h-4 w-4" /> Homepage Sections (01-08)
        </button>
        <button
          onClick={() => setActiveTab('about')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all border ${
            activeTab === 'about'
              ? 'bg-accent text-white font-bold border-accent shadow-sm'
              : 'text-muted bg-surface border-primary/5 hover:border-primary/20'
          }`}
        >
          <User className="h-4 w-4" /> About Me Page
        </button>
        <button
          onClick={() => setActiveTab('resume')}
          className={`flex items-center gap-1.5 px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all border ${
            activeTab === 'resume'
              ? 'bg-accent text-white font-bold border-accent shadow-sm'
              : 'text-muted bg-surface border-primary/5 hover:border-primary/20'
          }`}
        >
          <FileText className="h-4 w-4" /> Resume Timeline
        </button>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-6 text-xs sm:text-sm">
        {/* TAB 1: GENERAL & SEO */}
        {activeTab === 'general' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-surface border border-primary/5 p-6 space-y-4 shadow-sm">
              <h3 className="font-bold text-text text-sm border-b border-primary/5 pb-2">Branding & Socials</h3>
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Logo Header Text</label>
                  <input type="text" value={logoText} onChange={(e) => setLogoText(e.target.value)} className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-muted tracking-wider">GitHub Profile URL</label>
                  <input type="text" value={github} onChange={(e) => setGithub(e.target.value)} className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-muted tracking-wider">LinkedIn URL</label>
                  <input type="text" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-muted tracking-wider">YouTube Channel URL</label>
                  <input type="text" value={youtube} onChange={(e) => setYoutube(e.target.value)} className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none" />
                </div>
              </div>
            </Card>

            <Card className="bg-surface border border-primary/5 p-6 space-y-4 shadow-sm">
              <h3 className="font-bold text-text text-sm border-b border-primary/5 pb-2">SEO Configuration</h3>
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Default Webpage Title</label>
                  <input type="text" value={siteTitle} onChange={(e) => setSiteTitle(e.target.value)} className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Meta Description tag</label>
                  <textarea value={siteDescription} onChange={(e) => setSiteDescription(e.target.value)} rows={5} className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none" />
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* TAB 2: HOMEPAGE SECTIONS */}
        {activeTab === 'sections' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Section 01 */}
              <Card className="bg-surface border border-primary/5 p-6 space-y-4 shadow-sm">
                <h3 className="font-bold text-accent text-xs font-mono uppercase border-b border-primary/5 pb-2">01 / Story & Mission</h3>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Section Title</label>
                    <input type="text" value={sec01Title} onChange={(e) => setSec01Title(e.target.value)} className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Headline Text</label>
                    <input type="text" value={sec01Headline} onChange={(e) => setSec01Headline(e.target.value)} className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Biography / Description Paragraphs</label>
                    <textarea value={sec01Desc} onChange={(e) => setSec01Desc(e.target.value)} rows={6} className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none" />
                  </div>
                </div>
              </Card>

              {/* Section 02 */}
              <Card className="bg-surface border border-primary/5 p-6 space-y-4 shadow-sm">
                <h3 className="font-bold text-accent text-xs font-mono uppercase border-b border-primary/5 pb-2">02 / Capabilities</h3>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Section Title</label>
                    <input type="text" value={sec02Title} onChange={(e) => setSec02Title(e.target.value)} className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Headline Text</label>
                    <input type="text" value={sec02Headline} onChange={(e) => setSec02Headline(e.target.value)} className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none" />
                  </div>
                </div>
              </Card>

              {/* Section 03 */}
              <Card className="bg-surface border border-primary/5 p-6 space-y-4 shadow-sm md:col-span-2">
                <h3 className="font-bold text-accent text-xs font-mono uppercase border-b border-primary/5 pb-2">03 / Milestones</h3>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Section Title</label>
                    <input type="text" value={sec03Title} onChange={(e) => setSec03Title(e.target.value)} className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none" />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Value 1</label>
                      <input type="text" value={sec03Val1} onChange={(e) => setSec03Val1(e.target.value)} className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none" />
                      <label className="text-[9px] font-mono uppercase text-muted">Label 1</label>
                      <input type="text" value={sec03Lbl1} onChange={(e) => setSec03Lbl1(e.target.value)} className="w-full rounded-lg bg-background border border-primary/10 px-3 py-1 focus:outline-none" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Value 2</label>
                      <input type="text" value={sec03Val2} onChange={(e) => setSec03Val2(e.target.value)} className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none" />
                      <label className="text-[9px] font-mono uppercase text-muted">Label 2</label>
                      <input type="text" value={sec03Lbl2} onChange={(e) => setSec03Lbl2(e.target.value)} className="w-full rounded-lg bg-background border border-primary/10 px-3 py-1 focus:outline-none" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Value 3</label>
                      <input type="text" value={sec03Val3} onChange={(e) => setSec03Val3(e.target.value)} className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none" />
                      <label className="text-[9px] font-mono uppercase text-muted">Label 3</label>
                      <input type="text" value={sec03Lbl3} onChange={(e) => setSec03Lbl3(e.target.value)} className="w-full rounded-lg bg-background border border-primary/10 px-3 py-1 focus:outline-none" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Value 4</label>
                      <input type="text" value={sec03Val4} onChange={(e) => setSec03Val4(e.target.value)} className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none" />
                      <label className="text-[9px] font-mono uppercase text-muted">Label 4</label>
                      <input type="text" value={sec03Lbl4} onChange={(e) => setSec03Lbl4(e.target.value)} className="w-full rounded-lg bg-background border border-primary/10 px-3 py-1 focus:outline-none" />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Section 04 */}
              <Card className="bg-surface border border-primary/5 p-6 space-y-4 shadow-sm">
                <h3 className="font-bold text-accent text-xs font-mono uppercase border-b border-primary/5 pb-2">04 / Software Catalog</h3>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Section Title</label>
                    <input type="text" value={sec04Title} onChange={(e) => setSec04Title(e.target.value)} className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Headline Text</label>
                    <input type="text" value={sec04Headline} onChange={(e) => setSec04Headline(e.target.value)} className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Description Text</label>
                    <textarea value={sec04Desc} onChange={(e) => setSec04Desc(e.target.value)} rows={3} className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none" />
                  </div>
                </div>
              </Card>

              {/* Section 05 */}
              <Card className="bg-surface border border-primary/5 p-6 space-y-4 shadow-sm">
                <h3 className="font-bold text-accent text-xs font-mono uppercase border-b border-primary/5 pb-2">05 / Operational Products</h3>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Section Title</label>
                    <input type="text" value={sec05Title} onChange={(e) => setSec05Title(e.target.value)} className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Headline Text</label>
                    <input type="text" value={sec05Headline} onChange={(e) => setSec05Headline(e.target.value)} className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Description Text</label>
                    <textarea value={sec05Desc} onChange={(e) => setSec05Desc(e.target.value)} rows={3} className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none" />
                  </div>
                </div>
              </Card>

              {/* Section 06 */}
              <Card className="bg-surface border border-primary/5 p-6 space-y-4 shadow-sm">
                <h3 className="font-bold text-accent text-xs font-mono uppercase border-b border-primary/5 pb-2">06 / Developer Society Network</h3>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Section Title</label>
                    <input type="text" value={sec06Title} onChange={(e) => setSec06Title(e.target.value)} className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Headline Text</label>
                    <input type="text" value={sec06Headline} onChange={(e) => setSec06Headline(e.target.value)} className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Description Text</label>
                    <textarea value={sec06Desc} onChange={(e) => setSec06Desc(e.target.value)} rows={3} className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none" />
                  </div>
                </div>
              </Card>

              {/* Section 07 */}
              <Card className="bg-surface border border-primary/5 p-6 space-y-4 shadow-sm">
                <h3 className="font-bold text-accent text-xs font-mono uppercase border-b border-primary/5 pb-2">07 / Educational Resources Registry</h3>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Section Title</label>
                    <input type="text" value={sec07Title} onChange={(e) => setSec07Title(e.target.value)} className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Headline Text</label>
                    <input type="text" value={sec07Headline} onChange={(e) => setSec07Headline(e.target.value)} className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Description Text</label>
                    <textarea value={sec07Desc} onChange={(e) => setSec07Desc(e.target.value)} rows={3} className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none" />
                  </div>
                </div>
              </Card>

              {/* Section 08 */}
              <Card className="bg-surface border border-primary/5 p-6 space-y-4 shadow-sm md:col-span-2">
                <h3 className="font-bold text-accent text-xs font-mono uppercase border-b border-primary/5 pb-2">08 / Direct Inquiries Gateway</h3>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Section Title</label>
                    <input type="text" value={sec08Title} onChange={(e) => setSec08Title(e.target.value)} className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Headline Text</label>
                    <input type="text" value={sec08Headline} onChange={(e) => setSec08Headline(e.target.value)} className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Description Text</label>
                    <textarea value={sec08Desc} onChange={(e) => setSec08Desc(e.target.value)} rows={3} className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none" />
                  </div>
                </div>
              </Card>

            </div>
          </div>
        )}

        {/* TAB 3: ABOUT ME PAGE */}
        {activeTab === 'about' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-surface border border-primary/5 p-6 space-y-4 shadow-sm md:col-span-2">
              <h3 className="font-bold text-text text-sm border-b border-primary/5 pb-2">Biography Paragraphs</h3>
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Main Biography Text</label>
                <textarea value={aboutBio} onChange={(e) => setAboutBio(e.target.value)} rows={12} className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none" />
              </div>
            </Card>

            <div className="space-y-6">
              <Card className="bg-surface border border-primary/5 p-6 space-y-4 shadow-sm">
                <h3 className="font-bold text-text text-sm border-b border-primary/5 pb-2">Highlights (JSON)</h3>
                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-muted">Format: Array of objects with title, desc, iconName</label>
                  <textarea value={aboutHighlights} onChange={(e) => setAboutHighlights(e.target.value)} rows={7} className="w-full rounded-lg bg-background border border-primary/10 p-2 font-mono text-[11px] focus:outline-none" />
                </div>
              </Card>

              <Card className="bg-surface border border-primary/5 p-6 space-y-4 shadow-sm">
                <h3 className="font-bold text-text text-sm border-b border-primary/5 pb-2">Core Skills Matrix (JSON)</h3>
                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-muted">Format: Array of objects with name, category</label>
                  <textarea value={aboutSkills} onChange={(e) => setAboutSkills(e.target.value)} rows={7} className="w-full rounded-lg bg-background border border-primary/10 p-2 font-mono text-[11px] focus:outline-none" />
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* TAB 4: RESUME TIMELINE */}
        {activeTab === 'resume' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-surface border border-primary/5 p-6 space-y-4 shadow-sm">
              <h3 className="font-bold text-text text-sm border-b border-primary/5 pb-2">Employment History (JSON)</h3>
              <div className="space-y-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Resume PDF Download Link</label>
                  <input type="text" value={resumeUrl} onChange={(e) => setResumeUrl(e.target.value)} className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none" />
                </div>
                <div className="space-y-1 pt-2">
                  <label className="text-[9px] font-mono text-muted">Work Timeline: Array of role, company, duration, desc</label>
                  <textarea value={resumeExperience} onChange={(e) => setResumeExperience(e.target.value)} rows={12} className="w-full rounded-lg bg-background border border-primary/10 p-2 font-mono text-[11px] focus:outline-none" />
                </div>
              </div>
            </Card>

            <Card className="bg-surface border border-primary/5 p-6 space-y-4 shadow-sm">
              <h3 className="font-bold text-text text-sm border-b border-primary/5 pb-2">Academic Qualifications (JSON)</h3>
              <div className="space-y-1">
                <label className="text-[9px] font-mono text-muted">Education Timeline: Array of degree, school, duration, desc</label>
                <textarea value={resumeEducation} onChange={(e) => setResumeEducation(e.target.value)} rows={15} className="w-full rounded-lg bg-background border border-primary/10 p-2 font-mono text-[11px] focus:outline-none" />
              </div>
            </Card>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end pt-4 border-t border-primary/5">
          <Button variant="primary" type="submit">
            <Save className="mr-1.5 h-4 w-4" /> Save current settings
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SettingsAdmin;
