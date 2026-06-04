import AnimateIn from "@/components/AnimateIn";

const partners = [
  "Knight & Bell",
  "Allsop Partners",
  "Lambert Smith",
  "Savills Capital",
  "JLL Residential",
  "Cushman Asset",
];

export default function Partners() {
  return (
    <AnimateIn className="border-t border-b border-rule py-[22px] bg-bg-2">
      <div className="wrap flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-11 sm:flex-wrap sm:justify-between">
        <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted whitespace-nowrap">
          Transacting with
        </span>
        <div className="flex gap-x-6 gap-y-3 sm:gap-11 items-center flex-wrap">
          {partners.map((p) => (
            <span key={p} className="font-serif italic text-[16px] sm:text-[20px] text-ink-2 opacity-70">
              {p}
            </span>
          ))}
        </div>
      </div>
    </AnimateIn>
  );
}
