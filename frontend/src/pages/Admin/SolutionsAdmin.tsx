import React, { useState } from 'react';
import { Server, Plus, Trash2, Edit, X } from 'lucide-react';
import { HelmetSEO } from '@/components/seo/HelmetSEO';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SOLUTIONS_REGISTRY } from '@/data/solutions';
import type { SolutionData } from '@/data/solutions';

const SolutionsAdmin: React.FC = () => {
  const [solutionsList, setSolutionsList] = useState<SolutionData[]>(Object.values(SOLUTIONS_REGISTRY));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSolution, setEditingSolution] = useState<SolutionData | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [tagline, setTagline] = useState('');
  const [overview, setOverview] = useState('');
  const [version, setVersion] = useState('');
  const [audience, setAudience] = useState('');

  const openAddModal = () => {
    setEditingSolution(null);
    setName('');
    setCategory('');
    setTagline('');
    setOverview('');
    setVersion('1.0.0');
    setAudience('Student');
    setIsModalOpen(true);
  };

  const openEditModal = (sol: SolutionData) => {
    setEditingSolution(sol);
    setName(sol.name);
    setCategory(sol.category);
    setTagline(sol.tagline);
    setOverview(sol.overview);
    setVersion(sol.version);
    setAudience(sol.audience);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSolution) {
      setSolutionsList(prev => prev.map(s => s.slug === editingSolution.slug ? {
        ...s,
        name,
        category,
        tagline,
        overview,
        version,
        audience
      } : s));
    } else {
      const newSol: SolutionData = {
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        name,
        category,
        tagline,
        overview,
        audience,
        version,
        features: ['Mock feature capability listed in CMS.'],
        benefits: ['Mock benefit statement listed in CMS.'],
        roadmap: [{ phase: 'Phase 1', title: 'Scaffolding', desc: 'Mock roadmap item desc.' }],
        faqs: [],
        downloadsCount: 0
      };
      setSolutionsList(prev => [...prev, newSol]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (slugToDelete: string) => {
    if (window.confirm('Are you sure you want to delete this solution?')) {
      setSolutionsList(prev => prev.filter(s => s.slug !== slugToDelete));
    }
  };

  return (
    <div className="space-y-8">
      <HelmetSEO title="Manage Solutions | Creator CMS" />

      {/* Header */}
      <div className="flex justify-between items-center border-b border-primary/10 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-text flex items-center gap-2">
            <Server className="h-6 w-6 text-accent animate-pulse" /> Solutions Registry
          </h2>
          <p className="text-xs text-muted mt-0.5">Manage deployed products and constraint parameters displays.</p>
        </div>
        <Button variant="primary" size="sm" onClick={openAddModal}>
          <Plus className="mr-1.5 h-4 w-4" /> Add Solution
        </Button>
      </div>

      {/* Table grid */}
      <Card className="bg-surface border border-primary/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-primary/5 bg-primary/5 text-[10px] font-mono text-muted uppercase tracking-wider">
                <th className="p-4">Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Audience</th>
                <th className="p-4">Version</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5 text-xs sm:text-sm">
              {solutionsList.map((sol) => (
                <tr key={sol.slug} className="hover:bg-primary/5 transition-colors">
                  <td className="p-4">
                    <div>
                      <h4 className="font-bold text-text">{sol.name}</h4>
                      <span className="text-[10px] font-mono text-muted">/solutions/{sol.slug}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant="tech" className="text-[10px]">
                      {sol.category}
                    </Badge>
                  </td>
                  <td className="p-4 font-mono text-xs text-muted">{sol.audience}</td>
                  <td className="p-4 font-mono text-xs text-muted">v{sol.version}</td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => openEditModal(sol)}
                        className="p-1.5 text-muted hover:text-accent border border-primary/5 rounded hover:bg-surface transition-colors"
                        aria-label="Edit solution"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(sol.slug)}
                        className="p-1.5 text-rose-500 hover:bg-rose-500/10 border border-primary/5 rounded transition-colors"
                        aria-label="Delete solution"
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
              {editingSolution ? 'Edit Solution Settings' : 'Add New Solution'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Solution Name *</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required
                  placeholder="e.g. Study Mate AI"
                  className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Category *</label>
                <input 
                  type="text" 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)} 
                  required
                  placeholder="e.g. Educational Productivity"
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
                  placeholder="Short marketing outline details"
                  className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Overview Description</label>
                <textarea 
                  value={overview} 
                  onChange={(e) => setOverview(e.target.value)} 
                  rows={3}
                  placeholder="Background details..."
                  className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Version *</label>
                  <input 
                    type="text" 
                    value={version} 
                    onChange={(e) => setVersion(e.target.value)} 
                    required
                    placeholder="e.g. 1.0.0"
                    className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Target Audience</label>
                  <input 
                    type="text" 
                    value={audience} 
                    onChange={(e) => setAudience(e.target.value)} 
                    placeholder="e.g. Student, Teacher, Developer"
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

export default SolutionsAdmin;
