import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, Trash2, Edit, X } from 'lucide-react';
import { HelmetSEO } from '@/components/seo/HelmetSEO';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { NotesService } from '@/services/NotesService';
import type { NoteData } from '@/data/notes';

const NotesAdmin: React.FC = () => {
  const [notesList, setNotesList] = useState<NoteData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<NoteData | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [fileType, setFileType] = useState('PDF');
  const [readingTime, setReadingTime] = useState('');
  const [youtubeTitle, setYoutubeTitle] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');

  const notesService = new NotesService();

  const loadNotes = async () => {
    try {
      const res = await notesService.getNotes();
      setNotesList(res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const openAddModal = () => {
    setEditingNote(null);
    setTitle('');
    setSlug('');
    setCategory('');
    setDescription('');
    setDifficulty('Beginner');
    setFileType('PDF');
    setReadingTime('15 min');
    setYoutubeTitle('');
    setYoutubeUrl('');
    setIsModalOpen(true);
  };

  const openEditModal = (note: NoteData) => {
    setEditingNote(note);
    setTitle(note.title);
    setSlug(note.slug);
    setCategory(note.category);
    setDescription(note.description);
    setDifficulty(note.difficulty);
    setFileType(note.fileType);
    setReadingTime(note.readingTime);
    setYoutubeTitle(note.youtubeTitle || '');
    setYoutubeUrl(note.youtubeUrl || '');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingNote) {
        await notesService.updateNote(editingNote.slug, {
          title,
          category,
          description,
          difficulty,
          fileType,
          readingTime,
          youtubeTitle,
          youtubeUrl
        });
      } else {
        const newNote: NoteData = {
          slug: slug || title.toLowerCase().replace(/\s+/g, '-'),
          title,
          category,
          description,
          difficulty,
          fileType,
          readingTime,
          downloadsCount: 0,
          lastUpdated: new Date().toISOString().split('T')[0],
          youtubeTitle,
          youtubeUrl,
          tags: []
        };
        await notesService.createNote(newNote);
      }
      setIsModalOpen(false);
      loadNotes();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (slugToDelete: string) => {
    if (window.confirm('Are you sure you want to delete this resource record?')) {
      try {
        await notesService.deleteNote(slugToDelete);
        loadNotes();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="space-y-8">
      <HelmetSEO title="Manage Notes | Creator CMS" />

      {/* Header */}
      <div className="flex justify-between items-center border-b border-primary/10 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-text flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-accent animate-pulse" /> Notes & Guides
          </h2>
          <p className="text-xs text-muted mt-0.5">Manage learning cheat sheets and associated YouTube tutorial resources.</p>
        </div>
        <Button variant="primary" size="sm" onClick={openAddModal}>
          <Plus className="mr-1.5 h-4 w-4" /> Add Note
        </Button>
      </div>

      {/* Table list */}
      <Card className="bg-surface border border-primary/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-primary/5 bg-primary/5 text-[10px] font-mono text-muted uppercase tracking-wider">
                <th className="p-4">Resource</th>
                <th className="p-4">Category</th>
                <th className="p-4">Difficulty</th>
                <th className="p-4">Type</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5 text-xs sm:text-sm">
              {notesList.map((note) => (
                <tr key={note.slug} className="hover:bg-primary/5 transition-colors">
                  <td className="p-4">
                    <div>
                      <h4 className="font-bold text-text">{note.title}</h4>
                      <span className="text-[10px] font-mono text-muted">/notes/{note.slug}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant="tech" className="text-[10px]">
                      {note.category}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <span className="text-xs font-mono">{note.difficulty}</span>
                  </td>
                  <td className="p-4 font-mono text-xs text-muted">{note.fileType}</td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => openEditModal(note)}
                        className="p-1.5 text-muted hover:text-accent border border-primary/5 rounded hover:bg-surface transition-colors"
                        aria-label="Edit note"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(note.slug)}
                        className="p-1.5 text-rose-500 hover:bg-rose-500/10 border border-primary/5 rounded transition-colors"
                        aria-label="Delete note"
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
              {editingNote ? 'Edit Notes Settings' : 'Add New Learning Resource'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Resource Title *</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  required
                  placeholder="e.g. Advanced TypeScript Notes"
                  className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none"
                />
              </div>

              {!editingNote && (
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Slug (Unique identifier) *</label>
                  <input 
                    type="text" 
                    value={slug} 
                    onChange={(e) => setSlug(e.target.value)} 
                    required
                    placeholder="e.g. advanced-ts-notes"
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
                  placeholder="e.g. Programming"
                  className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Description</label>
                <textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  rows={3}
                  placeholder="Summarized outline information..."
                  className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Difficulty</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as any)}
                    className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 text-muted focus:outline-none"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-muted tracking-wider">File Type</label>
                  <input 
                    type="text" 
                    value={fileType} 
                    onChange={(e) => setFileType(e.target.value)} 
                    placeholder="PDF, ZIP"
                    className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Reading Duration</label>
                  <input 
                    type="text" 
                    value={readingTime} 
                    onChange={(e) => setReadingTime(e.target.value)} 
                    placeholder="e.g. 15 min"
                    className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-muted tracking-wider">YouTube Video Title</label>
                  <input 
                    type="text" 
                    value={youtubeTitle} 
                    onChange={(e) => setYoutubeTitle(e.target.value)} 
                    placeholder="Video title"
                    className="w-full rounded-lg bg-background border border-primary/10 px-3 py-2 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-muted tracking-wider">Video URL</label>
                  <input 
                    type="text" 
                    value={youtubeUrl} 
                    onChange={(e) => setYoutubeUrl(e.target.value)} 
                    placeholder="https://youtube.com/..."
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

export default NotesAdmin;
