"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#portfolio", label: "Portfolio" },
  { href: "#acquired", label: "Recently Acquired" },
  { href: "#approach", label: "Approach" },
  { href: "#group", label: "The Group" },
  { href: "#contact", label: "Contact" },
];

function smoothScroll(id: string) {
  return (e: React.MouseEvent) => {
    const el = document.querySelector(id);
    if (el) {
      e.preventDefault();
      window.scrollTo({ top: (el as HTMLElement).offsetTop - 72, behavior: "smooth" });
    }
  };
}

export default function Nav() {
  const [active, setActive] = useState("#portfolio");

  useEffect(() => {
    const ids = navLinks.map((l) => l.href);
    const handler = () => {
      const scrollY = window.scrollY + 80;
      for (const id of [...ids].reverse()) {
        const el = document.querySelector(id);
        if (el && (el as HTMLElement).offsetTop <= scrollY) {
          setActive(id);
          return;
        }
      }
      setActive("#portfolio");
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header className="border-b border-rule bg-bg sticky top-0 z-50 backdrop-saturate-[120%]">
      <div className="wrap flex items-center justify-between h-[72px]">
        {/* Brand */}
        <a className="flex items-center gap-[14px]" href="#" onClick={smoothScroll("#")}>
          <div className="relative w-9 h-9 rounded-full border border-ink bg-paper grid place-items-center flex-shrink-0 before:content-[''] before:absolute before:inset-1 before:rounded-full before:border before:border-ink before:opacity-25">
            <span className="font-serif italic text-[20px] leading-none text-ink translate-y-[-1px]">C</span>
          </div>
          <div>
            <div className="font-serif text-[24px] tracking-[-0.01em]">Crestbourne</div>
            <span className="block font-mono text-[9px] tracking-widest3 text-muted uppercase mt-[-2px]">Est. 1997 · London</span>
          </div>
        </a>

        {/* Primary nav */}
        <nav className="hidden lg:block">
          <ul className="flex gap-[34px] list-none m-0 p-0 text-sm">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={smoothScroll(href)}
                  className={cn(
                    "relative py-[6px] text-ink-2 hover:text-ink transition-colors",
                    active === href &&
                      "text-ink after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[-2px] after:border-b after:border-ink"
                  )}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-[18px]">
          <Button asChild>
            <a href="#contact" onClick={smoothScroll("#contact")}>
              Speak with us <ArrowIcon />
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
