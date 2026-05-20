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
    <div className="border-t border-b border-rule py-[22px] bg-bg-2">
      <div className="wrap flex items-center gap-11 flex-wrap justify-between">
        <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted whitespace-nowrap">
          Working alongside
        </span>
        <div className="flex gap-11 items-center flex-wrap">
          {partners.map((p) => (
            <span key={p} className="font-serif italic text-[20px] text-ink-2 opacity-70">
              {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
