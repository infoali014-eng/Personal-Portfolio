import React, { useState } from 'react';
import { Settings, Save, CheckCircle } from 'lucide-react';
import { HelmetSEO } from '@/components/seo/HelmetSEO';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const SettingsAdmin: React.FC = () => {
  // Global SEO Settings
  const [siteTitle, setSiteTitle] = useState('Ali | CS Student & AI Builder');
  const [siteDescription, setSiteDescription] = useState('Portfolio OS - Founder of Deep Code, building tools for educational systems.');
  
  // Socials
  const [github, setGithub] = useState('https://github.com');
  const [linkedin, setLinkedin] = useState('https://linkedin.com');
  const [youtube, setYoutube] = useState('https://youtube.com');

  // Brand details
  const [logoText, setLogoText] = useState('ALI.OS');
  
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="space-y-8">
      <HelmetSEO title="Platform Settings | Creator CMS" />

      {/* Header */}
      <div className="flex justify-between items-center border-b border-primary/10 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-text flex items-center gap-2">
            <Settings className="h-6 w-6 text-accent animate-pulse" /> Platform Settings
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

          {/* Global SEODefaults */}
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
