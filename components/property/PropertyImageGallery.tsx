"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { PropertyImage } from "@/lib/db/schema";

function PinIcon() {
  return (
    <svg width="11" height="14" viewBox="0 0 11 14" fill="none" className="flex-shrink-0 translate-y-[0.5px]">
      <path d="M5.5 0C3.015 0 1 2.015 1 4.5c0 3.375 4.5 9.5 4.5 9.5S10 7.875 10 4.5C10 2.015 7.985 0 5.5 0Zm0 6.125a1.625 1.625 0 1 1 0-3.25 1.625 1.625 0 0 1 0 3.25Z"
        fill="currentColor" fillOpacity=".85" />
    </svg>
  );
}

function GalleryImage({
  img,
  priority,
  sizes,
  address,
  showAddress,
}: {
  img: PropertyImage;
  priority?: boolean;
  sizes: string;
  address?: string | null;
  showAddress?: boolean;
}) {
  return (
    <div className="relative w-full h-full overflow-hidden bg-[#ebe5d6] group/img">
      <Image
        src={img.url}
        alt={img.altText ?? ""}
        fill
        priority={priority}
        className="object-cover [filter:saturate(.9)_contrast(1.04)] transition-transform duration-700 ease-out group-hover/img:scale-[1.03]"
        sizes={sizes}
      />
      {/* gradient veil */}
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(14,12,9,0.52)] via-[rgba(14,12,9,0.08)] to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-500" />

      {/* address banner – hero only */}
      {showAddress && address && (
        <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-gradient-to-t from-[rgba(14,12,9,0.78)] to-transparent">
          <div className="flex items-center gap-2 text-[#ddd6c4]">
            <PinIcon />
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase leading-none">
              {address}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PropertyImageGallery({
  images,
  address,
}: {
  images: PropertyImage[];
  address?: string | null;
}) {
  if (images.length === 0) return null;

  const [hero, ...rest] = images;
  const pairs: PropertyImage[][] = [];
  for (let i = 0; i < rest.length; i += 2) {
    pairs.push(rest.slice(i, i + 2));
  }

  return (
    <section className="py-24 bg-[#f3efe6]">
      <div className="wrap">

        {/* section label */}
        <div className="flex items-center justify-between mb-7">
          <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-muted flex items-center gap-[10px]">
            <span className="inline-block w-[6px] h-[6px] rounded-full bg-accent translate-y-[0.5px]" />
            Through the lens
          </div>
          <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted/60">
            {images.length} {images.length === 1 ? "image" : "images"}
          </span>
        </div>

        {/* hero */}
        <div className="relative w-full aspect-[16/9] border border-rule overflow-hidden">
          <GalleryImage img={hero} priority sizes="(max-width: 640px) 100vw, 1272px" address={address} showAddress />
        </div>

        {/* caption */}
        {(hero.caption ?? hero.altText) && (
          <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-muted/70 mt-3 mb-0">
            {hero.caption ?? hero.altText}
          </p>
        )}

        {/* grid of pairs */}
        {pairs.length > 0 && (
          <div className="flex flex-col gap-4 mt-4">
            {pairs.map((pair, pi) => (
              <div
                key={pi}
                className={cn(
                  "grid gap-4",
                  pair.length === 2 ? "grid-cols-2" : "grid-cols-1"
                )}
              >
                {pair.map((img) => (
                  <div key={img.id} className="flex flex-col">
                    <div className="relative aspect-[4/3] border border-rule overflow-hidden">
                      <GalleryImage img={img} sizes="(max-width: 640px) 100vw, 636px" />
                    </div>
                    {(img.caption ?? img.altText) && (
                      <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-muted/70 mt-2">
                        {img.caption ?? img.altText}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* rule */}
        <div className="mt-14 border-t border-rule/50" />
      </div>
    </section>
  );
}
