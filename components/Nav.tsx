"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const [active, setActive] = useState("#portfolio");
  const [menuOpen, setMenuOpen] = useState(false);

  const goHome = (e: React.MouseEvent) => {
    setMenuOpen(false);
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToHash = (hash: string) => (e: React.MouseEvent) => {
    setMenuOpen(false);
    if (pathname === "/") {
      e.preventDefault();
      const el = document.querySelector(hash);
      if (el) {
        window.scrollTo({ top: (el as HTMLElement).offsetTop - 72, behavior: "smooth" });
      }
    }
  };

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
        <Link href="/" className="flex items-center gap-2 sm:gap-[14px]" onClick={goHome}>
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-ink bg-paper grid place-items-center flex-shrink-0 before:content-[''] before:absolute before:inset-1 before:rounded-full before:border before:border-ink before:opacity-25">
            <span className="font-serif italic text-[18px] sm:text-[20px] leading-none text-ink translate-y-[-1px]">C</span>
          </div>
          <div>
            <div className="font-serif text-[20px] sm:text-[24px] tracking-[-0.01em]">Crestbourne</div>
            <span className="hidden sm:block font-mono text-[9px] tracking-widest3 text-muted uppercase mt-[-2px]">Est. 1997 · London</span>
          </div>
          <span className="block text-rule font-mono text-[16px] select-none mx-2 sm:mx-3">|</span>
          <span className="flex items-center gap-[10px]">
            <svg
              viewBox="0 0 40 40"
              className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 rounded-[11px] shadow-sm ring-1 ring-black/5"
            >
              <defs>
                <linearGradient id="fhNav" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#f59e0b" />
                  <stop offset="0.5" stopColor="#fb6f4d" />
                  <stop offset="1" stopColor="#e11d6b" />
                </linearGradient>
              </defs>
              <rect width="40" height="40" rx="11" fill="url(#fhNav)" />
              <path
                d="M11 19.5 L20 11.5 L29 19.5"
                fill="none"
                stroke="#fff"
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.5 18.6 V29 H26.5 V18.6"
                fill="none"
                stroke="#fff"
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21.4 19 L16.8 25 H19.6 L18.2 29.5 L23.4 23 H20.4 Z"
                fill="#fde047"
                stroke="#fde047"
                strokeWidth={0.6}
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-serif text-[18px] sm:text-[20px] tracking-[-0.01em] text-ink leading-none whitespace-nowrap">
              Fasthomes<span className="text-[#e11d6b]">UK</span>
            </span>
          </span>
        </Link>

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
            <Link href="/#contact" onClick={goToHash("#contact")}>
              Speak with us <ArrowIcon />
            </Link>
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
                <Link href="/#contact" onClick={goToHash("#contact")}>
                  Speak with us <ArrowIcon />
                </Link>
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
