const stats = [
  { label: "Founded", big: <><em className="italic text-accent">1997</em></>, sub: "Family-led, principal-aligned since inception." },
  { label: "Portfolio GDV", big: <>£420<span className="text-[38px]">m</span></>, sub: "Across 42 assets in 14 UK markets." },
  { label: "Average IRR", big: <>14.6<span className="text-[38px]">%</span></>, sub: "Net of fees, across realised exits since 2009." },
  { label: "Avg. hold", big: <>9.2<span className="text-[38px]">y</span></>, sub: "Patient capital is our principal edge." },
];

export default function TrackRecord() {
  return (
    <section id="record" className="py-24 bg-bg-2">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-[60px] items-end mb-14">
          <div>
            <div className="font-mono text-[11px] tracking-widest2 uppercase text-muted flex items-center">
              <span className="inline-block w-[6px] h-[6px] rounded-full bg-accent mr-[10px] translate-y-[1px]" />
              The Numbers
            </div>
            <h2 className="font-serif font-normal text-[clamp(48px,5.5vw,80px)] leading-[0.98] tracking-[-0.02em] mt-4">
              Twenty-nine years.<br />One <em className="italic text-accent">thesis.</em>
            </h2>
          </div>
          <p className="text-[17px] leading-[1.6] text-ink-2 max-w-[50ch] pb-[6px]">
            We have compounded patient capital through three property cycles by holding what we buy, managing what we hold, and selling only when the market overpays.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-b border-rule">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`p-10 border-rule ${i < stats.length - 1 ? "border-r" : ""} max-lg:[&:nth-child(2)]:border-r-0 max-lg:[&:nth-child(1)]:border-b max-lg:[&:nth-child(2)]:border-b max-sm:border-r-0 max-sm:border-b last:border-b-0`}
            >
              <span className="block font-mono text-[11px] tracking-[0.14em] uppercase text-muted mb-[14px]">{s.label}</span>
              <span className="block font-serif font-normal text-[72px] max-sm:text-[56px] leading-[0.95] tracking-[-0.025em] mb-2">
                {s.big}
              </span>
              <span className="block text-[13px] text-ink-2 leading-[1.5] max-w-[24ch]">{s.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
