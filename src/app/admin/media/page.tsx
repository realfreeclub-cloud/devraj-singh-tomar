"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import {
  Image as ImageIcon,
  UploadCloud,
  Copy,
  Check,
  Trash2,
  ExternalLink,
  Search,
  AlertCircle,
  FileText
} from "lucide-react";
import { CmsMediaItem } from "@/lib/cms/types";

export default function AdminMediaPage() {
  const [media, setMedia] = useState<CmsMediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Upload State
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [altText, setAltText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchMedia = () => {
    setLoading(true);
    fetch("/api/admin/media")
      .then((res) => res.json())
      .then((data) => {
        setMedia(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch media", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const filteredMedia = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return media;
    return media.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        (m.altText && m.altText.toLowerCase().includes(q))
    );
  }, [media, search]);

  const handleCopyUrl = (item: CmsMediaItem) => {
    navigator.clipboard.writeText(item.url);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/media/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchMedia();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to delete file");
      }
    } catch {
      alert("Failed to delete file");
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file) return;
    setUploading(true);
    setUploadError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("altText", altText);

    try {
      const res = await fetch("/api/admin/media/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to upload file");
      }

      setAltText("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      fetchMedia();
    } catch (err: unknown) {
      setUploadError(err instanceof Error ? err.message : "Upload error occurred");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (!bytes) return "0 KB";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header */}
      <div className="border-b border-layer-border pb-6">
        <h1 className="text-3xl font-extrabold text-title flex items-center gap-3">
          <ImageIcon className="text-primary" size={28} />
          Media Library & File Assets
        </h1>
        <p className="text-foreground text-sm opacity-75 mt-1">
          Upload and manage photos, infographics, logos, and case study visuals stored securely in <code className="text-primary font-mono text-xs">/public/uploads/</code>.
        </p>
      </div>

      {/* Uploader Box */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="bg-layer border-2 border-dashed border-layer-border hover:border-primary/50 transition rounded-3xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden"
      >
        <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
          <UploadCloud size={28} />
        </div>

        <h3 className="text-lg font-bold text-title mb-1">
          Drag and drop media here, or browse files
        </h3>
        <p className="text-foreground text-xs opacity-60 mb-6 max-w-md">
          Supports JPEG, PNG, WebP, SVG, and GIF up to 10MB. Files are sanitized and stored locally for ultra-fast CDN delivery.
        </p>

        {uploadError && (
          <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle size={15} />
            {uploadError}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
          <input
            type="text"
            placeholder="Image Alt Text (e.g. NGIT LMS Architecture)"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            className="w-full bg-background border border-layer-border rounded-xl px-4 py-2.5 text-xs text-title focus:outline-none focus:border-primary"
          />

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileUpload(e.target.files[0]);
              }
            }}
          />

          <button
            type="button"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className="w-full sm:w-auto shrink-0 px-6 py-2.5 rounded-xl bg-primary text-white font-semibold text-xs hover:bg-primary/90 transition shadow-lg shadow-primary/20 disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Select File"}
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground opacity-40" size={16} />
          <input
            type="text"
            placeholder="Search media files by name or alt..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-layer border border-layer-border rounded-xl pl-9 pr-4 py-2 text-xs text-title focus:outline-none focus:border-primary transition"
          />
        </div>

        <span className="text-xs font-mono text-foreground opacity-60">
          Total: {filteredMedia.length} asset{filteredMedia.length === 1 ? "" : "s"}
        </span>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="p-12 text-center text-foreground opacity-60">Loading media library...</div>
      ) : filteredMedia.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-layer-border rounded-2xl bg-layer/40">
          <ImageIcon className="mx-auto text-foreground opacity-30 mb-3" size={36} />
          <p className="text-title font-semibold">No media assets found</p>
          <p className="text-foreground text-sm opacity-60 mt-1">Upload images above to build your media repository.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className="bg-layer border border-layer-border rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-primary/50 transition relative"
            >
              <div className="relative aspect-square w-full bg-background flex items-center justify-center overflow-hidden border-b border-layer-border">
                {item.type.startsWith("image/") ? (
                  <Image
                    src={item.url}
                    alt={item.altText || item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                    unoptimized
                  />
                ) : (
                  <FileText size={36} className="text-foreground opacity-30" />
                )}

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition"
                    title="View Full Size"
                  >
                    <ExternalLink size={16} />
                  </a>

                  <button
                    onClick={() => handleCopyUrl(item)}
                    className="p-2 rounded-xl bg-primary text-white hover:bg-primary/90 transition"
                    title="Copy Public URL"
                  >
                    {copiedId === item.id ? <Check size={16} /> : <Copy size={16} />}
                  </button>

                  <button
                    onClick={() => handleDelete(item.id, item.name)}
                    className="p-2 rounded-xl bg-rose-500 text-white hover:bg-rose-600 transition"
                    title="Delete File"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="p-3">
                <p className="text-xs font-semibold text-title truncate" title={item.name}>
                  {item.name}
                </p>
                <div className="flex items-center justify-between text-[10px] font-mono text-foreground opacity-50 mt-1">
                  <span>{formatFileSize(item.size)}</span>
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
