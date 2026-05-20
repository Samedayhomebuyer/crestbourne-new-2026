"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowIcon } from "@/components/icons";
import AnimateIn from "@/components/AnimateIn";
import { CanvasText } from "@/components/ui/canvas-text";
import { DraggableCardBody, DraggableCardContainer } from "@/components/ui/draggable-card";

function smoothScroll(id: string) {
  return (e: React.MouseEvent) => {
    const el = document.querySelector(id);
    if (el) {
      e.preventDefault();
      window.scrollTo({ top: (el as HTMLElement).offsetTop - 72, behavior: "smooth" });
    }
  };
}

export default function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (parallaxRef.current) {
          const y = Math.min(window.scrollY * 0.15, 110);
          parallaxRef.current.style.transform = `translateY(${y}px)`;
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="pt-16 pb-0 relative">
      {/* Headline + meta row */}
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-20 items-end mb-12">
          <AnimateIn>
            <div className="font-mono text-[11px] tracking-widest2 uppercase text-muted flex items-center">
              <span className="inline-block w-[6px] h-[6px] rounded-full bg-accent mr-[10px] translate-y-[1px]" />
              Property Investment &amp; Asset Management
            </div>
            <h1 className="font-serif font-normal text-[clamp(56px,8vw,124px)] leading-[0.95] tracking-[-0.02em] mt-6 text-ink">
              Quiet capital,<br />built for the<br />
              <em className="italic">
                <CanvasText
                  text="long horizon."
                  backgroundClassName="bg-[#2f4a36]"
                  colors={[
                    "rgba(47,74,54,1)",
                    "rgba(47,74,54,0.9)",
                    "rgba(74,111,80,0.8)",
                    "rgba(100,148,107,0.7)",
                    "rgba(74,111,80,0.6)",
                    "rgba(47,74,54,0.5)",
                    "rgba(100,148,107,0.4)",
                    "rgba(47,74,54,0.3)",
                    "rgba(74,111,80,0.2)",
                    "rgba(47,74,54,0.1)",
                  ]}
                  lineGap={4}
                  animationDuration={20}
                />
              </em>
            </h1>
          </AnimateIn>
          <AnimateIn delay={150}>
            <p className="text-[18px] leading-[1.55] text-ink-2 max-w-[46ch] mb-0">
              A privately-held London investor in UK property since 1997. We acquire below
              replacement cost, manage every asset in-house, and hold for the long horizon.
            </p>
            <div className="flex gap-12 mt-8 pt-7 border-t border-rule">
              {[
                { label: "Since", value: "1997" },
                { label: "Portfolio GDV", value: "£420m" },
                { label: "Units", value: "1,240" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <span className="block font-mono text-[11px] tracking-[0.14em] uppercase text-muted mb-2">{label}</span>
                  <strong className="font-serif font-normal text-[38px] tracking-[-0.02em] block leading-none">{value}</strong>
                </div>
              ))}
            </div>
            <div className="flex gap-[14px] mt-9 items-center">
              <Button asChild>
                <a href="#acquired" onClick={smoothScroll("#acquired")}>
                  View latest acquisitions <ArrowIcon />
                </a>
              </Button>
              <Button variant="ghost" asChild>
                <a href="#approach" onClick={smoothScroll("#approach")}>Our approach</a>
              </Button>
            </div>
          </AnimateIn>
        </div>
      </div>

      {/* Image stage */}
      <div
        className="relative bg-[#0e0d0a] border border-rule z-[2]"
        style={{ aspectRatio: "21/9" }}
        role="img"
        aria-label="Crestbourne showreel — UK property portfolio"
      >
        {/* Inner clip wrapper */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Parallax container — extends 120px above clip edge for travel headroom */}
   
            {/* Separate animation wrapper so Ken Burns transform doesn't conflict with parallax transform */}
            <div className="absolute inset-0 z-[2] hero-image-motion">
              <Image
                src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=2400&q=85&auto=format&fit=crop"
                alt=""
                fill
                priority
                className="object-cover"
                sizes="100vw"
                aria-hidden="true"
              />
            </div>
          <div className="absolute inset-0 w-full h-full z-[1] video-fallback-bg" aria-hidden="true" />
          <div className="absolute inset-0 z-[3] hero-stage-overlay pointer-events-none" />
        </div>

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-9 text-[#f1ede0] z-[4]">
          <div />
          <p className="font-serif text-[28px] leading-[1.15] tracking-[-0.01em] text-[#f1ede0] max-w-[42ch] [text-shadow:0_2px_24px_rgba(0,0,0,0.35)]">
            Twenty-nine years of <em className="italic text-gold-warm">compounding patiently</em> across the UK&apos;s built environment.
          </p>
        </div>

        {/* Featured acquisition card */}
        <DraggableCardContainer
          className="absolute bottom-8 right-[48px] max-sm:right-6 z-[5] w-[min(340px,40%)]"
          aria-label="Featured acquisition"
        >
          <DraggableCardBody className="w-full min-h-0 rounded-none bg-paper border border-rule shadow-[0_24px_64px_-12px_rgba(23,22,18,0.4)] p-0">
            <div className="relative overflow-hidden bg-bg-2" style={{ aspectRatio: "16/9" }}>
              <Image
                src="https://res.cloudinary.com/dmns9ystn/image/upload/v1753954163/11_qsbhoy.jpg"
                alt="Newlands Croft — Bromley"
                fill
                className="object-cover saturate-90 contrast-[1.02]"
                sizes="380px"
              />
            </div>
            <div className="p-[22px_24px]">
              <div className="flex justify-between mb-3">
                <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-accent">◆ Featured · Q2 2026</span>
                <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted">Acq. #072</span>
              </div>
              <h3 className="font-serif font-normal text-[26px] leading-[1.05] tracking-[-0.01em] m-0 mb-2">
                Newlands Croft, <em className="italic text-accent">Bromley</em>
              </h3>
              <p className="text-[13px] text-ink-2 mb-4 leading-[1.55]">
                Originally built in the 1940s as 16 flats, redeveloped into 12 spacious flats on Lennard Road, SE20. Managed in-house by our team.
              </p>
              <div className="grid grid-cols-3 gap-4 border-t border-rule pt-4">
                {[{ l: "Units", v: "12" }, { l: "Yield", v: "6.9%" }, { l: "Hold", v: "9y+" }].map(({ l, v }) => (
                  <div key={l}>
                    <span className="block font-mono text-[10px] tracking-[0.14em] uppercase text-muted mb-1">{l}</span>
                    <b className="font-serif font-normal text-[22px] tracking-[-0.01em] block leading-[1.1]">{v}</b>
                  </div>
                ))}
              </div>
            </div>
          </DraggableCardBody>
        </DraggableCardContainer>
      </div>
    </section>
  );
}
