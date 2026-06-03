"use client";

import { useRef, useState } from "react";

interface Props {
  value: string;
  onUpload: (url: string) => void;
  folder?: string;
  label?: string;
}

export default function ImageUploader({
  value,
  onUpload,
  folder = "crestbourne/properties",
  label,
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);

  const input =
    "w-full px-3 py-2 bg-white border border-rule text-ink text-[14px] focus:outline-none focus:border-ink transition-colors";
  const label_cls =
    "block font-mono text-[10px] tracking-[0.12em] uppercase text-muted mb-2";

  async function handleFile(file: File) {
    setUploading(true);
    setError("");
    try {
      const signRes = await fetch("/api/cloudinary/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder }),
      });
      if (!signRes.ok) {
        const msg = await signRes.text();
        throw new Error(`Sign failed: ${msg}`);
      }
      const { signature, timestamp, cloudName, apiKey, folder: signedFolder } =
        await signRes.json();

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("timestamp", String(timestamp));
      formData.append("signature", signature);
      formData.append("folder", signedFolder);

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: formData }
      );
      const data = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(data?.error?.message ?? "Upload failed");
      onUpload(data.secure_url);
    } catch (err) {
      setError(String(err));
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      {label && <span className={label_cls}>{label}</span>}

      {/* Preview */}
      {value && !uploading && (
        <img
          src={value}
          alt=""
          className="h-32 w-full object-cover border border-rule"
        />
      )}

      {/* Upload button */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={uploading}
          onClick={() => fileRef.current?.click()}
          className="px-4 py-2 border border-rule font-mono text-[10px] tracking-[0.12em] uppercase text-muted hover:text-ink hover:border-ink transition-colors disabled:opacity-50"
        >
          {uploading ? "Uploading…" : value ? "Replace image" : "Upload image"}
        </button>
        <button
          type="button"
          onClick={() => setShowUrlInput((v) => !v)}
          className="font-mono text-[10px] tracking-[0.12em] uppercase text-muted/60 hover:text-muted underline"
        >
          {showUrlInput ? "Hide URL" : "or enter URL"}
        </button>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />

      {/* Manual URL fallback */}
      {showUrlInput && (
        <input
          value={value}
          onChange={(e) => onUpload(e.target.value)}
          className={input}
          placeholder="https://..."
        />
      )}

      {error && (
        <p className="font-mono text-[10px] uppercase text-red-600">{error}</p>
      )}
    </div>
  );
}
