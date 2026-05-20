const links = {
  Portfolio: [
    { label: "Recently Acquired", href: "#acquired" },
    { label: "All Holdings", href: "#portfolio" },
    { label: "Deal Log", href: "#" },
    { label: "Realised Exits", href: "#" },
  ],
  "The Group": [
    { label: "Approach", href: "#approach" },
    { label: "Group Companies", href: "#group" },
    { label: "Principals", href: "#" },
    { label: "Press", href: "#" },
  ],
  Connect: [
    { label: "Contact", href: "#contact" },
    { label: "Submit a property", href: "#" },
    { label: "Investor login", href: "#" },
    { label: "Quarterly letter", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-ink text-[#b8b09a] pt-16 pb-6">
      <div className="wrap">
        <div className="grid grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12 pb-12 border-b border-[#2b2823]">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <a className="flex items-center gap-[14px]" href="#">
              <div className="relative w-9 h-9 rounded-full border border-[#3a3528] bg-[#1f1d18] grid place-items-center flex-shrink-0 before:content-[''] before:absolute before:inset-1 before:rounded-full before:border before:border-[#3a3528] before:opacity-25">
                <span className="font-serif italic text-[20px] leading-none text-gold-warm translate-y-[-1px]">C</span>
              </div>
              <div>
                <div className="font-serif text-[24px] tracking-[-0.01em] text-[#f1ede0]">Crestbourne</div>
                <span className="block font-mono text-[9px] tracking-widest3 text-[#857c63] uppercase mt-[-2px]">Est. 1997 · London</span>
              </div>
            </a>
            <p className="text-[14px] leading-[1.6] max-w-[38ch] text-[#9d957f] mt-[14px]">
              Property investment and asset management for the long horizon. Family-led, principal-aligned, privately held since 1997.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading}>
              <h5 className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-[#857c63] m-0 mb-[18px] font-medium">
                {heading}
              </h5>
              <ul className="list-none m-0 p-0 flex flex-col gap-[10px]">
                {items.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="text-[#d8d2bf] text-sm hover:text-white transition-colors">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-6 font-mono text-[10px] tracking-[0.14em] uppercase text-[#6e6753]">
          <span>© 2026 The Crestbourne Group Ltd · Company No. 16635233</span>
          <span className="flex gap-2">
            {["Privacy", "Terms", "Regulatory"].map((l, i) => (
              <span key={l} className="flex items-center gap-2">
                {i > 0 && <span>·</span>}
                <a href="#" className="text-[#9d957f] hover:text-[#f1ede0] transition-colors">{l}</a>
              </span>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}
