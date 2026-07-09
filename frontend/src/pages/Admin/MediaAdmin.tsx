import React, { useState } from 'react';
import { Image, Upload, Trash2, FileText } from 'lucide-react';
import { HelmetSEO } from '@/components/seo/HelmetSEO';
import { Card } from '@/components/ui/Card';

interface MediaAsset {
  id: string;
  name: string;
  type: 'image' | 'pdf' | 'zip' | 'document';
  size: string;
  uploadedAt: string;
}

const MediaAdmin: React.FC = () => {
  const [assets, setAssets] = useState<MediaAsset[]>([
    { id: '1', name: 'avatar.jpg', type: 'image', size: '132 KB', uploadedAt: '2026-07-09' },
    { id: '2', name: 'studymate_features.png', type: 'image', size: '240 KB', uploadedAt: '2026-07-08' },
    { id: '3', name: 'advanced_ts_notes.pdf', type: 'pdf', size: '1.2 MB', uploadedAt: '2026-07-01' },
    { id: '4', name: 'timetable_resolver_src.zip', type: 'zip', size: '4.8 MB', uploadedAt: '2026-06-25' }
  ]);

  // Upload simulation states
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      simulateUpload(file.name, file.size);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      simulateUpload(file.name, file.size);
    }
  };

  const simulateUpload = (name: string, sizeBytes: number) => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          
          // Append new file to assets registry
          const sizeKb = `${(sizeBytes / 1024).toFixed(0)} KB`;
          const newAsset: MediaAsset = {
            id: Date.now().toString(),
            name,
            type: name.endsWith('.pdf') ? 'pdf' : name.endsWith('.zip') ? 'zip' : 'image',
            size: sizeKb,
            uploadedAt: new Date().toISOString().split('T')[0]
          };
          setAssets(prevList => [newAsset, ...prevList]);
          
          setTimeout(() => setUploadProgress(null), 1000);
          return 100;
        }
        return prev + 20;
      });
    }, 150);
  };

  const handleDelete = (idToDelete: string) => {
    if (window.confirm('Delete this file from assets registry?')) {
      setAssets(prev => prev.filter(a => a.id !== idToDelete));
    }
  };

  return (
    <div className="space-y-8">
      <HelmetSEO title="Media Library | Creator CMS" />

      {/* Header */}
      <div className="flex justify-between items-center border-b border-primary/10 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-text flex items-center gap-2">
            <Image className="h-6 w-6 text-accent animate-pulse" /> Media Assets Library
          </h2>
          <p className="text-xs text-muted mt-0.5">Upload image covers, PDFs cheat sheets, and source code ZIP files.</p>
        </div>
      </div>

      {/* Grid: Upload panel left, Assets lists right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Drag & Drop upload simulator */}
        <div className="lg:col-span-4 space-y-4">
          <Card className="bg-surface border border-primary/5 p-6 space-y-4 shadow-sm">
            <h3 className="font-bold text-text text-sm">Upload File Simulator</h3>
            
            <div 
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-8 text-center flex flex-col justify-center items-center gap-3 transition-colors ${
                dragActive ? 'border-accent bg-accent/5' : 'border-primary/10 hover:border-accent/30'
              }`}
            >
              <Upload className="h-8 w-8 text-muted" />
              <div className="space-y-1">
                <p className="text-xs font-mono font-bold text-text">Drag & drop files here</p>
                <p className="text-[10px] text-muted">Supports images, PDFs, ZIPs up to 50MB</p>
              </div>

              <input 
                type="file" 
                id="file-upload" 
                onChange={handleFileInput}
                className="hidden" 
              />
              <label htmlFor="file-upload" className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-surface border border-primary/10 hover:border-primary/20 text-xs font-mono uppercase tracking-wider cursor-pointer text-muted hover:text-text transition-colors shadow-sm">
                Choose File
              </label>
            </div>

            {/* Upload progress indicator */}
            {uploadProgress !== null && (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-mono text-muted">
                  <span>Uploading file...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-primary/5 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-accent h-1.5 transition-all duration-150" 
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Right: Assets list grid */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex justify-between items-center text-xs font-mono text-muted">
            <span>Files listed in directory</span>
            <span>Total assets: {assets.length}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {assets.map((asset) => (
              <Card key={asset.id} className="bg-surface border border-primary/5 p-4 flex gap-4 items-center justify-between hover:shadow-sm transition-all duration-300">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 bg-accent/5 rounded-lg text-accent shrink-0">
                    {asset.type === 'image' ? <Image className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-text text-sm truncate">{asset.name}</h4>
                    <div className="flex items-center gap-2 mt-0.5 text-[10px] font-mono text-muted">
                      <span>{asset.size}</span>
                      <span>•</span>
                      <span>{asset.uploadedAt}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => handleDelete(asset.id)}
                    className="p-1.5 text-rose-500 hover:bg-rose-500/10 border border-primary/5 rounded transition-colors"
                    aria-label="Delete asset"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default MediaAdmin;
