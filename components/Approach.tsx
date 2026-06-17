import Image from "next/image";
import AnimateIn from "@/components/AnimateIn";

const pillars = [
  {
    num: "i.",
    title: <>Buy <em className="italic text-gold-warm">below replacement cost.</em></>,
    desc: "We identify undervalued assets — usually off-market — where the gap between current rents and stabilised potential is material, and where capex requirements are well-understood.",
    tags: ["Off-market", "Sub-replacement", "Mispriced"],
  },
  {
    num: "ii.",
    title: <>Manage in-house, <em className="italic text-gold-warm">hands on.</em></>,
    desc: "Every Crestbourne and FasthomesUK asset is operated by our own team. Leasing, maintenance, capex, compliance — no outsourcing. It's slower to scale, but it's the source of our returns.",
    tags: ["In-house", "Vertically integrated", "Operator-led"],
  },
  {
    num: "iii.",
    title: <>Hold for the <em className="italic text-gold-warm">long horizon.</em></>,
    desc: "Our average hold is nine years. We sell only when the market materially overpays — otherwise the income compounds quietly, the equity de-risks, and the next acquisition gets funded internally.",
    tags: ["Patient capital", "Income-first", "Self-funded"],
  },
];

export default function Approach() {
  return (
    <section id="approach" className="relative py-24 overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1512359953714-f0c9a632ab85?q=80&w=1390&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />
      <div className="absolute inset-0 bg-ink/85" />

      <div className="wrap relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-[60px] items-end mb-14">
          <AnimateIn>
            <div className="font-mono text-[11px] tracking-widest2 uppercase text-white/60 flex items-center">
              <span className="inline-block w-[6px] h-[6px] rounded-full bg-gold-warm mr-[10px] translate-y-[1px]" />
              Our Approach
            </div>
            <h2 className="font-serif font-normal text-[clamp(48px,5.5vw,80px)] leading-[0.98] tracking-[-0.02em] mt-4 text-white">
              Three principles,<br />held <em className="italic text-gold-warm">quietly.</em>
            </h2>
          </AnimateIn>
          <AnimateIn as="p" delay={150} className="text-[17px] leading-[1.6] text-white/80 max-w-[50ch] pb-[6px]">
            We don&apos;t chase trends, leverage to the limit, or scale at the expense of returns. The Crestbourne and FasthomesUK playbook is unfashionably patient - and has compounded steadily for 28 years.
          </AnimateIn>
        </div>

        <AnimateIn stagger className="grid grid-cols-1 lg:grid-cols-3 gap-7">
          {pillars.map((p) => (
            <div key={p.num} className="bg-ink/80 border border-white/15 backdrop-blur-md p-[36px_32px_32px] flex flex-col min-h-[340px]">
              <span className="font-serif italic text-[48px] text-gold-warm leading-none tracking-[-0.02em]">{p.num}</span>
              <h4 className="font-serif font-normal text-[30px] leading-[1.1] tracking-[-0.01em] mt-6 mb-[14px] text-white">{p.title}</h4>
              <p className="text-[14.5px] text-white/80 leading-[1.6] mb-6 flex-1">{p.desc}</p>
              <div className="flex flex-wrap gap-2 mt-auto border-t border-white/15 pt-[18px]">
                {p.tags.map((t) => (
                  <span key={t} className="font-mono text-[10px] tracking-[0.1em] uppercase text-white/60 bg-white/10 px-[10px] py-[5px] rounded-full">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </AnimateIn>
      </div>
    </section>
  );
}
