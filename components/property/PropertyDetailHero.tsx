import Image from "next/image";
import Link from "next/link";
import AnimateIn from "@/components/AnimateIn";
import type { PropertyWithImages } from "@/lib/data/properties";

function formatDate(d: string | null) {
  if (!d) return null;
  return new Date(d).toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

export default function PropertyDetailHero({ property: p }: { property: PropertyWithImages }) {
  const date = formatDate(p.acquisitionDate);

  return (
    <section className="bg-[#f3efe6] pt-[72px]">
      {/* Breadcrumb */}
      <div className="wrap pt-7 pb-0">
        <AnimateIn>
          <nav className="flex items-center gap-[10px] font-mono text-[11px] tracking-[0.14em] uppercase text-muted">
            <Link href="/#portfolio" className="inline-flex items-center gap-[8px] text-muted hover:text-ink transition-colors">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="rotate-180">
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
              Portfolio
            </Link>
            <span className="opacity-45">/</span>
            <span className="text-ink-2">{p.type}</span>
            <span className="opacity-45">/</span>
            <span className="text-ink">{p.title}</span>
          </nav>
        </AnimateIn>
      </div>

      {/* Head: 2-col title + stats */}
      <div className="wrap pt-[34px] pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] gap-[72px] items-end mb-[42px]">
          <AnimateIn>
            <h1 className="font-serif font-normal text-[clamp(48px,6.4vw,104px)] leading-[0.95] tracking-[-0.02em] mt-[22px] mb-0 text-ink">
              {p.title}
            </h1>
          </AnimateIn>

          {/* Stats */}
          {p.units && (
            <AnimateIn delay={120}>
              <div className="flex gap-[40px] flex-wrap pt-[26px] border-t border-rule">
                <div>
                  <span className="block font-mono text-[10px] tracking-[0.14em] uppercase text-muted mb-[8px]">Units</span>
                  <strong className="font-serif font-normal text-[34px] tracking-[-0.02em] leading-none text-ink block">{p.units}</strong>
                </div>
                {p.type && (
                  <div>
                    <span className="block font-mono text-[10px] tracking-[0.14em] uppercase text-muted mb-[8px]">Type</span>
                    <strong className="font-serif font-normal text-[20px] tracking-[-0.01em] leading-none text-ink block">{p.type}</strong>
                  </div>
                )}
              </div>
            </AnimateIn>
          )}
        </div>

        {/* Panoramic stage image */}
        {p.coverImageUrl && (
          <AnimateIn>
            <div className="relative w-full aspect-[21/9] max-sm:aspect-[4/3] overflow-hidden bg-[#0e0d0a] border border-rule">
              <Image
                src={p.coverImageUrl}
                alt={p.coverImageAlt ?? p.title}
                fill
                priority
                className="object-cover [filter:saturate(.88)_contrast(1.04)_brightness(.96)]"
                sizes="(max-width: 640px) 100vw, 1320px"
              />
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(180deg,rgba(0,0,0,0) 45%,rgba(0,0,0,.5) 100%),linear-gradient(90deg,rgba(0,0,0,.3) 0%,rgba(0,0,0,0) 38%)" }}
              />
              <div className="absolute inset-0 flex flex-col justify-between p-[26px_30px] z-[2]">
                <div className="flex justify-between items-start">
                  {p.tag && (
                    <span className={`font-mono text-[10px] tracking-[0.14em] uppercase px-[13px] py-[7px] rounded-full font-medium ${p.tagAccent ? "bg-gold-warm text-[#1c1a15]" : "bg-[rgba(0,0,0,0.5)] text-[#c5bda1] border border-[rgba(255,255,255,0.14)]"}`}>
                      {p.tag}{date ? ` · ${date}` : ""}
                    </span>
                  )}
                </div>
                <p className="font-serif text-[26px] leading-[1.15] tracking-[-0.01em] text-[#f1ede0] max-w-[40ch] [text-shadow:0_2px_24px_rgba(0,0,0,0.4)] m-0">
                  {p.location}
                </p>
              </div>
            </div>
          </AnimateIn>
        )}
      </div>
    </section>
  );
}
