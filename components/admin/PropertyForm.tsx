"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { PropertyWithImages } from "@/lib/data/properties";
import { PROPERTY_CATEGORIES, CATEGORY_LABELS } from "@/lib/db/schema";

type ImageRow = { url: string; altText: string; caption: string };

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function PropertyForm({ property }: { property?: PropertyWithImages }) {
  const router = useRouter();
  const isEdit = !!property;

  const [title, setTitle] = useState(property?.title ?? "");
  const [slug, setSlug] = useState(property?.slug ?? "");
  const [category, setCategory] = useState(property?.category ?? "residential");
  const [location, setLocation] = useState(property?.location ?? "");
  const [type, setType] = useState(property?.type ?? "");
  const [tag, setTag] = useState(property?.tag ?? "");
  const [tagAccent, setTagAccent] = useState(property?.tagAccent ?? false);
  const [address, setAddress] = useState(property?.address ?? "");
  const [description, setDescription] = useState(property?.description ?? "");
  const [units, setUnits] = useState(property?.units ?? "");
  const [coverImageUrl, setCoverImageUrl] = useState(property?.coverImageUrl ?? "");
  const [coverImageAlt, setCoverImageAlt] = useState(property?.coverImageAlt ?? "");
  const [isPublished, setIsPublished] = useState(property?.isPublished ?? false);
  const [acquisitionDate, setAcquisitionDate] = useState(property?.acquisitionDate ?? "");
  const [images, setImages] = useState<ImageRow[]>(
    property?.images.map((i) => ({ url: i.url, altText: i.altText ?? "", caption: i.caption ?? "" })) ?? []
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function handleTitleChange(v: string) {
    setTitle(v);
    if (!isEdit) setSlug(slugify(v));
  }

  function addImage() {
    setImages((prev) => [...prev, { url: "", altText: "", caption: "" }]);
  }

  function updateImage(i: number, field: keyof ImageRow, val: string) {
    setImages((prev) => prev.map((row, idx) => idx === i ? { ...row, [field]: val } : row));
  }

  function removeImage(i: number) {
    setImages((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const payload = {
        title, slug, category, location, type, tag: tag || null, tagAccent,
        address: address || null, description: description || null,
        units: units || null, coverImageUrl: coverImageUrl || null,
        coverImageAlt: coverImageAlt || null, isPublished,
        acquisitionDate: acquisitionDate || null,
        images: images.filter((i) => i.url),
      };

      const url = isEdit ? `/api/properties/${property!.id}` : "/api/properties";
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

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Core */}
      <div className="bg-paper border border-rule p-6 space-y-5">
        <h2 className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-muted">Core details</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={field}>Title</label>
            <input value={title} onChange={(e) => handleTitleChange(e.target.value)} required className={input} />
          </div>
          <div>
            <label className={field}>Slug</label>
            <input value={slug} onChange={(e) => setSlug(e.target.value)} required className={input} />
          </div>
          <div>
            <label className={field}>Location</label>
            <input value={location} onChange={(e) => setLocation(e.target.value)} required className={input} placeholder="e.g. Chesterfield & Mansfield" />
          </div>
          <div>
            <label className={field}>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className={input}>
              {PROPERTY_CATEGORIES.map((c) => <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>)}
            </select>
          </div>
          <div>
            <label className={field}>Type (display label)</label>
            <input value={type} onChange={(e) => setType(e.target.value)} className={input} placeholder="e.g. Residential portfolio" />
          </div>
          <div>
            <label className={field}>Units</label>
            <input value={units} onChange={(e) => setUnits(e.target.value)} className={input} placeholder="e.g. 68" />
          </div>
        </div>

        <div>
          <label className={field}>Address (optional)</label>
          <input value={address} onChange={(e) => setAddress(e.target.value)} className={input} placeholder="Specific address if applicable" />
        </div>

        <div>
          <label className={field}>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className={input + " resize-y"} />
        </div>
      </div>

      {/* Badge */}
      <div className="bg-paper border border-rule p-6 space-y-4">
        <h2 className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-muted">Badge &amp; metadata</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={field}>Tag / badge label</label>
            <input value={tag} onChange={(e) => setTag(e.target.value)} className={input} placeholder="e.g. Just acquired" />
          </div>
          <div>
            <label className={field}>Acquisition date</label>
            <input type="date" value={acquisitionDate} onChange={(e) => setAcquisitionDate(e.target.value)} className={input} />
          </div>
        </div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={tagAccent} onChange={(e) => setTagAccent(e.target.checked)} className="w-4 h-4" />
          <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-muted">Green accent badge (flagship / just acquired)</span>
        </label>
      </div>

      {/* Cover image */}
      <div className="bg-paper border border-rule p-6 space-y-4">
        <h2 className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-muted">Cover image</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={field}>Cover image URL</label>
            <input value={coverImageUrl} onChange={(e) => setCoverImageUrl(e.target.value)} className={input} placeholder="https://..." />
          </div>
          <div>
            <label className={field}>Cover image alt text</label>
            <input value={coverImageAlt} onChange={(e) => setCoverImageAlt(e.target.value)} className={input} />
          </div>
        </div>
        {coverImageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={coverImageUrl} alt={coverImageAlt} className="h-40 w-full object-cover border border-rule" />
        )}
      </div>

      {/* Additional images */}
      <div className="bg-paper border border-rule p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-muted">Gallery images</h2>
          <button type="button" onClick={addImage} className="font-mono text-[10px] tracking-[0.12em] uppercase text-accent hover:underline">
            + Add image
          </button>
        </div>
        {images.length === 0 && (
          <p className="font-mono text-[10px] tracking-[0.1em] uppercase text-muted/60">No gallery images yet.</p>
        )}
        {images.map((img, i) => (
          <div key={i} className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-3 items-end border-t border-rule-soft pt-4">
            <div>
              <label className={field}>Image URL</label>
              <input value={img.url} onChange={(e) => updateImage(i, "url", e.target.value)} className={input} placeholder="https://..." />
            </div>
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
          <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} className="w-4 h-4" />
          <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-muted">Published (visible on site)</span>
        </label>
      </div>

      {error && <p className="font-mono text-[11px] uppercase text-red-600">{error}</p>}

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={saving}
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
