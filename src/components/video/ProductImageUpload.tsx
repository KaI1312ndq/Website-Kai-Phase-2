"use client";

import { useRef, useState } from "react";

interface UploadedImage {
  url: string;
  path: string;
  name: string;
}

interface Props {
  images: UploadedImage[];
  onChange: (images: UploadedImage[]) => void;
  maxImages?: number;
}

export default function ProductImageUpload({ images, onChange, maxImages = 3 }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    if (images.length + files.length > maxImages) {
      setError(`Tối đa ${maxImages} ảnh.`);
      return;
    }

    setError(null);
    setUploading(true);

    const newImages: UploadedImage[] = [];
    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) {
        setError(`File "${file.name}" không phải ảnh.`);
        continue;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError(`File "${file.name}" lớn hơn 5MB.`);
        continue;
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/video/upload-product-image", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error ?? "Upload thất bại");
          continue;
        }
        newImages.push({ url: data.url, path: data.path, name: file.name });
      } catch (e) {
        setError(String(e));
      }
    }

    if (newImages.length > 0) {
      onChange([...images, ...newImages]);
    }
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  function removeImage(idx: number) {
    onChange(images.filter((_, i) => i !== idx));
  }

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
      />

      <div className="grid grid-cols-3 gap-2">
        {images.map((img, idx) => (
          <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border-2"
               style={{ borderColor: "rgba(255,255,255,0.10)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => removeImage(idx)}
              className="absolute top-1 right-1 w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-xs"
              style={{ background: "rgba(239,68,68,0.9)" }}
              title="Xoá ảnh"
            >
              ×
            </button>
          </div>
        ))}

        {images.length < maxImages && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="aspect-square rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-1 text-xs transition-colors disabled:opacity-50"
            style={{
              borderColor: "rgba(255,255,255,0.20)",
              color: "var(--ink-soft)",
              background: "rgba(255,255,255,0.03)",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            <span>{uploading ? "Đang upload..." : `Thêm ảnh (${images.length}/${maxImages})`}</span>
          </button>
        )}
      </div>

      {error && (
        <div className="text-xs px-3 py-2 rounded-lg" style={{ background: "rgba(239,68,68,0.10)", color: "#ef4444" }}>
          {error}
        </div>
      )}

      <p className="text-xs" style={{ color: "var(--ink-mute)" }}>
        Tối đa {maxImages} ảnh, mỗi ảnh dưới 5MB (JPEG/PNG/WebP).
        AI sẽ phân tích sản phẩm trong ảnh + dùng làm reference khi render video.
      </p>
    </div>
  );
}
