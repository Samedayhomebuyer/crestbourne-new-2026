import Image from "next/image";
import AnimateIn from "@/components/AnimateIn";
import type { ThesisPoint } from "@/lib/data/properties-static";

export default function PropertyThesis({
  points,
  coverImage,
  coverImageAlt,
}: {
  points: ThesisPoint[];
  coverImage: string;
  coverImageAlt: string;
}) {
  if (!points.length) return null;

  return (
    <section className="relative py-24 overflow-hidden text-[#f1ede0]">
      {/* Background */}
      <div className="absolute inset-0">
        <Image src={coverImage} alt={coverImageAlt} fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-[rgba(18,17,13,0.9)]" />
      </div>

      <div className="wrap relative z-[2]">
        {/* Head: 2-col */}
        <AnimateIn>
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-[60px] items-end pb-[46px] border-b border-[rgba(255,255,255,0.14)]">
            <div>
              <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-gold-warm flex items-center">
                <span className="inline-block w-[6px] h-[6px] rounded-full bg-gold-warm mr-[10px] translate-y-[1px]" />
                Investment thesis
              </div>
              <h2 className="font-serif font-normal text-[clamp(42px,5vw,76px)] leading-[0.98] tracking-[-0.02em] mt-4 mb-0 text-[#f1ede0]">
                Why Crestbourne <em className="italic text-gold-warm">acquired it.</em>
              </h2>
            </div>
            <p className="text-[16.5px] leading-[1.6] text-[#bdb6a2] max-w-[50ch] m-0 pb-1">
              Every Crestbourne acquisition is underpinned by a clear thesis.
              Three principles drove this transaction.
            </p>
          </div>
        </AnimateIn>

        {/* Editorial numbered list */}
        <AnimateIn stagger>
          <ol className="list-none m-0 p-0">
            {points.map((p, i) => (
              <li
                key={i}
                className={`grid gap-[30px] py-[40px] ${i < points.length - 1 ? "border-b border-[rgba(255,255,255,0.12)]" : ""}`}
                style={{ gridTemplateColumns: "96px 1fr" }}
              >
                <span className="font-serif italic text-[48px] text-gold-warm leading-none tracking-[-0.02em]">
                  {p.num}
                </span>
                <div>
                  <h4 className="font-serif font-normal text-[30px] leading-[1.08] tracking-[-0.01em] mb-3 text-[#f1ede0]">
                    {p.title} <em className="italic text-gold-warm">{p.italicWord}</em>
                  </h4>
                  <p className="text-[15px] leading-[1.62] text-[#bdb6a2] m-0 max-w-[62ch]">{p.desc}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] tracking-[0.1em] uppercase text-[#bdb6a2] border border-[rgba(255,255,255,0.2)] px-[11px] py-[5px] rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </AnimateIn>
      </div>
    </section>
  );
}
