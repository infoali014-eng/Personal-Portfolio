import React, { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle } from 'lucide-react';
import { HelmetSEO } from '@/components/seo/HelmetSEO';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { settingsService } from '@/services/SettingsService';

const SettingsAdmin: React.FC = () => {
  // Global SEO Settings
  const [siteTitle, setSiteTitle] = useState('');
  const [siteDescription, setSiteDescription] = useState('');
  
  // Socials
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [youtube, setYoutube] = useState('');

  // Brand details
  const [logoText, setLogoText] = useState('');

  // Hero Section Settings
  const [heroHeadline, setHeroHeadline] = useState('');
  const [heroSubtitle, setHeroSubtitle] = useState('');
  const [heroDescription, setHeroDescription] = useState('');
  
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      setLoading(true);
      try {
        const logo = await settingsService.getSetting('logoText', 'ALI.OS');
        const title = await settingsService.getSetting('siteTitle', 'Ali | CS Student & AI Builder');
        const desc = await settingsService.getSetting('siteDescription', 'Portfolio OS - CS Student, Software Developer, and Founder of Deep Code.');
        const git = await settingsService.getSetting('github', 'https://github.com');
        const link = await settingsService.getSetting('linkedin', 'https://linkedin.com');
        const yt = await settingsService.getSetting('youtube', 'https://youtube.com');

        const headline = await settingsService.getSetting('heroHeadline', 'Building tools that solve real problems — one line of code at a time.');
        const sub = await settingsService.getSetting('heroSubtitle', 'CS Student @ University | Founder of Deep Code');
        const heroDesc = await settingsService.getSetting('heroDescription', "I'm a software developer focused on designing full-stack systems, automated learning tools, and coordinating open campus developer networks.");

        setLogoText(logo);
        setSiteTitle(title);
        setSiteDescription(desc);
        setGithub(git);
        setLinkedin(link);
        setYoutube(yt);
        setHeroHeadline(headline);
        setHeroSubtitle(sub);
        setHeroDescription(heroDesc);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await settingsService.setSetting('logoText', logoText);
      await settingsService.setSetting('siteTitle', siteTitle);
      await settingsService.setSetting('siteDescription', siteDescription);
      await settingsService.setSetting('github', github);
      await settingsService.setSetting('linkedin', linkedin);
      await settingsService.setSetting('youtube', youtube);
      await settingsService.setSetting('heroHeadline', heroHeadline);
      await settingsService.setSetting('heroSubtitle', heroSubtitle);
      await settingsService.setSetting('heroDescription', heroDescription);

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch (err) {
      console.error(err);
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
          <p className="text-xs text-muted mt-0.5">Configure global default SEO metadata and brand social profiles links.</p>
        </div>
      </div>

      {saveSuccess && (
        <div className="text-xs font-mono text-success bg-success/10 border border-success/20 p-3 rounded-lg flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          <span>Platform metadata updated successfully!</span>
        </div>
      )}

      {/* Forms Panels Grid */}
      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Brand & SEO */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Brand Assets */}
          <Card className="bg-surface border border-primary/5 p-6 space-y-4 shadow-sm">
            <h3 className="font-bold text-text text-sm border-b border-primary/5 pb-2">Brand Assets</h3>
            
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Logo Header Text</label>
                <input 
                  type="text" 
                  value={logoText} 
                  onChange={(e) => setLogoText(e.target.value)} 
                  className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none"
                />
              </div>
            </div>
          </Card>

          {/* Hero Section Configs */}
          <Card className="bg-surface border border-primary/5 p-6 space-y-4 shadow-sm">
            <h3 className="font-bold text-text text-sm border-b border-primary/5 pb-2">Hero Section Brand Profile</h3>
            
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Hero Headline Text</label>
                <input 
                  type="text" 
                  value={heroHeadline} 
                  onChange={(e) => setHeroHeadline(e.target.value)} 
                  className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Hero Subtitle</label>
                <input 
                  type="text" 
                  value={heroSubtitle} 
                  onChange={(e) => setHeroSubtitle(e.target.value)} 
                  className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Hero Bio Description</label>
                <textarea 
                  value={heroDescription} 
                  onChange={(e) => setHeroDescription(e.target.value)} 
                  rows={3}
                  className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none"
                />
              </div>
            </div>
          </Card>

          {/* Global SEO Defaults */}
          <Card className="bg-surface border border-primary/5 p-6 space-y-4 shadow-sm">
            <h3 className="font-bold text-text text-sm border-b border-primary/5 pb-2">SEO Configurations</h3>
            
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Default Webpage Title</label>
                <input 
                  type="text" 
                  value={siteTitle} 
                  onChange={(e) => setSiteTitle(e.target.value)} 
                  className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Meta Description tag</label>
                <textarea 
                  value={siteDescription} 
                  onChange={(e) => setSiteDescription(e.target.value)} 
                  rows={3}
                  className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none"
                />
              </div>
            </div>
          </Card>

        </div>

        {/* Right Column: Social profiles & Actions */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="bg-surface border border-primary/5 p-6 space-y-4 shadow-sm">
            <h3 className="font-bold text-text text-sm border-b border-primary/5 pb-2">Social Connections</h3>
            
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-muted tracking-wider">GitHub Profile URL</label>
                <input 
                  type="text" 
                  value={github} 
                  onChange={(e) => setGithub(e.target.value)} 
                  className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-muted tracking-wider">LinkedIn URL</label>
                <input 
                  type="text" 
                  value={linkedin} 
                  onChange={(e) => setLinkedin(e.target.value)} 
                  className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-muted tracking-wider">YouTube Channel URL</label>
                <input 
                  type="text" 
                  value={youtube} 
                  onChange={(e) => setYoutube(e.target.value)} 
                  className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none"
                />
              </div>
            </div>
          </Card>

          <Button variant="primary" type="submit" className="w-full">
            <Save className="mr-1.5 h-4 w-4" /> Save Settings
          </Button>
        </div>

      </form>
    </div>
  );
};

export default SettingsAdmin;
