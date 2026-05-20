const items = [
  { tag: "NEW", text: "12-flat redevelopment, NW London — Q2 2026" },
  { tag: "EXIT", text: "Mixed-use parade, Birmingham — 18.4% IRR" },
  { tag: "LIVE", text: "66-bedroom HMO portfolio — Manchester corridor" },
  { tag: "RAISE", text: "Crestbourne Yield Fund III — Open to QIs" },
];

export default function Ticker() {
  const doubled = [...items, ...items];
  return (
    <div className="bg-ink text-paper font-mono text-[11px] tracking-[0.14em] uppercase py-[10px] overflow-hidden whitespace-nowrap" aria-hidden="true">
      <div className="inline-block animate-scroll">
        {doubled.map((item, i) => (
          <span key={i} className="mx-7 opacity-85">
            <b className="font-medium text-gold-warm mr-2">{item.tag}</b>
            {item.text}
          </span>
        ))}
      </div>
    </div>
  );
}
