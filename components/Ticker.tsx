export type TickerItem = {
  id: string;
  tag: string;
  text: string;
};

type TickerProps = {
  items: TickerItem[];
};

export default function Ticker({ items }: TickerProps) {
  if (!items.length) return null;

  const doubled = [...items, ...items];
  return (
    <div className="bg-ink text-paper font-mono text-[11px] tracking-[0.14em] uppercase py-[10px] overflow-hidden whitespace-nowrap" aria-hidden="true">
      <div className="inline-block animate-scroll">
        {doubled.map((item, i) => (
          <span key={`${item.id}-${i}`} className="mx-7 opacity-85">
            <b className="font-medium text-gold-warm mr-2">{item.tag}</b>
            {item.text}
          </span>
        ))}
      </div>
    </div>
  );
}
