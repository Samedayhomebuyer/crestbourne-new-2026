"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { PropertyWithImages } from "@/lib/data/properties";
import { PROPERTY_CATEGORIES, CATEGORY_LABELS, type PropertyCategory } from "@/lib/db/schema";
import ImageUploader from "@/components/admin/ImageUploader";

type ImageRow = { url: string; altText: string; caption: string };

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function formatDateInput(value: string | Date | null | undefined) {
  if (!value) return "";
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value).slice(0, 10);
}

function propertyToFormState(property: PropertyWithImages) {
  return {
    title: property.title ?? "",
    slug: property.slug ?? "",
    category: property.category ?? "residential",
    location: property.location ?? "",
    type: property.type ?? "",
    tag: property.tag ?? "",
    tagAccent: property.tagAccent ?? false,
    address: property.address ?? "",
    description: property.description ?? "",
    units: property.units ?? "",
    coverImageUrl: property.coverImageUrl ?? "",
    coverImageAlt: property.coverImageAlt ?? "",
    isPublished: property.isPublished ?? false,
    acquisitionDate: formatDateInput(property.acquisitionDate),
    images: (property.images ?? []).map((i) => ({
      url: i.url,
      altText: i.altText ?? "",
      caption: i.caption ?? "",
    })),
  };
}

type FormState = ReturnType<typeof propertyToFormState>;

const emptyFormState: FormState = {
  title: "",
  slug: "",
  category: "residential",
  location: "",
  type: "",
  tag: "",
  tagAccent: false,
  address: "",
  description: "",
  units: "",
  coverImageUrl: "",
  coverImageAlt: "",
  isPublished: false,
  acquisitionDate: "",
  images: [],
};

export default function PropertyForm({ propertyId }: { propertyId?: string }) {
  const router = useRouter();
  const isEdit = !!propertyId;

  const [form, setForm] = useState<FormState>(emptyFormState);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [bulkUploading, setBulkUploading] = useState(false);
  const [bulkProgress, setBulkProgress] = useState("");
  const bulkInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!propertyId) return;

    let cancelled = false;

    async function loadProperty() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/properties/${propertyId}`);
        if (!res.ok) throw new Error(await res.text());
        const property = (await res.json()) as PropertyWithImages;
        if (!cancelled) setForm(propertyToFormState(property));
      } catch (err) {
        if (!cancelled) setError(String(err));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadProperty();
    return () => {
      cancelled = true;
    };
  }, [propertyId]);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleTitleChange(v: string) {
    setForm((prev) => ({
      ...prev,
      title: v,
      slug: isEdit ? prev.slug : slugify(v),
    }));
  }

  function addImage() {
    setForm((prev) => ({
      ...prev,
      images: [...prev.images, { url: "", altText: "", caption: "" }],
    }));
  }

  function updateImage(i: number, field: keyof ImageRow, val: string) {
    setForm((prev) => ({
      ...prev,
      images: prev.images.map((row, idx) => (idx === i ? { ...row, [field]: val } : row)),
    }));
  }

  function removeImage(i: number) {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== i),
    }));
  }

  async function handleBulkUpload(files: File[]) {
    setBulkUploading(true);
    setBulkProgress(`0 / ${files.length}`);
    setError("");
    const uploaded: string[] = [];
    const errors: string[] = [];

    for (let i = 0; i < files.length; i++) {
      try {
        const signRes = await fetch("/api/cloudinary/sign", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ folder: "crestbourne/properties" }),
        });
        if (!signRes.ok) throw new Error(await signRes.text());
        const { signature, timestamp, folder, cloudName, apiKey } = await signRes.json();

        const fd = new FormData();
        fd.append("file", files[i]);
        fd.append("api_key", apiKey);
        fd.append("timestamp", String(timestamp));
        fd.append("signature", signature);
        fd.append("folder", folder);

        const uploadRes = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          { method: "POST", body: fd }
        );
        const data = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(data?.error?.message ?? "Upload failed");
        uploaded.push(data.secure_url);
      } catch (err) {
        errors.push(`${files[i].name}: ${String(err)}`);
      }
      setBulkProgress(`${i + 1} / ${files.length}`);
    }

    if (uploaded.length > 0) {
      setForm((prev) => ({
        ...prev,
        images: [
          ...prev.images,
          ...uploaded.map((url) => ({ url, altText: "", caption: "" })),
        ],
      }));
    }
    if (errors.length > 0) {
      setError(`${errors.length} file(s) failed:\n${errors.join("\n")}`);
    }
    setBulkUploading(false);
    setBulkProgress("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const payload = {
        title: form.title,
        slug: form.slug,
        category: form.category,
        location: form.location,
        type: form.type,
        tag: form.tag || null,
        tagAccent: form.tagAccent,
        address: form.address || null,
        description: form.description || null,
        units: form.units || null,
        coverImageUrl: form.coverImageUrl || null,
        coverImageAlt: form.coverImageAlt || null,
        isPublished: form.isPublished,
        acquisitionDate: form.acquisitionDate || null,
        images: form.images.filter((i) => i.url),
      };

      const url = isEdit ? `/api/properties/${propertyId}` : "/api/properties";
      const method = isEdit ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(await res.text());
      router.push("/admin/properties");
      router.refresh();
    } catch (err) {
      setError(String(err));
    } finally {
      setSaving(false);
    }
  }

  const field = "block font-mono text-[10px] tracking-[0.12em] uppercase text-muted mb-2";
  const input = "w-full px-3 py-2 bg-white border border-rule text-ink text-[14px] focus:outline-none focus:border-ink transition-colors";

  if (loading) {
    return (
      <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-muted">
        Loading property…
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Core */}
      <div className="bg-paper border border-rule p-6 space-y-5">
        <h2 className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-muted">Core details</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={field}>Title</label>
            <input value={form.title} onChange={(e) => handleTitleChange(e.target.value)} required className={input} />
          </div>
          <div>
            <label className={field}>Slug</label>
            <input value={form.slug} onChange={(e) => updateField("slug", e.target.value)} required className={input} />
          </div>
          <div>
            <label className={field}>Location</label>
            <input value={form.location} onChange={(e) => updateField("location", e.target.value)} required className={input} placeholder="e.g. Chesterfield & Mansfield" />
          </div>
          <div>
            <label className={field}>Category</label>
            <select value={form.category} onChange={(e) => updateField("category", e.target.value as PropertyCategory)} className={input}>
              {PROPERTY_CATEGORIES.map((c) => <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>)}
            </select>
          </div>
          <div>
            <label className={field}>Type (display label)</label>
            <input value={form.type} onChange={(e) => updateField("type", e.target.value)} className={input} placeholder="e.g. Residential portfolio" />
          </div>
          <div>
            <label className={field}>Units</label>
            <input value={form.units} onChange={(e) => updateField("units", e.target.value)} className={input} placeholder="e.g. 68" />
          </div>
        </div>

        <div>
          <label className={field}>Address (optional)</label>
          <input value={form.address} onChange={(e) => updateField("address", e.target.value)} className={input} placeholder="Specific address if applicable" />
        </div>

        <div>
          <label className={field}>Description</label>
          <textarea value={form.description} onChange={(e) => updateField("description", e.target.value)} rows={4} className={input + " resize-y"} />
        </div>
      </div>

      {/* Badge */}
      <div className="bg-paper border border-rule p-6 space-y-4">
        <h2 className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-muted">Badge &amp; metadata</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={field}>Tag / badge label</label>
            <input value={form.tag} onChange={(e) => updateField("tag", e.target.value)} className={input} placeholder="e.g. Just acquired" />
          </div>
          <div>
            <label className={field}>Acquisition date</label>
            <input type="date" value={form.acquisitionDate} onChange={(e) => updateField("acquisitionDate", e.target.value)} className={input} />
          </div>
        </div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={form.tagAccent} onChange={(e) => updateField("tagAccent", e.target.checked)} className="w-4 h-4" />
          <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-muted">Green accent badge (flagship / just acquired)</span>
        </label>
      </div>

      {/* Cover image */}
      <div className="bg-paper border border-rule p-6 space-y-4">
        <h2 className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-muted">Cover image</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ImageUploader
            value={form.coverImageUrl}
            onUpload={(url) => updateField("coverImageUrl", url)}
            label="Cover image"
          />
          <div>
            <label className={field}>Cover image alt text</label>
            <input value={form.coverImageAlt} onChange={(e) => updateField("coverImageAlt", e.target.value)} className={input} />
          </div>
        </div>
      </div>

      {/* Additional images */}
      <div className="bg-paper border border-rule p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-muted">Gallery images</h2>
          <div className="flex items-center gap-4">
            {bulkUploading && (
              <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-muted">
                Uploading {bulkProgress}…
              </span>
            )}
            <button
              type="button"
              disabled={bulkUploading}
              onClick={() => bulkInputRef.current?.click()}
              className="font-mono text-[10px] tracking-[0.12em] uppercase text-accent hover:underline disabled:opacity-50"
            >
              + Upload images
            </button>
            <button type="button" onClick={addImage} className="font-mono text-[10px] tracking-[0.12em] uppercase text-muted hover:underline">
              + Add blank row
            </button>
          </div>
        </div>
        <input
          ref={bulkInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            const files = e.target.files ? Array.from(e.target.files) : [];
            e.target.value = "";
            if (files.length) handleBulkUpload(files);
          }}
        />
        {form.images.length === 0 && (
          <p className="font-mono text-[10px] tracking-[0.1em] uppercase text-muted/60">No gallery images yet.</p>
        )}
        {form.images.map((img, i) => (
          <div key={i} className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-3 items-end border-t border-rule-soft pt-4">
            <ImageUploader
              value={img.url}
              onUpload={(url) => updateImage(i, "url", url)}
              label={`Gallery image ${i + 1}`}
            />
            <div>
              <label className={field}>Alt text</label>
              <input value={img.altText} onChange={(e) => updateImage(i, "altText", e.target.value)} className={input} />
            </div>
            <button type="button" onClick={() => removeImage(i)} className="font-mono text-[10px] uppercase text-red-500 hover:text-red-700 pb-2">
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Publishing */}
      <div className="bg-paper border border-rule p-6 space-y-4">
        <h2 className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-muted">Publishing</h2>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={form.isPublished} onChange={(e) => updateField("isPublished", e.target.checked)} className="w-4 h-4" />
          <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-muted">Published (visible on site)</span>
        </label>
      </div>

      {error && <p className="font-mono text-[11px] uppercase text-red-600">{error}</p>}

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={saving || loading}
          className="px-8 py-3 bg-ink text-paper font-mono text-[11px] tracking-[0.14em] uppercase hover:bg-ink-2 transition-colors disabled:opacity-50"
        >
          {saving ? "Saving…" : isEdit ? "Save changes" : "Create property"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/properties")}
          className="px-8 py-3 border border-rule font-mono text-[11px] tracking-[0.14em] uppercase text-muted hover:text-ink transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
