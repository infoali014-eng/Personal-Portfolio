import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Upload, Trash2, FileText, FileArchive, Loader2 } from 'lucide-react';
import { HelmetSEO } from '@/components/seo/HelmetSEO';
import { Card } from '@/components/ui/Card';
import { mediaService } from '@/services/MediaService';
import type { MediaAsset } from '@/repositories/supabase/SupabaseMediaRepository';

const MediaAdmin: React.FC = () => {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const loadAssets = async () => {
    setLoading(true);
    try {
      const res = await mediaService.getAssets();
      setAssets(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAssets();
  }, []);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await handleUpload(e.target.files[0]);
    }
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    setErrorMsg(null);
    try {
      await mediaService.uploadAsset(file);
      await loadAssets();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'File upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (asset: MediaAsset) => {
    if (window.confirm(`Delete ${asset.name} from assets repository?`)) {
      try {
        await mediaService.deleteAsset(asset.id, asset.url);
        await loadAssets();
      } catch (err: any) {
        console.error(err);
        alert(err.message || 'Deletion failed');
      }
    }
  };

  if (loading) {
    return <div className="text-center py-12 font-mono text-xs text-muted">Loading media registry...</div>;
  }

  return (
    <div className="space-y-8">
      <HelmetSEO title="Media Library | Creator CMS" />

      {/* Header */}
      <div className="flex justify-between items-center border-b border-primary/10 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-text flex items-center gap-2">
            <ImageIcon className="h-6 w-6 text-accent animate-pulse" /> Media Assets Library
          </h2>
          <p className="text-xs text-muted mt-0.5">Upload image covers, PDFs cheat sheets, and source code ZIP files.</p>
        </div>
      </div>

      {errorMsg && (
        <div className="text-xs font-mono text-rose-500 bg-rose-500/10 border border-rose-500/20 p-3 rounded-lg">
          {errorMsg}
        </div>
      )}

      {/* Grid: Upload panel left, Assets lists right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Upload Dropzone */}
        <div className="lg:col-span-4 space-y-4">
          <Card 
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed p-8 rounded-3xl text-center cursor-pointer transition-all ${
              dragActive ? 'border-accent bg-accent/5' : 'border-primary/10 bg-surface/50 hover:border-primary/30'
            } relative`}
          >
            <input 
              type="file" 
              id="file-upload" 
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={uploading}
            />
            
            <div className="space-y-4 flex flex-col items-center justify-center min-h-[200px]">
              {uploading ? (
                <>
                  <Loader2 className="h-10 w-10 text-accent animate-spin" />
                  <p className="text-xs font-mono text-muted">Uploading file to storage bucket...</p>
                </>
              ) : (
                <>
                  <div className="p-3.5 bg-primary/5 rounded-full text-muted border border-primary/10">
                    <Upload className="h-6 w-6 text-accent" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-text">Drag & Drop file here</p>
                    <p className="text-xs text-muted">or click to browse local folders</p>
                  </div>
                  <span className="text-[9px] font-mono text-muted uppercase tracking-wider">Supports covers images, pdf, zip</span>
                </>
              )}
            </div>
          </Card>
        </div>

        {/* Right Column: Assets Grid */}
        <div className="lg:col-span-8 space-y-4">
          <h3 className="text-xs font-mono uppercase text-muted tracking-wider">Cataloged Assets ({assets.length})</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {assets.map((asset) => (
              <Card key={asset.id} className="bg-surface border border-primary/5 p-4 flex gap-4 items-start relative group shadow-sm hover:shadow-md transition-all">
                <div className="p-3 bg-primary/5 rounded-xl border border-primary/10 shrink-0">
                  {asset.type === 'image' ? (
                    <ImageIcon className="h-5 w-5 text-accent" />
                  ) : asset.type === 'pdf' ? (
                    <FileText className="h-5 w-5 text-accent" />
                  ) : (
                    <FileArchive className="h-5 w-5 text-accent" />
                  )}
                </div>

                <div className="space-y-1 min-w-0 pr-8">
                  <h4 className="font-bold text-text text-sm truncate" title={asset.name}>{asset.name}</h4>
                  <div className="flex gap-2 text-[10px] font-mono text-muted">
                    <span>{asset.size}</span>
                    <span>•</span>
                    <span>{asset.uploadedAt ? asset.uploadedAt.split('T')[0] : 'N/A'}</span>
                  </div>
                  <a 
                    href={asset.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[10px] font-mono text-accent hover:text-highlight block truncate hover:underline"
                  >
                    View Asset &rarr;
                  </a>
                </div>

                <button 
                  onClick={() => handleDelete(asset)}
                  className="absolute right-4 top-4 p-1 text-muted hover:text-rose-500 border border-transparent hover:border-primary/5 hover:bg-background rounded transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Delete asset"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </Card>
            ))}

            {assets.length === 0 && (
              <div className="col-span-2 text-center py-12 text-xs text-muted font-mono bg-surface border border-primary/5 rounded-3xl">
                No assets uploaded to the repository yet.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default MediaAdmin;
