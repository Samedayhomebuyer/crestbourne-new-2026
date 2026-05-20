import Image from "next/image";
import { ArrowIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const acquisitions = {
  feature: {
    img: "https://res.cloudinary.com/dmns9ystn/image/upload/v1750421155/spire_10_hx3pfn.png",
    imgAlt: "Spire Portfolio — three-bedroom houses, Chesterfield & Mansfield",
    badge: "Just acquired", date: "May 2026",
    meta: ["Chesterfield & Mansfield", "Residential portfolio", "68 three-bed houses"],
    title: <>Spire Portfolio —<br />68 fully-let homes, <em className="italic text-gold-warm">built to hold.</em></>,
    desc: "68 fully-let three-bedroom freehold houses across Chesterfield and Mansfield, featuring a mix of traditional and non-traditional construction. Acquired off-market with 100% occupancy, excellent local amenities, and strong transport links. A cornerstone addition to our East Midlands book.",
    stats: [
      { label: "Units", value: "68" },
      { label: "Occupancy", value: "100%" },
      { label: "Tenure", value: "Freehold" },
      { label: "Target IRR", value: "13%" },
    ],
    ref: "CB-091",
  },
  cards: [
    {
      img: "https://res.cloudinary.com/dmns9ystn/image/upload/v1750421152/Screenshot_2025-06-06_at_18.14.52_f7b7ve.png",
      imgAlt: "Northampton terraced houses — Baker Street portfolio",
      badge: "Acquired", date: "Mar 2026",
      meta: ["Northampton · NN1", "HMO portfolio"],
      title: <>Northampton —<br />sixteen <em className="italic text-gold-warm">terraced freeholds.</em></>,
      desc: "A freehold collection of 16 terraced houses with 66 bedrooms across Baker Street, Freehold Street, and St Paul's Road — all within 1.5km of the station. Strong rental coverage and clear value-add through licensing uplift.",
      stats: [
        { label: "Houses", value: "16" },
        { label: "Beds", value: "66" },
        { label: "Yield", value: "8.7%" },
      ],
    },
    {
      img: "https://res.cloudinary.com/dmns9ystn/image/upload/v1754229584/TBR_003_l9b8s3.jpg",
      imgAlt: "Tower Bridge Quarter — South Bank mixed-use commercial",
      badge: "Acquired", date: "Jan 2026",
      meta: ["South Bank · SE1", "Mixed-use commercial"],
      title: <>Tower Bridge <em className="italic text-gold-warm">Quarter.</em></>,
      desc: "Nine buildings totalling 39,582 sq ft in prime South Bank, London. Fully let to Brewdog, Foxtons, Chestertons and others. £899,875 annual income, freehold, with excellent transport links to Tower Bridge and The Shard.",
      stats: [
        { label: "Buildings", value: "9" },
        { label: "Sq ft", value: "39.5k" },
        { label: "Income p.a.", value: "£900k" },
      ],
    },
  ],
};

function StatGrid({ stats, cols = 3 }: { stats: { label: string; value: string }[]; cols?: number }) {
  return (
    <div
      className="grid border-t border-[#2b2823] pt-[18px] gap-[14px]"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }}
    >
      {stats.map((s) => (
        <div key={s.label}>
          <span className="block font-mono text-[9px] tracking-[0.14em] uppercase text-[#8c8267] mb-1">{s.label}</span>
          <b className="font-serif font-normal text-[22px] tracking-[-0.01em] text-paper">{s.value}</b>
        </div>
      ))}
    </div>
  );
}

function AcqCard({
  card,
  feature = false,
}: {
  card: typeof acquisitions.feature;
  feature?: boolean;
}) {
  return (
    <article className={cn("bg-[#1f1d18] border border-[#2b2823] flex flex-col overflow-hidden", feature && "")}>
      <div
        className={cn(
          "relative bg-[#26241e] overflow-hidden acq-img-bg",
          feature ? "aspect-[16/11]" : "aspect-[16/10]"
        )}
      >
        <Image
          src={card.img}
          alt={card.imgAlt}
          fill
          className="object-cover [filter:saturate(0.85)_contrast(1.05)_brightness(0.95)]"
          sizes={feature ? "(max-width:1080px) 100vw, 55vw" : "(max-width:1080px) 100vw, 45vw"}
        />
        <span className="absolute top-[18px] left-[18px] bg-gold-warm text-[#1c1a15] px-3 py-[6px] rounded-full font-mono text-[10px] tracking-[0.14em] uppercase font-medium">
          {card.badge}
        </span>
        <span className="absolute top-[18px] right-[18px] font-mono text-[10px] tracking-[0.14em] text-[#bdb6a2] uppercase">
          {card.date}
        </span>
      </div>
      <div className={cn("flex flex-col flex-1", feature ? "p-[36px_40px_38px]" : "p-[28px_30px_30px]")}>
        <div className="flex items-center flex-wrap gap-0 font-mono text-[10px] tracking-[0.14em] uppercase text-[#8c8267] mb-[14px]">
          {card.meta.map((m, i) => (
            <span key={i}>{i > 0 && <span className="opacity-40"> · </span>}{m}</span>
          ))}
        </div>
        <h3
          className={cn(
            "font-serif font-normal leading-[1.05] tracking-[-0.01em] mb-3 text-paper",
            feature ? "text-[48px] max-sm:text-[36px]" : "text-[30px]"
          )}
        >
          {card.title}
        </h3>
        <p className={cn("leading-[1.6] text-[#bdb6a2] mb-6 flex-1", feature ? "text-[16px] max-w-[52ch]" : "text-[14px]")}>
          {card.desc}
        </p>
        <StatGrid stats={card.stats} cols={feature ? 4 : 3} />
        {feature && "ref" in card && (
          <div className="flex justify-between items-center mt-[18px]">
            <a href="#" className="inline-flex items-center gap-[10px] font-mono text-[11px] tracking-[0.14em] uppercase text-gold-warm pb-1 border-b border-[#443d27]">
              Deal sheet <ArrowIcon className="w-[14px] h-[14px]" />
            </a>
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#8c8267]">Ref: {card.ref}</span>
          </div>
        )}
      </div>
    </article>
  );
}

export default function RecentlyAcquired() {
  return (
    <section id="acquired" className="py-24 bg-ink text-paper">
      <div className="wrap">
        {/* Section head */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-[60px] items-end mb-14">
          <div>
            <div className="font-mono text-[11px] tracking-widest2 uppercase text-[#c5bda1] flex items-center">
              <span className="inline-block w-[6px] h-[6px] rounded-full bg-gold-warm mr-[10px] translate-y-[1px]" />
              Recently Acquired
            </div>
            <h2 className="font-serif font-normal text-[clamp(48px,5.5vw,80px)] leading-[0.98] tracking-[-0.02em] mt-4 text-paper">
              The latest<br />additions to the <em className="italic text-gold-warm">book.</em>
            </h2>
          </div>
          <p className="text-[17px] leading-[1.6] text-[#bdb6a2] max-w-[50ch] pb-[6px]">
            Three transactions completed in the last six months. Each sits within our core thesis:
            undervalued income-producing assets with a clear path to repositioning.{" "}
            <a href="#" className="border-b border-[#bdb6a2] pb-[1px]">See the full deal log →</a>
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 mb-6">
          <AcqCard card={acquisitions.feature} feature />
          <div className="flex flex-col gap-6">
            {acquisitions.cards.map((c, i) => (
              <AcqCard key={i} card={c as typeof acquisitions.feature} />
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-[#2b2823]">
          <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#8c8267]">
            Showing 3 of 11 completed in last 12 months
          </span>
          <a href="#" className="inline-flex items-center gap-[10px] font-mono text-[11px] tracking-[0.14em] uppercase text-gold-warm pb-1 border-b border-[#443d27]">
            View deal log <ArrowIcon className="w-[14px] h-[14px]" />
          </a>
        </div>
      </div>
    </section>
  );
}
