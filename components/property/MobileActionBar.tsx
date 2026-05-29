"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowIcon } from "@/components/icons";

export default function MobileActionBar({
  name,
  ref: refCode,
  statLine,
}: {
  name: string;
  ref?: string;
  statLine: string;
}) {
  const [show, setShow] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const io = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* Invisible sentinel at the bottom of the hero — bar appears when this scrolls off */}
      <div ref={sentinelRef} className="h-px" />

      <div
        className={`
          fixed left-0 right-0 bottom-0 z-[60]
          bg-paper border-t border-rule
          px-5 pb-[calc(11px+env(safe-area-inset-bottom,0px))] pt-[11px]
          flex items-center justify-between gap-[14px]
          shadow-[0_-6px_24px_rgba(23,22,18,0.10)]
          transition-transform duration-[350ms] ease-[cubic-bezier(.16,1,.3,1)]
          lg:hidden
          ${show ? "translate-y-0" : "translate-y-[120%]"}
        `}
        aria-hidden={!show}
      >
        <div>
          <div className="font-serif text-[18px] text-ink leading-[1.1]">{name}</div>
          <div className="font-mono text-[9px] tracking-[0.12em] uppercase text-muted">
            {refCode ? `Ref ${refCode} · ` : ""}{statLine}
          </div>
        </div>
        <a
          href="#register"
          className="inline-flex items-center gap-2 px-4 py-[9px] bg-ink text-paper border border-ink rounded-full font-mono text-[11px] tracking-[0.08em] uppercase font-medium hover:bg-transparent hover:text-ink transition-colors whitespace-nowrap flex-shrink-0"
        >
          Enquire <ArrowIcon className="w-3 h-3" />
        </a>
      </div>
    </>
  );
}
