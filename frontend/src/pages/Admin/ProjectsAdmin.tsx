import React, { useState, useEffect } from 'react';
import { Layers, Plus, Trash2, Edit, X } from 'lucide-react';
import { HelmetSEO } from '@/components/seo/HelmetSEO';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProjectsService } from '@/services/ProjectsService';
import type { ProjectData } from '@/data/projects';

const ProjectsAdmin: React.FC = () => {
  const [projectsList, setProjectsList] = useState<ProjectData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectData | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('');
  const [tagline, setTagline] = useState('');
  const [overview, setOverview] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');

  const projectsService = new ProjectsService();

  const loadProjects = async () => {
    try {
      const res = await projectsService.getProjects();
      setProjectsList(res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const openAddModal = () => {
    setEditingProject(null);
    setTitle('');
    setSlug('');
    setCategory('');
    setTagline('');
    setOverview('');
    setGithubUrl('');
    setDemoUrl('');
    setIsModalOpen(true);
  };

  const openEditModal = (proj: ProjectData) => {
    setEditingProject(proj);
    setTitle(proj.title);
    setSlug(proj.slug);
    setCategory(proj.category);
    setTagline(proj.tagline);
    setOverview(proj.overview);
    setGithubUrl(proj.githubUrl || '');
    setDemoUrl(proj.demoUrl || '');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProject) {
        // Edit record
        await projectsService.updateProject(editingProject.slug, {
          title,
          category,
          tagline,
          overview,
          githubUrl,
          demoUrl
        });
      } else {
        // Add new record
        const newProj: ProjectData = {
          slug: slug || title.toLowerCase().replace(/\s+/g, '-'),
          title,
          category,
          tagline,
          overview,
          problem: 'Mock problem statement detail configured in CMS dashboard.',
          solution: 'Mock solution statement detail configured in CMS dashboard.',
          features: ['Feature 1 detail parsed from config.'],
          techStack: [{ category: 'Core', items: ['TypeScript', 'Vite'] }],
          journey: 'Mock journey outline.',
          challenges: 'Mock challenges list.',
          lessons: 'Mock lessons list.',
          githubUrl,
          demoUrl,
          metrics: [{ label: 'Downloads', value: '0' }],
          relatedSlugs: []
        };
        await projectsService.createProject(newProj);
      }
      setIsModalOpen(false);
      loadProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (slugToDelete: string) => {
    if (window.confirm('Are you sure you want to delete this project record?')) {
      try {
        await projectsService.deleteProject(slugToDelete);
        loadProjects();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="space-y-8">
      <HelmetSEO title="Manage Projects | Creator CMS" />

      {/* Header */}
      <div className="flex justify-between items-center border-b border-primary/10 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-text flex items-center gap-2">
            <Layers className="h-6 w-6 text-accent animate-pulse" /> Projects Registry
          </h2>
          <p className="text-xs text-muted mt-0.5">Manage case studies and metadata displayed in public catalog pages.</p>
        </div>
        <Button variant="primary" size="sm" onClick={openAddModal}>
          <Plus className="mr-1.5 h-4 w-4" /> Add Project
        </Button>
      </div>

      {/* Projects Table List */}
      <Card className="bg-surface border border-primary/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-primary/5 bg-primary/5 text-[10px] font-mono text-muted uppercase tracking-wider">
                <th className="p-4">Project</th>
                <th className="p-4">Category</th>
                <th className="p-4">URLs</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5 text-xs sm:text-sm">
              {projectsList.map((proj) => (
                <tr key={proj.slug} className="hover:bg-primary/5 transition-colors">
                  <td className="p-4">
                    <div>
                      <h4 className="font-bold text-text">{proj.title}</h4>
                      <span className="text-[10px] text-muted font-mono">/projects/{proj.slug}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant="tech" className="text-[10px]">
                      {proj.category}
                    </Badge>
                  </td>
                  <td className="p-4 font-mono text-xs text-muted">
                    <div className="flex flex-col gap-1">
                      {proj.githubUrl && <span className="truncate max-w-[200px]">Git: {proj.githubUrl}</span>}
                      {proj.demoUrl && <span className="truncate max-w-[200px]">Demo: {proj.demoUrl}</span>}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => openEditModal(proj)}
                        className="p-1.5 text-muted hover:text-accent border border-primary/5 rounded hover:bg-surface transition-colors"
                        aria-label="Edit project"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(proj.slug)}
                        className="p-1.5 text-rose-500 hover:bg-rose-500/10 border border-primary/5 rounded transition-colors"
                        aria-label="Delete project"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="bg-surface border border-primary/10 max-w-lg w-full p-6 space-y-4 shadow-xl relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 p-1.5 text-muted hover:text-text rounded-lg border border-primary/5"
            >
              <X className="h-4 w-4" />
            </button>

            <h3 className="text-lg font-bold text-text flex items-center gap-2 border-b border-primary/5 pb-2">
              {editingProject ? 'Edit Project Configs' : 'Add New Project'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Project Title *</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  required
                  placeholder="e.g. Study Mate AI"
                  className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>

              {!editingProject && (
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Slug (Unique identifier) *</label>
                  <input 
                    type="text" 
                    value={slug} 
                    onChange={(e) => setSlug(e.target.value)} 
                    required
                    placeholder="e.g. study-mate-ai"
                    className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none"
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Category *</label>
                <input 
                  type="text" 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)} 
                  required
                  placeholder="e.g. AI Utilities"
                  className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Tagline *</label>
                <input 
                  type="text" 
                  value={tagline} 
                  onChange={(e) => setTagline(e.target.value)} 
                  required
                  placeholder="Short marketing hook statement..."
                  className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Overview / Description *</label>
                <textarea 
                  value={overview} 
                  onChange={(e) => setOverview(e.target.value)} 
                  required
                  rows={4}
                  placeholder="Detailed project summary information..."
                  className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-muted tracking-wider">GitHub Code Repository Link</label>
                  <input 
                    type="text" 
                    value={githubUrl} 
                    onChange={(e) => setGithubUrl(e.target.value)} 
                    placeholder="https://github.com/..."
                    className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Live Demo Deployment Link</label>
                  <input 
                    type="text" 
                    value={demoUrl} 
                    onChange={(e) => setDemoUrl(e.target.value)} 
                    placeholder="https://demo.com"
                    className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ProjectsAdmin;
