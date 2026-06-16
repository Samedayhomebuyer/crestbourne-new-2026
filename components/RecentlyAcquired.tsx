import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { MapPin } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import type { PropertyWithImages } from "@/lib/data/properties";

function formatDate(d: string | null) {
  if (!d) return null;
  return new Date(d).toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

function PropertyCard({ card }: { card: PropertyWithImages }) {
  const date = formatDate(card.acquisitionDate);

  return (
    <Link href={`/properties/${card.slug}`} className="block w-full h-full relative hover:z-10">
      <CardContainer containerClassName="py-20 w-full h-full" className="h-full w-full" rotateSensitivity={20}>
        <CardBody className="relative group/card w-full h-full flex flex-col rounded-xl border border-[#2b2823] bg-[#1f1d18] p-7 dark:border-[#2b2823]">

          {/* Tag + date row */}
          <CardItem translateZ={18} className="w-full flex items-center justify-between mb-4 min-h-[26px]">
            {card.tag ? (
              <span className="px-3 py-[5px] rounded-full font-mono text-[10px] tracking-[0.14em] uppercase font-medium bg-gold-warm text-[#1c1a15]">
                {card.tag}
              </span>
            ) : (
              <span aria-hidden="true" />
            )}
            {date ? (
              <span className="font-mono text-[10px] tracking-[0.14em] text-[#8c8267] uppercase">
                {date}
              </span>
            ) : (
              <span aria-hidden="true" />
            )}
          </CardItem>

          {/* Image — highest translateZ so it pops out most */}
          <CardItem translateZ={100} className="w-full shrink-0">
            <div className="relative w-full h-64 rounded-xl overflow-hidden bg-[#26241e] group-hover/card:shadow-xl">
              {card.coverImageUrl ? (
                <Image
                  src={card.coverImageUrl}
                  alt={card.coverImageAlt ?? card.title}
                  fill
                  className="object-cover [filter:saturate(0.85)_contrast(1.05)_brightness(0.95)]"
                  sizes="(max-width:640px) 100vw, (max-width:1280px) 50vw, 25vw"
                />
              ) : (
                <div className="w-full h-full bg-[#26241e]" />
              )}
            </div>
          </CardItem>

          {/* Location */}
          <CardItem translateZ={30} className="w-full mt-4 shrink-0">
            <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#8c8267] flex items-center gap-1.5 line-clamp-1">
              <MapPin className="h-3 w-3 shrink-0" strokeWidth={1.5} />
              {card.location.split("·")[0].trim()}
            </p>
          </CardItem>

          {/* Title */}
          <CardItem translateZ={36} className="w-full mt-2 shrink-0">
            <h3 className="font-serif font-normal text-[22px] leading-[1.1] tracking-[-0.01em] text-paper line-clamp-2 min-h-[calc(2*1.1*22px)]">
              {card.title}
            </h3>
          </CardItem>

          {/* Description — reserved height keeps cards aligned */}
          <CardItem translateZ={24} className="w-full mt-2 flex-1">
            <p className="text-[13px] leading-[1.6] text-[#bdb6a2] line-clamp-2 min-h-[calc(2*1.6*13px)]">
              {card.description ?? "\u00A0"}
            </p>
          </CardItem>

          {/* Units stat — pinned to bottom */}
          <CardItem translateZ={12} className="w-full mt-4 pt-3 border-t border-[#2b2823] shrink-0 min-h-[52px]">
            <span className="block font-mono text-[9px] tracking-[0.14em] uppercase text-[#8c8267] mb-0.5">
              Units
            </span>
            <span className="font-serif text-[18px] text-paper">{card.units ?? "—"}</span>
          </CardItem>

        </CardBody>
      </CardContainer>
    </Link>
  );
}

export default function RecentlyAcquired({ cards }: { cards: PropertyWithImages[] }) {
  if (cards.length === 0) return null;

  return (
    <section id="acquired" className="py-24 bg-ink text-paper">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-[60px] items-end mb-14 ">
          <AnimateIn>
            <div className="font-mono text-[11px] tracking-widest2 uppercase text-[#c5bda1] flex items-center">
              <span className="inline-block w-[6px] h-[6px] rounded-full bg-gold-warm mr-[10px] translate-y-[1px]" />
              Recently Acquired
            </div>
            <h2 className="font-serif font-normal text-[clamp(48px,5.5vw,80px)] leading-[0.98] tracking-[-0.02em] mt-4 text-paper">
              The latest<br />additions to the <em className="italic text-gold-warm">book.</em>
            </h2>
          </AnimateIn>
          <AnimateIn as="p" delay={150} className="text-[17px] leading-[1.6] text-[#bdb6a2] max-w-[50ch] pb-[6px]">
            The most recent transactions completed by the Crestbourne team and FasthomesUK — each sitting within our core thesis
            of undervalued income-producing assets with a clear path to repositioning.
          </AnimateIn>
        </div>
      </div>

      <AnimateIn stagger>
        <div className="mx-auto w-full max-w-[calc(100vw-48px)] px-8 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 items-stretch">
            {cards.map((card) => (
              <PropertyCard key={card.id} card={card} />
            ))}
          </div>
        </div>
      </AnimateIn>

      <div className="wrap flex justify-between items-center pt-8 border-t border-[#2b2823] mt-8">
          <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#8c8267]">
            Showing {cards.length} recently acquired
          </span>
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-[10px] font-mono text-[11px] tracking-[0.14em] uppercase text-gold-warm pb-1 border-b border-[#443d27]"
          >
          View all holdings <ArrowIcon className="w-[14px] h-[14px]" />
        </Link>
      </div>
    </section>
  );
}
