"use client";

import { useState } from "react";
import AnimateIn from "@/components/AnimateIn";
import { ArrowIcon } from "@/components/icons";

export default function PropertySubscribeCta() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="register" className="relative py-24 bg-accent overflow-hidden">
      {/* Diagonal stripe pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "repeating-linear-gradient(45deg,rgba(255,255,255,.025) 0 14px,transparent 14px 28px)" }}
      />

      <div className="wrap relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-[80px] items-center">
          {/* Left: copy */}
          <AnimateIn>
            <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-[#c9d4c0] flex items-center">
              <span className="inline-block w-[6px] h-[6px] rounded-full bg-gold-warm mr-[10px] translate-y-[1px]" />
              Investor register
            </div>
            <h2 className="font-serif font-normal text-[clamp(40px,4.8vw,72px)] leading-none tracking-[-0.02em] mt-4 mb-[18px] text-[#f1ede0] max-w-[18ch]">
              Be first to hear about{" "}
              <em className="italic text-gold-warm">similar opportunities.</em>
            </h2>
            <p className="text-[17px] leading-[1.6] text-[#d3dccb] max-w-[48ch] m-0">
              We notify registered investors when comparable deals become available.
              No spam — just direct, personal notification of new acquisitions that match your profile.
            </p>
          </AnimateIn>

          {/* Right: form card */}
          <AnimateIn delay={120}>
            <aside className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.18)] p-[32px_32px_30px] backdrop-blur-sm">
              {submitted ? (
                <div className="text-center py-[18px]">
                  <span className="font-serif italic text-[32px] text-gold-warm block mb-2">Thank you.</span>
                  <p className="text-[#d3dccb] text-[14px] m-0">
                    We&apos;ll be in touch when the right opportunity arises.
                  </p>
                </div>
              ) : (
                <form
                  className="flex flex-col gap-3"
                  onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                >
                  <input
                    type="text"
                    placeholder="Your name"
                    required
                    className="w-full px-4 py-[13px] bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.2)] text-[#f1ede0] placeholder:text-[rgba(255,255,255,0.45)] font-[inherit] text-[15px] focus:outline-none focus:border-gold-warm transition-colors rounded-[2px]"
                  />
                  <input
                    type="email"
                    placeholder="Email address"
                    required
                    className="w-full px-4 py-[13px] bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.2)] text-[#f1ede0] placeholder:text-[rgba(255,255,255,0.45)] font-[inherit] text-[15px] focus:outline-none focus:border-gold-warm transition-colors rounded-[2px]"
                  />
                  <button
                    type="submit"
                    className="w-full px-[22px] py-[13px] bg-gold-warm text-[#1c1a15] border-0 cursor-pointer font-mono text-[11px] tracking-[0.14em] uppercase font-medium inline-flex items-center justify-between hover:bg-[#e8d9a8] transition-colors rounded-[2px]"
                  >
                    Register as investor <ArrowIcon className="w-[14px] h-[14px]" />
                  </button>
                  <p className="font-mono text-[9.5px] tracking-[0.1em] uppercase text-[rgba(255,255,255,0.45)] text-center m-0">
                    Unsubscribe at any time · No third parties
                  </p>
                </form>
              )}
            </aside>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
