"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import AnimateIn from "@/components/AnimateIn";

type FilterKey = "all" | "residential" | "hmo" | "mixed" | "commercial" | "progress";

const filters: { key: FilterKey; label: string; count: number }[] = [
  { key: "all", label: "All", count: 42 },
  { key: "residential", label: "Residential blocks", count: 18 },
  { key: "mixed", label: "Mixed-use", count: 7 },
  { key: "commercial", label: "Commercial", count: 4 },
];

const properties = [
  {
    id: "01",
    img: "https://res.cloudinary.com/dmns9ystn/image/upload/v1750421155/spire_10_hx3pfn.png",
    imgAlt: "Spire Portfolio — three-bedroom houses, Chesterfield & Mansfield",
    tag: "Flagship", tagAccent: true,
    location: "Chesterfield & Mansfield · E. Midlands", type: "Residential portfolio",
    title: <>Spire <em className="italic">Portfolio</em></>,
    desc: "68 fully-let three-bedroom freehold houses across Chesterfield and Mansfield. Mix of traditional and non-traditional construction, excellent transport links.",
    stats: [{ l: "Units", v: "68" }, { l: "Occupancy", v: "100%" }, { l: "Tenure", v: "Freehold" }, { l: "Held", v: "2026" }],
    filter: "residential",
  },
  {
    id: "02",
    img: "https://res.cloudinary.com/dmns9ystn/image/upload/v1750421152/Screenshot_2025-06-06_at_18.14.52_f7b7ve.png",
    imgAlt: "Northampton Portfolio — terraced houses, Baker Street",
    tag: "Value-add", tagAccent: false,
    location: "Northampton · NN1", type: "HMO portfolio",
    title: <>Northampton <em className="italic">Portfolio</em></>,
    desc: "16 terraced freehold houses with 66 bedrooms across Baker Street, Freehold Street, and St Paul's Road — within 1.5km of the station.",
    stats: [{ l: "Houses", v: "16" }, { l: "Beds", v: "66" }, { l: "Yield", v: "8.7%" }, { l: "Held", v: "2026" }],
    filter: "hmo",
  },
  {
    id: "03",
    img: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753954163/11_qsbhoy.jpg",
    imgAlt: "Newlands Croft — Bromley, Lennard Road SE20",
    tag: "Stabilised", tagAccent: false,
    location: "Bromley · SE20", type: "Residential block",
    title: <>Newlands <em className="italic">Croft</em></>,
    desc: "Originally built in the 1940s as 16 flats, redeveloped into 12 spacious flats on Lennard Road SE20. Managed in-house by our team.",
    stats: [{ l: "Units", v: "12" }, { l: "Yield", v: "6.9%" }, { l: "Held", v: "2022" }],
    filter: "residential",
  },
  {
    id: "04",
    img: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754056353/0_sqbh8z.jpg",
    imgAlt: "London residential portfolio — Greater London properties",
    tag: "Just let", tagAccent: false,
    location: "Greater London", type: "Residential portfolio",
    title: <>London <em className="italic">Portfolio</em></>,
    desc: "10 freehold properties across Croydon, Edmonton, Walthamstow, and Romford. Strong rental yields and capital growth potential in established commuter catchments.",
    stats: [{ l: "Properties", v: "10" }, { l: "Tenure", v: "Freehold" }, { l: "Held", v: "2025" }],
    filter: "residential",
  },
  {
    id: "05",
    img: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754056401/0_w1z5et.jpg",
    imgAlt: "West Midlands residential portfolio — Birmingham, Walsall, Dudley",
    tag: "Stabilised", tagAccent: false,
    location: "Birmingham & Walsall", type: "Residential portfolio",
    title: <>West Midlands <em className="italic">Portfolio</em></>,
    desc: "10 freehold properties across Birmingham, Walsall, Dudley, and West Bromwich. Excellent transport links, fully let with strong local rental demand.",
    stats: [{ l: "Properties", v: "10" }, { l: "Tenure", v: "Freehold" }, { l: "Held", v: "2024" }],
    filter: "residential",
  },
  {
    id: "06",
    img: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972570/48_worsley_road_sJHUDn_mr9hib.jpg",
    imgAlt: "North West portfolio — Manchester, Worsley Road",
    tag: "Long-hold", tagAccent: false,
    location: "Manchester & Liverpool", type: "Residential portfolio",
    title: <>North West <em className="italic">Portfolio</em></>,
    desc: "Properties across Manchester, Liverpool, Blackpool, Leeds, and Bradford. Strong rental yields and deep tenant demand across established northern markets.",
    stats: [{ l: "Properties", v: "5" }, { l: "Yield", v: "8.4%" }, { l: "Held", v: "2021" }],
    filter: "residential",
  },
  {
    id: "07",
    img: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754229584/TBR_003_l9b8s3.jpg",
    imgAlt: "Tower Bridge Quarter — South Bank mixed-use commercial",
    tag: "Featured", tagAccent: true,
    location: "South Bank · SE1", type: "Mixed-use commercial",
    title: <>Tower Bridge <em className="italic">Quarter</em></>,
    desc: "Nine buildings, 39,582 sq ft in prime South Bank. Tenants include Brewdog, Foxtons, and Chestertons. £899,875 annual income, freehold.",
    stats: [{ l: "Buildings", v: "9" }, { l: "Sq ft", v: "39.5k" }, { l: "Income p.a.", v: "£900k" }, { l: "Held", v: "2026" }],
    filter: "commercial",
  },
  {
    id: "08",
    img: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753727916/8.Barry-31RZD_v61kgp.jpg",
    imgAlt: "Barry Retail Parade — Holton Road, South Wales",
    tag: "Stabilised", tagAccent: false,
    location: "Barry · CF63", type: "Retail parade",
    title: <>Barry Retail <em className="italic">Parade</em></>,
    desc: "13 retail units across 53,500 sq ft on Holton Road, Barry. Anchored by Boots, Iceland, Greggs, TUI, NatWest, and Poundland. £401,550 annual income.",
    stats: [{ l: "Units", v: "13" }, { l: "Sq ft", v: "53.5k" }, { l: "Income p.a.", v: "£402k" }, { l: "Held", v: "2023" }],
    filter: "commercial",
  },
  {
    id: "09",
    img: "https://res.cloudinary.com/dmns9ystn/image/upload/v1751890809/portfolio_by_abby__image36_qx5h2n.png",
    imgAlt: "Cheltenham Parade — retail and office, central Cheltenham",
    tag: "Stabilised", tagAccent: false,
    location: "Cheltenham · GL50", type: "Retail & office",
    title: <>Cheltenham <em className="italic">Parade</em></>,
    desc: "11 retail units with office upper floors in central Cheltenham. £187,500 annual income from a diversified tenant mix in a prime town centre location.",
    stats: [{ l: "Units", v: "11" }, { l: "Income p.a.", v: "£188k" }, { l: "Held", v: "2022" }],
    filter: "mixed",
  },
];

const filterMap: Record<FilterKey, string | null> = {
  all: null, residential: "residential", hmo: "hmo",
  mixed: "mixed", commercial: "commercial", progress: "progress",
};

export default function Portfolio() {
  const [active, setActive] = useState<FilterKey>("all");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const visible = properties.filter((p) => !filterMap[active] || p.filter === filterMap[active]);

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
            Across the UK we hold residential blocks, terraced freeholds, mixed-use parades and selected commercial. Each asset is hand-picked, hands-on managed, and held for the long term.
          </AnimateIn>
        </div>

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
        <AnimateIn stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((p, i) => {
            const isLastAlone = i === visible.length - 1 && visible.length % 3 === 1;
            return (
              <article
                key={p.id}
                onMouseEnter={() => setHoveredId(p.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={cn(
                  "bg-paper border border-rule flex flex-col transition-all duration-300 ease-out hover:-translate-y-[2px] hover:shadow-[0_12px_32px_-16px_rgba(23,22,18,0.18)]",
                  isLastAlone && "sm:col-span-2 lg:col-span-3",
                  hoveredId !== null && hoveredId !== p.id && "blur-[2px] scale-[0.98] opacity-80"
                )}
              >
                <div
                  className={cn(
                    "relative overflow-hidden prop-img-bg",
                    isLastAlone ? "aspect-[21/9]" : "aspect-[4/3]"
                  )}
                >
                  <Image
                    src={p.img} alt={p.imgAlt} fill
                    className="object-cover [filter:saturate(0.9)_contrast(1.02)]"
                    sizes="(max-width:640px) 100vw, (max-width:1080px) 50vw, 33vw"
                  />
                  <span className="absolute top-[14px] left-[14px] font-mono text-[10px] tracking-[0.14em] text-muted bg-paper/70 px-[9px] py-[5px] border border-rule rounded-sm">
                    {p.id} / 42
                  </span>
                  <span className={cn(
                    "absolute top-[14px] right-[14px] font-mono text-[9.5px] tracking-[0.14em] uppercase text-paper px-[10px] py-[5px] rounded-full whitespace-nowrap",
                    p.tagAccent ? "bg-accent" : "bg-ink"
                  )}>
                    {p.tag}
                  </span>
                </div>
                <div className="p-[22px_24px_24px]">
                  <div className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-muted mb-2 flex justify-between">
                    <span>{p.location}</span><span>{p.type}</span>
                  </div>
                  <h4 className="font-serif font-normal text-[26px] leading-[1.05] tracking-[-0.01em] m-0 mb-[6px]">
                    {p.title}
                  </h4>
                  <p className="text-[13.5px] text-ink-2 leading-[1.5] mb-[18px] min-h-[42px]">{p.desc}</p>
                  <div className="flex justify-between border-t border-rule-soft pt-[14px]">
                    {p.stats.map(({ l, v }) => (
                      <div key={l}>
                        <span className="block font-mono text-[9px] tracking-[0.14em] uppercase text-muted">{l}</span>
                        <b className="font-serif font-normal text-[18px] tracking-[-0.01em] mt-[2px] block">{v}</b>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </AnimateIn>

        <div className="flex justify-between items-center mt-10 pt-7 border-t border-rule">
          <span className="text-[13.5px] text-muted">Showing {visible.length} of 42 holdings across 14 UK markets.</span>
          <Button variant="ghost" asChild>
            <a href="#">View all holdings <ArrowIcon /></a>
          </Button>
        </div>
      </div>
    </section>
  );
}
