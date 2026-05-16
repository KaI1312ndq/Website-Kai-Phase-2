"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import JSZip from "jszip";

/* ─── Types ────────────────────────────────────────────────────────── */
type BgMode = "transparent" | "white" | "color";
type CropMode = "original" | "1:1" | "3:4" | "4:5";
type ImgItem = {
  id: string;
  file: File;
  originalUrl: string;
  resultUrl?: string;
  resultBlob?: Blob;
  status: "idle" | "processing" | "done" | "error";
  error?: string;
};

/* ─── Constants ────────────────────────────────────────────────────── */
const MAX_FILE_SIZE = 12 * 1024 * 1024; // 12MB
const MAX_BATCH = 10;
const FREE_DAILY_LIMIT = 5;
const FREE_BATCH_PER_RUN = 1;
const STORAGE_KEY = "tach_nen_usage";

/* ─── Daily usage tracking (localStorage) ──────────────────────────── */
function getTodayUsage(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return 0;
    const data = JSON.parse(raw);
    const today = new Date().toISOString().slice(0, 10);
    return data.date === today ? data.count || 0 : 0;
  } catch { return 0; }
}
function bumpUsage(n = 1) {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const current = getTodayUsage();
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: today, count: current + n }));
  } catch {}
}

/* ─── SVG Icons ────────────────────────────────────────────────────── */
const Ic = ({ d, size = 18 }: { d: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">{d.split("|").map((p,i) => <path key={i} d={p} />)}</svg>
);
const IcUpload = (p: { size?: number }) => <Ic size={p.size} d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4|M17 8 12 3 7 8|M12 3v15" />;
const IcImage = (p: { size?: number }) => <Ic size={p.size} d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z|M9 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z|m21 15-5-5L5 21" />;
const IcSparkle = (p: { size?: number }) => <Ic size={p.size} d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />;
const IcDownload = (p: { size?: number }) => <Ic size={p.size} d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4|M7 10l5 5 5-5|M12 15V3" />;
const IcX = (p: { size?: number }) => <Ic size={p.size} d="M18 6 6 18|M6 6l12 12" />;
const IcLock = (p: { size?: number }) => <Ic size={p.size} d="M5 11h14v10H5z|M8 11V7a4 4 0 0 1 8 0v4" />;
const IcCheck = (p: { size?: number }) => <Ic size={p.size} d="M5 12l5 5L20 7" />;
const IcChip = (p: { size?: number }) => <Ic size={p.size} d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3|M6 6h12v12H6z" />;

/* ═══════════════════════════════════════════════════════════════════ */

export default function RemoveBg() {
  const [items, setItems] = useState<ImgItem[]>([]);
  const [bgMode, setBgMode] = useState<BgMode>("transparent");
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  const [cropMode, setCropMode] = useState<CropMode>("original");
  const [processing, setProcessing] = useState(false);
  const [modelStatus, setModelStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [modelProgress, setModelProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [todayUsed, setTodayUsed] = useState(0);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [device, setDevice] = useState<"webgpu" | "wasm" | "unknown">("unknown");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const pipelineRef = useRef<any>(null);

  // Init: load usage from storage + detect WebGPU
  useEffect(() => {
    setTodayUsed(getTodayUsage());
    (async () => {
      try {
        // @ts-ignore
        const hasGpu = !!navigator.gpu;
        setDevice(hasGpu ? "webgpu" : "wasm");
      } catch { setDevice("wasm"); }
    })();
  }, []);

  /* ─── Load AI model lazy ─── */
  const [loadError, setLoadError] = useState<string>("");

  // Try multiple models - Transformers.js v4 doesn't support all bg-remove models.
  // Xenova/modnet is officially tested with Transformers.js, fast + small.
  const MODEL_CANDIDATES = ["Xenova/modnet"];

  async function tryLoadPipeline(transformers: any, opts: any) {
    let lastErr: any;
    for (const modelId of MODEL_CANDIDATES) {
      try {
        return await transformers.pipeline("image-segmentation", modelId, {
          progress_callback: (data: any) => {
            if (data.status === "progress" && typeof data.progress === "number") {
              setModelProgress(Math.round(data.progress));
            }
          },
          ...opts,
        });
      } catch (err) {
        console.warn(`[Model ${modelId} failed]`, err);
        lastErr = err;
      }
    }
    throw lastErr;
  }

  async function ensureModel() {
    if (pipelineRef.current) return pipelineRef.current;
    setModelStatus("loading"); setModelProgress(0); setLoadError("");

    let transformers: any;
    try {
      transformers = await import("@huggingface/transformers");
    } catch (err: any) {
      const msg = `Không tải được Transformers.js: ${err?.message || err}`;
      console.error("[Transformers import]", err);
      setLoadError(msg); setModelStatus("error"); throw err;
    }

    try {
      transformers.env.allowLocalModels = false;
      transformers.env.useBrowserCache = true;
    } catch {}

    // Strategy: WebGPU first if available, fallback to WASM on any failure
    let pipe: any;
    let lastErr: any;

    if (device === "webgpu") {
      try {
        pipe = await tryLoadPipeline(transformers, { device: "webgpu", dtype: "fp32" });
      } catch (err: any) {
        console.warn("[WebGPU load failed, falling back to WASM]", err);
        lastErr = err;
      }
    }

    if (!pipe) {
      try {
        pipe = await tryLoadPipeline(transformers, { device: "wasm" });
      } catch (err: any) {
        console.error("[WASM load also failed]", err);
        const detail = err?.message || lastErr?.message || String(err);
        setLoadError(`Không tải được AI model. Chi tiết: ${detail.slice(0, 200)}`);
        setModelStatus("error");
        throw err;
      }
    }

    pipelineRef.current = pipe;
    setModelStatus("ready");
    return pipe;
  }

  /* ─── File handling ─── */
  function addFiles(files: FileList | File[]) {
    const arr = Array.from(files);
    const valid: File[] = [];
    for (const f of arr) {
      if (!f.type.startsWith("image/")) continue;
      if (f.size > MAX_FILE_SIZE) {
        alert(`"${f.name}" lớn hơn 12MB - bỏ qua`);
        continue;
      }
      valid.push(f);
    }

    setItems(prev => {
      const remaining = MAX_BATCH - prev.length;
      const accepted = valid.slice(0, remaining);
      const newItems: ImgItem[] = accepted.map(f => ({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        file: f,
        originalUrl: URL.createObjectURL(f),
        status: "idle",
      }));
      return [...prev, ...newItems];
    });
  }

  function removeItem(id: string) {
    setItems(prev => {
      const item = prev.find(x => x.id === id);
      if (item) {
        URL.revokeObjectURL(item.originalUrl);
        if (item.resultUrl) URL.revokeObjectURL(item.resultUrl);
      }
      return prev.filter(x => x.id !== id);
    });
  }

  function clearAll() {
    items.forEach(item => {
      URL.revokeObjectURL(item.originalUrl);
      if (item.resultUrl) URL.revokeObjectURL(item.resultUrl);
    });
    setItems([]);
  }

  /* ─── Process one image ─── */
  async function processImage(item: ImgItem, pipe: any): Promise<ImgItem> {
    try {
      setItems(prev => prev.map(x => x.id === item.id ? { ...x, status: "processing" } : x));

      const img = new Image();
      img.crossOrigin = "anonymous";
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = item.originalUrl;
      });

      // Run segmentation
      const output = await pipe(item.originalUrl);
      // output is array of {label, score, mask: RawImage}
      const mask = output?.[0]?.mask;
      if (!mask) throw new Error("No mask returned");

      // Create canvas with original image
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);

      // Apply mask as alpha
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const maskData = mask.data;
      const maskW = mask.width;
      const maskH = mask.height;

      // Resize mask to image dims if needed (RMBG-1.4 returns matching size usually)
      let usedMask = maskData;
      if (maskW !== canvas.width || maskH !== canvas.height) {
        // Resize via temp canvas
        const mCanvas = document.createElement("canvas");
        mCanvas.width = maskW; mCanvas.height = maskH;
        const mCtx = mCanvas.getContext("2d")!;
        const mImgData = mCtx.createImageData(maskW, maskH);
        for (let i = 0; i < maskData.length; i++) {
          mImgData.data[i*4] = maskData[i];
          mImgData.data[i*4+1] = maskData[i];
          mImgData.data[i*4+2] = maskData[i];
          mImgData.data[i*4+3] = 255;
        }
        mCtx.putImageData(mImgData, 0, 0);
        const rCanvas = document.createElement("canvas");
        rCanvas.width = canvas.width; rCanvas.height = canvas.height;
        const rCtx = rCanvas.getContext("2d")!;
        rCtx.drawImage(mCanvas, 0, 0, canvas.width, canvas.height);
        const rData = rCtx.getImageData(0, 0, canvas.width, canvas.height).data;
        usedMask = new Uint8Array(canvas.width * canvas.height);
        for (let i = 0; i < usedMask.length; i++) usedMask[i] = rData[i*4];
      }

      for (let i = 0; i < usedMask.length; i++) {
        imgData.data[i*4+3] = usedMask[i];
      }
      ctx.putImageData(imgData, 0, 0);

      // Background composite if not transparent
      let finalCanvas = canvas;
      if (bgMode !== "transparent") {
        const bgCanvas = document.createElement("canvas");
        bgCanvas.width = canvas.width; bgCanvas.height = canvas.height;
        const bgCtx = bgCanvas.getContext("2d")!;
        bgCtx.fillStyle = bgMode === "white" ? "#ffffff" : bgColor;
        bgCtx.fillRect(0, 0, canvas.width, canvas.height);
        bgCtx.drawImage(canvas, 0, 0);
        finalCanvas = bgCanvas;
      }

      // Crop if needed
      if (cropMode !== "original") {
        const ratios: Record<string, [number, number]> = {
          "1:1": [1, 1], "3:4": [3, 4], "4:5": [4, 5],
        };
        const [rw, rh] = ratios[cropMode];
        const srcRatio = finalCanvas.width / finalCanvas.height;
        const targetRatio = rw / rh;
        let cropW = finalCanvas.width, cropH = finalCanvas.height, offX = 0, offY = 0;
        if (srcRatio > targetRatio) {
          cropW = finalCanvas.height * targetRatio;
          offX = (finalCanvas.width - cropW) / 2;
        } else {
          cropH = finalCanvas.width / targetRatio;
          offY = (finalCanvas.height - cropH) / 2;
        }
        const cCanvas = document.createElement("canvas");
        cCanvas.width = Math.round(cropW); cCanvas.height = Math.round(cropH);
        const cCtx = cCanvas.getContext("2d")!;
        if (bgMode !== "transparent") {
          cCtx.fillStyle = bgMode === "white" ? "#ffffff" : bgColor;
          cCtx.fillRect(0, 0, cCanvas.width, cCanvas.height);
        }
        cCtx.drawImage(finalCanvas, offX, offY, cropW, cropH, 0, 0, cropW, cropH);
        finalCanvas = cCanvas;
      }

      // Export blob
      const blob: Blob = await new Promise(res => {
        finalCanvas.toBlob(b => res(b!), bgMode === "transparent" ? "image/png" : "image/jpeg", 0.94);
      });
      const url = URL.createObjectURL(blob);

      return { ...item, status: "done", resultUrl: url, resultBlob: blob };
    } catch (err: any) {
      console.error("processImage error", err);
      return { ...item, status: "error", error: err.message || "Lỗi xử lý" };
    }
  }

  /* ─── Main process button ─── */
  async function processAll() {
    const pending = items.filter(x => x.status === "idle");
    if (pending.length === 0) return;

    const remaining = FREE_DAILY_LIMIT - todayUsed;
    if (remaining <= 0) { setShowUpgrade(true); return; }

    const toProcess = pending.slice(0, Math.min(remaining, pending.length));
    if (toProcess.length < pending.length) {
      alert(`Bạn còn ${remaining} ảnh free hôm nay. Chỉ xử lý ${toProcess.length}/${pending.length}.`);
    }

    setProcessing(true);
    try {
      const pipe = await ensureModel();
      for (const item of toProcess) {
        const processed = await processImage(item, pipe);
        setItems(prev => prev.map(x => x.id === item.id ? processed : x));
        if (processed.status === "done") {
          bumpUsage(1);
          setTodayUsed(prev => prev + 1);
        }
      }
    } finally {
      setProcessing(false);
    }
  }

  /* ─── Download ─── */
  function downloadSingle(item: ImgItem) {
    if (!item.resultBlob) return;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(item.resultBlob);
    a.download = item.file.name.replace(/\.[^.]+$/, "") + (bgMode === "transparent" ? "_nobg.png" : "_bg.jpg");
    document.body.appendChild(a); a.click(); a.remove();
  }
  async function downloadZip() {
    const zip = new JSZip();
    items.filter(x => x.status === "done" && x.resultBlob).forEach(item => {
      const name = item.file.name.replace(/\.[^.]+$/, "") + (bgMode === "transparent" ? "_nobg.png" : "_bg.jpg");
      zip.file(name, item.resultBlob!);
    });
    const blob = await zip.generateAsync({ type: "blob" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `tach-nen-${Date.now()}.zip`;
    document.body.appendChild(a); a.click(); a.remove();
  }

  /* ─── DnD handlers ─── */
  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    if (e.dataTransfer.files.length > 0) addFiles(e.dataTransfer.files);
  }, []);

  const remainingToday = Math.max(0, FREE_DAILY_LIMIT - todayUsed);
  const doneItems = items.filter(x => x.status === "done");
  const idleCount = items.filter(x => x.status === "idle").length;

  /* ═══════════════════════════════════════════════════════════════════
     RENDER
  ═══════════════════════════════════════════════════════════════════ */
  return (
    <div className="w-full">
      {/* Usage chip */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.78rem] font-semibold"
            style={{ background: remainingToday > 0 ? "rgba(95,255,170,0.1)" : "rgba(255,100,100,0.12)", border: `1px solid ${remainingToday > 0 ? "rgba(95,255,170,0.3)" : "rgba(255,100,100,0.35)"}`, color: remainingToday > 0 ? "#5fffaa" : "#ff8888" }}>
            <IcSparkle size={12} />
            {remainingToday}/{FREE_DAILY_LIMIT} ảnh free hôm nay
          </span>
          {device !== "unknown" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.72rem]" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--st-60)" }}>
              <IcChip size={11} />
              {device === "webgpu" ? "WebGPU - tốc độ cao" : "WebAssembly - tương thích"}
            </span>
          )}
        </div>
        {remainingToday === 0 && (
          <button onClick={() => setShowUpgrade(true)} className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[0.78rem] font-bold" style={{ background: "linear-gradient(135deg,#146ef5,#7a3dff)", color: "#fff" }}>
            <IcLock size={12} /> Upgrade Premium
          </button>
        )}
      </div>

      {/* Upload dropzone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        className="cursor-pointer rounded-2xl p-8 md:p-12 text-center transition-all"
        style={{
          background: dragOver ? "rgba(20,110,245,0.08)" : "rgba(255,255,255,0.03)",
          border: `2px dashed ${dragOver ? "#146ef5" : "rgba(255,255,255,0.15)"}`,
        }}
      >
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4" style={{ background: "linear-gradient(135deg,#146ef5,#7a3dff)", color: "#fff" }}>
          <IcUpload size={24} />
        </div>
        <div className="text-[1.05rem] font-semibold text-white mb-1">
          {items.length === 0 ? "Kéo thả ảnh vào đây hoặc click chọn" : `Thêm ảnh (${items.length}/${MAX_BATCH})`}
        </div>
        <div className="text-[0.82rem]" style={{ color: "var(--st-50)" }}>
          PNG / JPG / WebP · Tối đa 12MB mỗi ảnh · Batch {MAX_BATCH} ảnh · 100% xử lý trên trình duyệt, ảnh không upload đâu cả
        </div>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={e => e.target.files && addFiles(e.target.files)}
        />
      </div>

      {/* Settings */}
      {items.length > 0 && (
        <div className="mt-5 rounded-xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="grid md:grid-cols-2 gap-5">
            {/* Bg mode */}
            <div>
              <div className="text-[0.72rem] font-bold uppercase tracking-[0.1em] mb-2.5" style={{ color: "var(--st-50)" }}>Loại nền sau khi tách</div>
              <div className="flex flex-wrap gap-2">
                {[
                  { v: "transparent", l: "Trong suốt (PNG)" },
                  { v: "white", l: "Nền trắng (chuẩn Shopee)" },
                  { v: "color", l: "Nền màu tùy chọn" },
                ].map(opt => (
                  <button key={opt.v} onClick={() => setBgMode(opt.v as BgMode)}
                    className="px-3 py-1.5 rounded-full text-[0.78rem] font-semibold transition-colors"
                    style={{
                      background: bgMode === opt.v ? "rgba(20,110,245,0.2)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${bgMode === opt.v ? "#146ef5" : "rgba(255,255,255,0.1)"}`,
                      color: bgMode === opt.v ? "#7da9ff" : "var(--st-65)",
                    }}>
                    {opt.l}
                  </button>
                ))}
                {bgMode === "color" && (
                  <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-10 h-9 rounded-full border-2 border-white/15 cursor-pointer" />
                )}
              </div>
            </div>

            {/* Crop ratio */}
            <div>
              <div className="text-[0.72rem] font-bold uppercase tracking-[0.1em] mb-2.5" style={{ color: "var(--st-50)" }}>Tỷ lệ crop (nếu cần)</div>
              <div className="flex flex-wrap gap-2">
                {[
                  { v: "original", l: "Giữ nguyên" },
                  { v: "1:1", l: "Vuông 1:1" },
                  { v: "3:4", l: "Dọc 3:4" },
                  { v: "4:5", l: "Reel 4:5" },
                ].map(opt => (
                  <button key={opt.v} onClick={() => setCropMode(opt.v as CropMode)}
                    className="px-3 py-1.5 rounded-full text-[0.78rem] font-semibold transition-colors"
                    style={{
                      background: cropMode === opt.v ? "rgba(20,110,245,0.2)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${cropMode === opt.v ? "#146ef5" : "rgba(255,255,255,0.1)"}`,
                      color: cropMode === opt.v ? "#7da9ff" : "var(--st-65)",
                    }}>
                    {opt.l}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between flex-wrap gap-3">
            <button onClick={clearAll} className="text-[0.82rem] hover:underline" style={{ color: "var(--st-50)" }}>Xoá tất cả</button>
            <div className="flex gap-2">
              {doneItems.length > 0 && (
                <button onClick={downloadZip} className="px-4 py-2 rounded-xl text-[0.84rem] font-bold inline-flex items-center gap-2"
                  style={{ background: "rgba(95,255,170,0.12)", border: "1px solid rgba(95,255,170,0.3)", color: "#5fffaa" }}>
                  <IcDownload size={14} /> Tải tất cả .zip ({doneItems.length})
                </button>
              )}
              <button onClick={processAll} disabled={processing || idleCount === 0}
                className="px-5 py-2 rounded-xl text-[0.86rem] font-bold inline-flex items-center gap-2 disabled:opacity-50"
                style={{ background: "linear-gradient(135deg,#146ef5,#7a3dff)", color: "#fff" }}>
                <IcSparkle size={14} /> {processing ? "Đang xử lý..." : `Tách nền (${idleCount} ảnh)`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Model loading */}
      {modelStatus === "loading" && (
        <div className="mt-4 rounded-xl p-4" style={{ background: "rgba(20,110,245,0.06)", border: "1px solid rgba(20,110,245,0.25)" }}>
          <div className="text-[0.82rem] mb-2" style={{ color: "var(--st-70)" }}>
            Đang tải AI model lần đầu (~25MB)... <strong className="text-white">{modelProgress}%</strong>
          </div>
          <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
            <div className="h-full rounded-full transition-all" style={{ width: `${modelProgress}%`, background: "linear-gradient(90deg,#146ef5,#7a3dff)" }} />
          </div>
          <div className="text-[0.72rem] mt-2" style={{ color: "var(--st-45)" }}>Lần sau dùng cache - không phải tải lại.</div>
        </div>
      )}
      {modelStatus === "error" && (
        <div className="mt-4 rounded-xl p-4" style={{ background: "rgba(255,100,100,0.08)", border: "1px solid rgba(255,100,100,0.3)", color: "#ff8888" }}>
          <div className="font-semibold mb-1">Lỗi tải AI model</div>
          {loadError && <div className="text-[0.78rem] mb-2 font-mono break-all opacity-80">{loadError}</div>}
          <div className="text-[0.82rem] mb-3" style={{ color: "rgba(255,255,255,0.6)" }}>
            Thử: (1) Reload trang · (2) Tắt VPN/extension chặn fetch · (3) Dùng Chrome/Edge mới nhất · (4) Kiểm tra console (F12) xem chi tiết
          </div>
          <button onClick={() => { pipelineRef.current = null; setModelStatus("idle"); setLoadError(""); }}
            style={{ padding: "6px 14px", borderRadius: 8, background: "rgba(255,100,100,0.15)", border: "1px solid rgba(255,100,100,0.4)", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            Thử lại
          </button>
        </div>
      )}

      {/* Result grid */}
      {items.length > 0 && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map(item => (
            <div key={item.id} className="relative rounded-xl overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="aspect-square relative" style={{
                backgroundImage: item.status === "done" && bgMode === "transparent" ? "url('data:image/svg+xml,%3Csvg width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Crect width=\"10\" height=\"10\" fill=\"%23262630\"/%3E%3Crect x=\"10\" y=\"10\" width=\"10\" height=\"10\" fill=\"%23262630\"/%3E%3C/svg%3E')" : undefined,
              }}>
                <img src={item.resultUrl || item.originalUrl} alt="" className="w-full h-full object-contain" />
                {item.status === "processing" && (
                  <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.6)" }}>
                    <div className="text-[0.78rem] font-bold" style={{ color: "#7da9ff" }}>Đang xử lý...</div>
                  </div>
                )}
                {item.status === "error" && (
                  <div className="absolute inset-0 flex items-center justify-center p-3" style={{ background: "rgba(0,0,0,0.7)" }}>
                    <div className="text-[0.7rem] font-semibold text-center" style={{ color: "#ff8888" }}>{item.error}</div>
                  </div>
                )}
                {item.status === "done" && (
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#5fffaa", color: "#000" }}>
                    <IcCheck size={14} />
                  </div>
                )}
              </div>
              <div className="p-2.5 flex items-center justify-between gap-2">
                <div className="text-[0.7rem] truncate flex-1" style={{ color: "var(--st-55)" }}>{item.file.name}</div>
                {item.status === "done" ? (
                  <button onClick={() => downloadSingle(item)} className="flex-shrink-0 w-7 h-7 rounded flex items-center justify-center" style={{ background: "rgba(95,255,170,0.15)", color: "#5fffaa" }}>
                    <IcDownload size={12} />
                  </button>
                ) : (
                  <button onClick={() => removeItem(item.id)} className="flex-shrink-0 w-7 h-7 rounded flex items-center justify-center" style={{ background: "rgba(255,255,255,0.06)", color: "var(--st-50)" }}>
                    <IcX size={12} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upgrade modal */}
      {showUpgrade && (
        <div onClick={() => setShowUpgrade(false)} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)" }}>
          <div onClick={e => e.stopPropagation()} className="max-w-md w-full rounded-2xl p-7" style={{ background: "#0f0f1a", border: "1px solid rgba(255,255,255,0.12)" }}>
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4" style={{ background: "linear-gradient(135deg,#146ef5,#7a3dff)", color: "#fff" }}>
              <IcLock size={22} />
            </div>
            <div className="text-[1.3rem] font-bold text-white mb-2">Hết lượt free hôm nay</div>
            <div className="text-[0.92rem] mb-5 leading-relaxed" style={{ color: "var(--st-65)" }}>
              Bạn đã dùng <strong className="text-white">{FREE_DAILY_LIMIT} ảnh free</strong> hôm nay. Reset 00:00 ngày mai - hoặc nâng cấp Premium để dùng không giới hạn.
            </div>

            <div className="rounded-xl p-4 mb-4" style={{ background: "rgba(20,110,245,0.06)", border: "1px solid rgba(20,110,245,0.25)" }}>
              <div className="flex items-baseline justify-between mb-1">
                <div className="text-[0.88rem] font-bold text-white">Premium - 50.000đ/tháng</div>
                <div className="text-[0.7rem]" style={{ color: "var(--st-50)" }}>~$2</div>
              </div>
              <ul className="text-[0.82rem] space-y-1" style={{ color: "var(--st-65)" }}>
                <li>✓ Không giới hạn ảnh/ngày</li>
                <li>✓ Batch không giới hạn (hiện free: 1 ảnh/run)</li>
                <li>✓ Ưu tiên model chất lượng cao</li>
                <li>✓ Hỗ trợ 1-1 qua Zalo</li>
              </ul>
            </div>

            <div className="rounded-xl p-4 mb-5" style={{ background: "rgba(95,255,170,0.06)", border: "1px solid rgba(95,255,170,0.25)" }}>
              <div className="text-[0.88rem] font-bold mb-1" style={{ color: "#5fffaa" }}>Lifetime - 199.000đ (1 lần)</div>
              <div className="text-[0.78rem]" style={{ color: "var(--st-65)" }}>Tất cả features Premium · Không bao giờ phải trả lại</div>
            </div>

            <a
              href={`https://zalo.me/0868464658?body=${encodeURIComponent("Mình muốn nâng cấp Premium tool tách nền ảnh")}`}
              target="_blank"
              rel="noopener"
              className="block w-full py-3 rounded-xl text-[0.92rem] font-bold text-center mb-2"
              style={{ background: "linear-gradient(135deg,#146ef5,#7a3dff)", color: "#fff" }}
            >
              Nhắn Zalo để nâng cấp
            </a>
            <button onClick={() => setShowUpgrade(false)} className="w-full py-2 text-[0.84rem]" style={{ color: "var(--st-50)" }}>
              Để sau
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
