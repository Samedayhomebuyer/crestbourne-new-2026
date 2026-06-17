"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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
    <header className="bg-bg sticky top-0 z-50 backdrop-saturate-[120%]">
      {/* ── Main bar ── */}
      <div className="wrap flex items-center justify-between h-[72px]">
        {/* Crestbourne mark */}
        <Link href="/" className="flex items-center gap-[14px]" onClick={goHome}>
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-ink bg-paper grid place-items-center flex-shrink-0 before:content-[''] before:absolute before:inset-1 before:rounded-full before:border before:border-ink before:opacity-25">
            <span className="font-serif italic text-[18px] sm:text-[20px] leading-none text-ink translate-y-[-1px]">C</span>
          </div>
          <div>
            <div className="font-serif text-[20px] sm:text-[24px] tracking-[-0.01em]">Crestbourne</div>
            <span className="hidden sm:block font-mono text-[9px] tracking-widest3 text-muted uppercase mt-[-2px]">Est. 1997 · London</span>
          </div>
        </Link>

        {/* Endorsed group cluster — desktop only (md+) */}
        <div className="hidden md:flex items-center gap-[14px]">
          <span className="w-px h-[38px] bg-rule flex-shrink-0" />
          <div className="flex flex-col gap-[5px]">
            {/* <span className="font-mono text-[9px] tracking-widest3 text-muted uppercase">The Group</span> */}
            <div className="flex items-center">
              <span className="inline-flex items-center gap-[9px]">
                <svg viewBox="0 0 24 24" width={17} height={17} className="flex-shrink-0 text-ink">
                  <path d="M5 11 L12 5 L19 11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6.6 10 V19 H17.4 V10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M13.1 10.7 L9.6 15.5 H11.7 L11 18.6 L14.6 13.7 H12.3 Z" fill="#8a6d3a" stroke="#8a6d3a" strokeWidth="0.5" strokeLinejoin="round" />
                </svg>
                <span className="font-serif text-[19px] tracking-[-0.01em] text-ink leading-none whitespace-nowrap">
                  Fasthomes<span className="text-gold">UK</span>
                </span>
              </span>
              <span className="w-[3px] h-[3px] rounded-full bg-rule mx-4 flex-shrink-0" />
              <a
                href="https://www.samedayhomebuyer.co.uk/"
                target="_blank"
                rel="noopener noreferrer"
                title="Visit Same Day Home Buyer — opens in a new tab"
                className="inline-flex items-center gap-[6px] transition-opacity hover:opacity-75 group"
              >
                <Image
                  src="/samedayhomebuyer-logo.png"
                  alt="Same Day Home Buyer"
                  width={472}
                  height={162}
                  priority
                  className="h-[20px] w-auto grayscale opacity-70"
                />
                <svg
                  width={11} height={11} viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                  className="text-gold opacity-70 transition-[transform,opacity] group-hover:opacity-100 group-hover:translate-x-[1px] group-hover:translate-y-[-1px]"
                >
                  <path d="M7 17 L17 7 M9 7 h8 v8" />
                </svg>
              </a>
            </div>
          </div>
        </div>

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

      {/* ── Group bar — mobile only (below md) ── */}
      <div className="md:hidden border-t border-rule-soft px-6 h-[42px] flex items-center gap-3">
        <span className="font-mono text-[9px] tracking-widest3 text-muted uppercase">The Group</span>
        <span className="w-px h-[22px] bg-rule flex-shrink-0" />
        <span className="inline-flex items-center gap-[7px]">
          <svg viewBox="0 0 24 24" width={15} height={15} className="flex-shrink-0 text-ink">
            <path d="M5 11 L12 5 L19 11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6.6 10 V19 H17.4 V10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13.1 10.7 L9.6 15.5 H11.7 L11 18.6 L14.6 13.7 H12.3 Z" fill="#8a6d3a" stroke="#8a6d3a" strokeWidth="0.5" strokeLinejoin="round" />
          </svg>
          <span className="font-serif text-[16px] tracking-[-0.01em] text-ink leading-none whitespace-nowrap">
            Fasthomes<span className="text-gold">UK</span>
          </span>
        </span>
        <span className="w-[3px] h-[3px] rounded-full bg-rule flex-shrink-0 mx-1" />
        <a
          href="https://www.samedayhomebuyer.co.uk/"
          target="_blank"
          rel="noopener noreferrer"
          title="Visit Same Day Home Buyer — opens in a new tab"
          className="inline-flex items-center gap-[5px] transition-opacity hover:opacity-75 group"
        >
          <Image
            src="/samedayhomebuyer-logo.png"
            alt="Same Day Home Buyer"
            width={472}
            height={162}
            className="h-[18px] w-auto grayscale opacity-70"
          />
          <svg
            width={10} height={10} viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
            className="text-gold opacity-70 group-hover:opacity-100 transition-[transform,opacity] group-hover:translate-x-[1px] group-hover:translate-y-[-1px]"
          >
            <path d="M7 17 L17 7 M9 7 h8 v8" />
          </svg>
        </a>
      </div>

      {/* ── Border below entire header ── */}
      <div className="border-b border-rule" />

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
