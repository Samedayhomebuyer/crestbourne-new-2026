"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#acquired", label: "Recently Acquired" },
  { href: "#portfolio", label: "Portfolio" },
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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

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

        {/* CTA + hamburger */}
        <div className="flex items-center gap-[18px]">
          <Button asChild className="hidden sm:inline-flex">
            <a href="#contact" onClick={smoothScroll("#contact")}>
              Speak with us <ArrowIcon />
            </a>
          </Button>
          <button
            className="lg:hidden p-2 -mr-2 text-ink"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <nav className="lg:hidden border-t border-rule bg-bg">
          <ul className="list-none m-0 p-0">
            {navLinks.map(({ href, label }) => (
              <li key={href} className="border-b border-rule last:border-b-0">
                <a
                  href={href}
                  onClick={(e) => { smoothScroll(href)(e); setMenuOpen(false); }}
                  className={cn(
                    "block px-6 py-4 text-sm text-ink-2 hover:text-ink transition-colors",
                    active === href && "text-ink font-medium"
                  )}
                >
                  {label}
                </a>
              </li>
            ))}
            <li className="p-4">
              <Button asChild className="w-full">
                <a href="#contact" onClick={(e) => { smoothScroll("#contact")(e); setMenuOpen(false); }}>
                  Speak with us <ArrowIcon />
                </a>
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
