import React, { useState, useEffect } from 'react';
import { Compass, Plus, Trash2, Edit, X, Save } from 'lucide-react';
import { HelmetSEO } from '@/components/seo/HelmetSEO';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { deepCodeService } from '@/services/DeepCodeService';
import type { DeepCodeChapter } from '@/data/deepCode';

const DeepCodeAdmin: React.FC = () => {
  const [chapters, setChapters] = useState<DeepCodeChapter[]>([]);
  const [mission, setMission] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingChapter, setEditingChapter] = useState<DeepCodeChapter | null>(null);

  // Form States
  const [name, setName] = useState('');
  const [university, setUniversity] = useState('');
  const [lead, setLead] = useState('');
  const [memberCount, setMemberCount] = useState(0);
  const [status, setStatus] = useState<'Active' | 'Beta' | 'Coming Soon'>('Active');
  
  const [saveSuccess, setSaveSuccess] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const chaps = await deepCodeService.getChapters();
      setChapters(chaps);
      const text = await deepCodeService.getMission();
      setMission(text);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleMissionSave = async () => {
    try {
      await deepCodeService.saveMission(mission);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const openAddModal = () => {
    setEditingChapter(null);
    setName('');
    setUniversity('');
    setLead('');
    setMemberCount(0);
    setStatus('Active');
    setIsModalOpen(true);
  };

  const openEditModal = (chap: DeepCodeChapter) => {
    setEditingChapter(chap);
    setName(chap.name);
    setUniversity(chap.university);
    setLead(chap.lead);
    setMemberCount(chap.memberCount);
    setStatus(chap.status);
    setIsModalOpen(true);
  };

  const handleSaveChapter = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingChapter) {
        await deepCodeService.updateChapter(editingChapter.id || '', {
          name,
          university,
          lead,
          memberCount,
          status
        });
      } else {
        const newChap: DeepCodeChapter = {
          name,
          university,
          lead,
          memberCount,
          status
        };
        await deepCodeService.createChapter(newChap);
      }
      setIsModalOpen(false);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteChapter = async (chap: DeepCodeChapter) => {
    if (window.confirm(`Are you sure you want to remove ${chap.name}?`)) {
      try {
        await deepCodeService.deleteChapter(chap.id || '', chap.university);
        loadData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) {
    return <div className="text-center py-12 font-mono text-xs text-muted">Loading chapter configs...</div>;
  }

  return (
    <div className="space-y-8">
      <HelmetSEO title="Deep Code Management | Creator CMS" />

      {/* Header */}
      <div className="flex justify-between items-center border-b border-primary/10 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-text flex items-center gap-2">
            <Compass className="h-6 w-6 text-accent animate-pulse" /> Deep Code mini-platform CMS
          </h2>
          <p className="text-xs text-muted mt-0.5">Edit mission values statements, registry details, and chapters leads listings.</p>
        </div>
      </div>

      {saveSuccess && (
        <div className="text-xs font-mono text-success bg-success/10 border border-success/20 p-3 rounded-lg">
          Mission statement changes saved successfully!
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Mission Config */}
        <div className="lg:col-span-4 space-y-4">
          <Card className="bg-surface border border-primary/5 p-6 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-text border-b border-primary/5 pb-2">Mission Statement</h3>
            
            <div className="space-y-3">
              <textarea 
                value={mission} 
                onChange={(e) => setMission(e.target.value)} 
                rows={6}
                className="w-full text-xs rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-accent leading-relaxed text-muted"
                placeholder="Declare community goals..."
              />
              <Button variant="primary" size="sm" className="w-full text-xs" onClick={handleMissionSave}>
                <Save className="mr-1.5 h-3.5 w-3.5" /> Save Mission
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Column: Chapters List Table */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex justify-between items-center text-xs font-mono text-muted">
            <span>Chapters Registry</span>
            <Button variant="outline" size="sm" onClick={openAddModal}>
              <Plus className="mr-1 h-3.5 w-3.5" /> Add Chapter
            </Button>
          </div>

          <Card className="bg-surface border border-primary/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-primary/5 bg-primary/5 text-[10px] font-mono text-muted uppercase tracking-wider">
                    <th className="p-4">Chapter</th>
                    <th className="p-4">University</th>
                    <th className="p-4">Lead</th>
                    <th className="p-4">Members</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/5 text-xs sm:text-sm">
                  {chapters.map((chap, idx) => (
                    <tr key={idx} className="hover:bg-primary/5 transition-colors">
                      <td className="p-4 font-bold text-text">{chap.name}</td>
                      <td className="p-4 font-mono text-xs text-muted">{chap.university}</td>
                      <td className="p-4 text-muted">{chap.lead}</td>
                      <td className="p-4 font-mono text-xs text-muted">{chap.memberCount}</td>
                      <td className="p-4">
                        <Badge variant="status" className={chap.status === 'Active' ? 'bg-success/15 text-success' : 'bg-accent/5 text-accent border-accent/10'}>
                          {chap.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => openEditModal(chap)}
                            className="p-1.5 text-muted hover:text-accent border border-primary/5 rounded hover:bg-surface transition-colors"
                            aria-label="Edit chapter"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                          <button 
                            onClick={() => handleDeleteChapter(chap)}
                            className="p-1.5 text-rose-500 hover:bg-rose-500/10 border border-primary/5 rounded transition-colors"
                            aria-label="Delete chapter"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="bg-surface border border-primary/10 max-w-md w-full p-6 space-y-4 shadow-xl relative text-xs sm:text-sm">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 p-1.5 text-muted hover:text-text rounded-lg border border-primary/5"
            >
              <X className="h-4 w-4" />
            </button>

            <h3 className="text-lg font-bold text-text flex items-center gap-2 border-b border-primary/5 pb-2">
              {editingChapter ? 'Edit Chapter Configs' : 'Add University Chapter'}
            </h3>

            <form onSubmit={handleSaveChapter} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Chapter Name *</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required
                  placeholder="e.g. Science & Tech Chapter"
                  className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-muted tracking-wider">University *</label>
                <input 
                  type="text" 
                  value={university} 
                  onChange={(e) => setUniversity(e.target.value)} 
                  required
                  disabled={!!editingChapter}
                  placeholder="e.g. ETH Zurich"
                  className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none disabled:opacity-50"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Chapter Lead *</label>
                <input 
                  type="text" 
                  value={lead} 
                  onChange={(e) => setLead(e.target.value)} 
                  required
                  placeholder="e.g. Ali"
                  className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Members count</label>
                  <input 
                    type="number" 
                    value={memberCount} 
                    onChange={(e) => setMemberCount(Number(e.target.value))} 
                    className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 text-muted focus:outline-none"
                  >
                    <option value="Active">Active</option>
                    <option value="Beta">Beta</option>
                    <option value="Coming Soon">Coming Soon</option>
                  </select>
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

export default DeepCodeAdmin;
