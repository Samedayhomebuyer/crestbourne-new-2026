"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import AnimateIn from "@/components/AnimateIn";
import type { PropertyWithImages } from "@/lib/data/properties";
import { CATEGORY_LABELS, PROPERTY_CATEGORIES, type PropertyCategory } from "@/lib/db/schema";

type FilterKey = "all" | PropertyCategory;

const FILTER_LABELS: Record<FilterKey, string> = {
  all: "All",
  ...CATEGORY_LABELS,
};

export default function Portfolio({
  initialProperties,
  filterCounts,
}: {
  initialProperties: PropertyWithImages[];
  filterCounts: Record<string, number>;
}) {
  const [active, setActive] = useState<FilterKey>("all");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const visible = active === "all"
    ? initialProperties
    : initialProperties.filter((p) => p.category === active);

  const filters = (["all", ...PROPERTY_CATEGORIES] as FilterKey[]).map((key) => ({
    key,
    label: FILTER_LABELS[key],
    count: key === "all" ? (filterCounts.all ?? initialProperties.length) : (filterCounts[key] ?? 0),
  }));

  return (
    <section id="portfolio" className="py-24">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-[60px] items-end mb-14">
          <AnimateIn>
            <div className="font-mono text-[11px] tracking-widest2 uppercase text-muted flex items-center">
              <span className="inline-block w-[6px] h-[6px] rounded-full bg-accent mr-[10px] translate-y-[1px]" />
              Portfolio
            </div>
            <h2 className="font-serif font-normal text-[clamp(48px,5.5vw,80px)] leading-[0.98] tracking-[-0.02em] mt-4 text-ink">
              A curated book<br />of <em className="italic text-accent">income assets.</em>
            </h2>
          </AnimateIn>
          <AnimateIn as="p" delay={150} className="text-[17px] leading-[1.6] text-ink-2 max-w-[50ch] pb-[6px]">
            Across the UK we hold residential blocks, terraced freeholds, mixed-use parades and selected commercial.
            Each asset is hand-picked, hands-on managed, and held for the long term.
          </AnimateIn>
        </div>
      </div>

      {/* Wider than .wrap so 4 cols match the old 3-col card width (~392px) */}
      <div className="mx-auto w-full max-w-[min(1736px,calc(100vw-48px))] px-6 sm:px-12">
        {/* Filter chips */}
        <div className="flex gap-[10px] flex-wrap mb-8">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={cn(
                "px-4 py-2 border rounded-full font-mono text-[12.5px] tracking-[0.08em] uppercase cursor-pointer transition-colors whitespace-nowrap",
                active === f.key
                  ? "bg-ink text-paper border-ink"
                  : "bg-paper text-ink-2 border-rule hover:bg-bg-2"
              )}
            >
              {f.label} <span className="ml-2 opacity-60 text-[10px]">{f.count}</span>
            </button>
          ))}
        </div>

        {/* Portfolio grid */}
        <AnimateIn stagger className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {visible.map((p) => (
              <Link
                key={p.id}
                href={`/properties/${p.slug}`}
                onMouseEnter={() => setHoveredId(p.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="block"
              >
                <article className={cn(
                  "bg-paper border border-rule flex flex-col transition-all duration-300 ease-out hover:-translate-y-[2px] hover:shadow-[0_12px_32px_-16px_rgba(23,22,18,0.18)] h-full",
                  hoveredId !== null && hoveredId !== p.id && "blur-[2px] scale-[0.98] opacity-80"
                )}>
                  <div className="relative overflow-hidden prop-img-bg aspect-[4/3]">
                    {p.coverImageUrl && (
                      <Image
                        src={p.coverImageUrl}
                        alt={p.coverImageAlt ?? p.title}
                        fill
                        className="object-cover [filter:saturate(0.9)_contrast(1.02)]"
                        sizes="(max-width:640px) 100vw, (max-width:1280px) 50vw, 392px"
                      />
                    )}
                    <span className={cn(
                      "absolute top-[14px] right-[14px] font-mono text-[9.5px] tracking-[0.14em] uppercase text-paper px-[10px] py-[5px] rounded-full whitespace-nowrap",
                      p.tagAccent ? "bg-accent" : "bg-ink"
                    )}>
                      {p.tag ?? CATEGORY_LABELS[p.category]}
                    </span>
                  </div>
                  <div className="p-[22px_24px_24px]">
                    <div className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-muted mb-2 flex justify-between">
                      <span>{p.location}</span><span>{p.type}</span>
                    </div>
                    <h4 className="font-serif font-normal text-[26px] leading-[1.05] tracking-[-0.01em] m-0 mb-[6px]">
                      {p.title}
                    </h4>
                    <p className="text-[13.5px] text-ink-2 leading-[1.5] mb-[18px] min-h-[42px] line-clamp-2">
                      {p.description}
                    </p>
                    {p.units && (
                      <div className="flex border-t border-rule-soft pt-[14px]">
                        <div>
                          <span className="block font-mono text-[9px] tracking-[0.14em] uppercase text-muted">Units</span>
                          <b className="font-serif font-normal text-[18px] tracking-[-0.01em] mt-[2px] block">{p.units}</b>
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              </Link>
          ))}
        </AnimateIn>

        <div className="flex justify-between items-center mt-10 pt-7 border-t border-rule">
          <span className="text-[13.5px] text-muted">Showing {visible.length} of {filterCounts.all ?? initialProperties.length} holdings.</span>
        </div>
      </div>
    </section>
  );
}
