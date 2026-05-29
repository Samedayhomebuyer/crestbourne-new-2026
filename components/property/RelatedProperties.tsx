import Image from "next/image";
import Link from "next/link";
import AnimateIn from "@/components/AnimateIn";
import { ArrowIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import type { PropertyWithImages } from "@/lib/data/properties";

export default function RelatedProperties({ properties }: { properties: PropertyWithImages[] }) {
  if (!properties.length) return null;

  return (
    <section className="py-24 bg-[#f3efe6]">
      <div className="wrap">
        <div className="flex items-end justify-between gap-6 mb-9">
          <AnimateIn>
            <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-muted flex items-center">
              <span className="inline-block w-[6px] h-[6px] rounded-full bg-accent mr-[10px] translate-y-[1px]" />
              More from the book
            </div>
            <h2 className="font-serif font-normal text-[clamp(34px,4.4vw,60px)] leading-none tracking-[-0.02em] mt-4 mb-0 text-ink">
              Comparable <em className="italic text-accent">holdings.</em>
            </h2>
          </AnimateIn>
          <AnimateIn delay={100}>
            <Link href="/#portfolio" className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink-2 inline-flex items-center gap-[10px] whitespace-nowrap border-b border-rule pb-1 hover:text-ink transition-colors">
              View all holdings <ArrowIcon className="w-[14px] h-[14px]" />
            </Link>
          </AnimateIn>
        </div>

        <AnimateIn stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((p) => (
            <Link
              key={p.id}
              href={`/properties/${p.slug}`}
              className="group bg-paper border border-rule flex flex-col transition-[transform,box-shadow] duration-250 hover:-translate-y-[2px] hover:shadow-[0_12px_32px_-16px_rgba(23,22,18,0.18)]"
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-[#ebe5d6]">
                {p.coverImageUrl && (
                  <Image
                    src={p.coverImageUrl}
                    alt={p.coverImageAlt ?? p.title}
                    fill
                    className="object-cover [filter:saturate(.9)_contrast(1.02)] group-hover:scale-[1.04] transition-transform duration-[600ms] ease-[cubic-bezier(.16,1,.3,1)]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1080px) 50vw, 33vw"
                  />
                )}
                <span className={cn(
                  "absolute top-[14px] right-[14px] font-mono text-[9.5px] tracking-[0.14em] uppercase text-paper px-[10px] py-[5px] rounded-full",
                  p.tagAccent ? "bg-accent" : "bg-ink"
                )}>
                  {p.tag ?? p.category}
                </span>
              </div>
              <div className="p-[22px_24px_24px] flex flex-col flex-1">
                <div className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-muted mb-2 flex justify-between gap-2">
                  <span>{p.location}</span><span>{p.type}</span>
                </div>
                <h4 className="font-serif font-normal text-[26px] leading-[1.05] tracking-[-0.01em] m-0 mb-[6px] text-ink">
                  {p.title}
                </h4>
                {p.units && (
                  <div className="flex border-t border-rule-soft pt-[14px] mt-auto">
                    <div>
                      <span className="block font-mono text-[9px] tracking-[0.14em] uppercase text-muted">Units</span>
                      <b className="font-serif font-normal text-[18px] tracking-[-0.01em] mt-[2px] block">{p.units}</b>
                    </div>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </AnimateIn>
      </div>
    </section>
  );
}
