"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { PropertyImage } from "@/lib/db/schema";

export default function PropertyImageGallery({ images }: { images: PropertyImage[] }) {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const multi = images.length > 1;
  const total = images.length;

  const prev = useCallback(() => setActive((i) => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setActive((i) => (i + 1) % total), [total]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpen, prev, next]);

  if (images.length === 0) return null;

  return (
    <section className="py-24 bg-[#f3efe6]">
      <div className="wrap">
        <div className="flex items-center justify-between mb-[22px]">
          <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-muted flex items-center">
            <span className="inline-block w-[6px] h-[6px] rounded-full bg-accent mr-[10px] translate-y-[1px]" />
            Through the lens
          </div>
          <span className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-muted">
            {active + 1} / {total}
          </span>
        </div>

        {/* Main stage */}
        <div className="relative w-full aspect-[16/9] overflow-hidden border border-rule bg-[#ebe5d6] group">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setLightboxOpen(true)}
              className="absolute inset-0 w-full h-full cursor-zoom-in p-0 bg-transparent border-0"
              tabIndex={i === active ? 0 : -1}
              aria-label={`View fullscreen: ${img.altText ?? ""}`}
            >
              <Image
                src={img.url}
                alt={img.altText ?? ""}
                fill
                priority={i === 0}
                className={cn(
                  "object-cover [filter:saturate(.92)_contrast(1.03)] transition-opacity duration-700",
                  i === active ? "opacity-100" : "opacity-0"
                )}
                sizes="(max-width: 640px) 100vw, 1272px"
              />
            </button>
          ))}

          {multi && (
            <>
              <button onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 grid place-items-center bg-[rgba(14,13,10,0.55)] hover:bg-[rgba(14,13,10,0.82)] text-[#f1ede0] border border-[rgba(255,255,255,0.16)] rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-[opacity,background]"
                aria-label="Previous">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 grid place-items-center bg-[rgba(14,13,10,0.55)] hover:bg-[rgba(14,13,10,0.82)] text-[#f1ede0] border border-[rgba(255,255,255,0.16)] rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-[opacity,background]"
                aria-label="Next">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </>
          )}
        </div>

        {/* Caption + thumbnails */}
        <p className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-muted mt-4 mb-[14px]">
          {images[active].caption ?? images[active].altText ?? ""}
        </p>
        {multi && (
          <div className="flex gap-3">
            {images.map((img, i) => (
              <button key={img.id} onClick={() => setActive(i)}
                className={cn("relative flex-1 aspect-[16/10] overflow-hidden border p-0 bg-[#ebe5d6] transition-[opacity,border-color] duration-250",
                  i === active ? "opacity-100 border-ink" : "opacity-60 border-transparent hover:opacity-85")}>
                <Image src={img.url} alt={img.altText ?? ""} fill className="object-cover [filter:saturate(.92)_contrast(1.03)]" sizes="200px" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-[rgba(14,13,10,0.96)] flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}>
          <div className="relative w-full max-w-[1100px] mx-6 aspect-[16/9]" onClick={(e) => e.stopPropagation()}>
            {images.map((img, i) => (
              <Image key={img.id} src={img.url} alt={img.altText ?? ""} fill
                className={cn("object-contain transition-opacity duration-400", i === active ? "opacity-100" : "opacity-0")}
                sizes="100vw" />
            ))}
          </div>
          <button onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 font-mono text-[11px] tracking-[0.14em] uppercase text-[#bdb6a2] hover:text-[#f1ede0] transition-colors bg-transparent border-0 cursor-pointer">
            Close [Esc]
          </button>
          {multi && (
            <>
              <button onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-11 h-11 grid place-items-center bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] text-[#f1ede0] rounded-full border-0 cursor-pointer transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-11 h-11 grid place-items-center bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] text-[#f1ede0] rounded-full border-0 cursor-pointer transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </>
          )}
          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.14em] uppercase text-[#8c8267]">
            {active + 1} / {total}
          </span>
        </div>
      )}
    </section>
  );
}
