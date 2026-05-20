import Image from "next/image";
import { cn } from "@/lib/utils";

const cells = [
  { img: "https://res.cloudinary.com/dmns9ystn/image/upload/v1750421155/spire_10_hx3pfn.png", alt: "Spire Portfolio — three-bedroom houses, Chesterfield", num: "01 / 14", loc: "Chesterfield · E. Midlands", title: <>Spire Portfolio,<br /><em>68 homes.</em></>, span: "col-span-7 row-span-4" },
  { img: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754229584/TBR_003_l9b8s3.jpg", alt: "Tower Bridge Quarter — South Bank commercial", num: "02", loc: "South Bank · SE1", title: <>Tower Bridge <em>Quarter.</em></>, span: "col-span-5 row-span-2" },
  { img: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753954163/11_qsbhoy.jpg", alt: "Newlands Croft — Bromley SE20", num: "03", loc: "Bromley · SE20", title: <>Newlands Croft, <em>twelve flats.</em></>, span: "col-span-5 row-span-2" },
  { img: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753727916/8.Barry-31RZD_v61kgp.jpg", alt: "Barry Retail Parade — Holton Road", num: "04", loc: "Barry · CF63", title: <>Barry Retail <em>Parade.</em></>, span: "col-span-4 row-span-3" },
  { img: "https://res.cloudinary.com/dmns9ystn/image/upload/v1750421152/Screenshot_2025-06-06_at_18.14.52_f7b7ve.png", alt: "Northampton Portfolio — Baker Street terraces", num: "05", loc: "Northampton · NN1", title: <>Northampton <em>terraces.</em></>, span: "col-span-4 row-span-3" },
  { img: "https://res.cloudinary.com/dmns9ystn/image/upload/v1751890809/portfolio_by_abby__image36_qx5h2n.png", alt: "Cheltenham Parade — retail and office", num: "06", loc: "Cheltenham · GL50", title: <>Cheltenham <em>Parade.</em></>, span: "col-span-4 row-span-3" },
  { img: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754056353/0_sqbh8z.jpg", alt: "London residential portfolio — Greater London", num: "07", loc: "Greater London", title: <>London portfolio, <em>ten freeholds.</em></>, span: "col-span-6 row-span-3" },
  { img: "https://res.cloudinary.com/dmns9ystn/image/upload/v1753972570/48_worsley_road_sJHUDn_mr9hib.jpg", alt: "North West portfolio — 48 Worsley Road, Manchester", num: "08", loc: "Manchester · M28", title: <>Worsley Road, <em>Manchester.</em></>, span: "col-span-6 row-span-3" },
];

export default function Gallery() {
  return (
    <section id="lens" className="py-24">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-[60px] items-end mb-14">
          <div>
            <div className="font-mono text-[11px] tracking-widest2 uppercase text-muted flex items-center">
              <span className="inline-block w-[6px] h-[6px] rounded-full bg-accent mr-[10px] translate-y-[1px]" />
              Through the lens
            </div>
            <h2 className="font-serif font-normal text-[clamp(48px,5.5vw,80px)] leading-[0.98] tracking-[-0.02em] mt-4">
              The portfolio,<br /><em className="italic text-accent">in fragments.</em>
            </h2>
          </div>
          <p className="text-[17px] leading-[1.6] text-ink-2 max-w-[50ch] pb-[6px]">
            Interiors, facades, neighbourhoods. A working sketchbook of the assets we hold and the streets they sit on — updated as our team documents new acquisitions and completed repositions.
          </p>
        </div>

        {/* Asymmetric masonry grid — desktop only, stack on mobile */}
        <div className="hidden lg:grid grid-cols-12 gap-[18px]" style={{ gridAutoRows: "120px" }}>
          {cells.map((c) => (
            <figure
              key={c.num}
              className={cn("relative bg-bg-2 overflow-hidden border border-rule m-0", c.span)}
            >
              <Image src={c.img} alt={c.alt} fill className="object-cover [filter:saturate(0.92)_contrast(1.03)]" sizes="50vw" />
              <div className="absolute inset-0 gallery-cell-overlay pointer-events-none z-[1]" />
              <span className="absolute top-[14px] left-[14px] font-mono text-[9.5px] tracking-[0.14em] uppercase text-white bg-black/40 px-[9px] py-[5px] rounded-sm backdrop-blur-sm pointer-events-none z-[2]">
                {c.num}
              </span>
              <figcaption className="absolute left-[14px] bottom-3 right-[14px] flex justify-between items-end gap-3 pointer-events-none z-[2]">
                <span className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-white bg-black/55 px-[9px] py-[5px] rounded-sm backdrop-blur-sm whitespace-nowrap">
                  {c.loc}
                </span>
                <span className="font-serif italic text-[22px] leading-[1.05] text-white text-right [text-shadow:0_2px_16px_rgba(0,0,0,0.5)]">
                  {c.title}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Mobile: simple 2-col grid */}
        <div className="grid grid-cols-2 gap-[14px] lg:hidden">
          {cells.map((c) => (
            <figure key={c.num} className="relative aspect-[4/3] bg-bg-2 overflow-hidden border border-rule m-0">
              <Image src={c.img} alt={c.alt} fill className="object-cover [filter:saturate(0.92)_contrast(1.03)]" sizes="50vw" />
              <div className="absolute inset-0 gallery-cell-overlay pointer-events-none" />
              <figcaption className="absolute left-2 bottom-2 right-2 pointer-events-none">
                <span className="font-mono text-[8px] tracking-[0.1em] uppercase text-white bg-black/55 px-2 py-1 rounded-sm">
                  {c.loc}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
