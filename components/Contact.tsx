"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowIcon } from "@/components/icons";
import AnimateIn from "@/components/AnimateIn";
import ContactDrawer from "@/components/ContactDrawer";

const details = [
  { label: "Address", value: <>First Floor, <em className="italic">Winston House</em><br />349 Regents Park Rd<br />London N3 1DH</> },
  { label: "Telephone", value: <>+44 (0)20 3371 5544</> },
  { label: "Email", value: <><em className="italic">info</em>@crestbourne.co.uk</> },
];

export default function Contact() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <section id="contact" className="py-24 bg-accent text-[#f1ede0] relative overflow-hidden">
      <div className="absolute inset-0 contact-bg-pattern pointer-events-none" />
      <div className="wrap relative grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-20 items-start">
        <AnimateIn>
          <div className="font-mono text-[11px] tracking-widest2 uppercase text-[#c9d4c0] flex items-center">
            <span className="inline-block w-[6px] h-[6px] rounded-full bg-gold-warm mr-[10px] translate-y-[1px]" />
            Get in touch
          </div>
          <h2 className="font-serif font-normal text-[clamp(56px,7vw,108px)] leading-[0.95] tracking-[-0.02em] mt-[18px] mb-7 text-[#f1ede0]">
            Speak with us<br />about your <em className="italic text-gold-warm">property.</em>
          </h2>
          <p className="text-[18px] leading-[1.55] text-[#d3dccb] max-w-[46ch] mb-9">
            Whether you&apos;re a vendor with an off-market opportunity, a co-investor, or an adviser
            representing one — we&apos;d like to hear from you. We respond personally, within two
            working days.
          </p>
          <div className="flex gap-[14px] flex-wrap">
            <Button variant="contact-default" onClick={() => setDrawerOpen(true)}>
              Message us <ArrowIcon />
            </Button>
          </div>
        </AnimateIn>

        <AnimateIn as="aside" delay={150} className="bg-white/[0.06] border border-white/[0.18] p-[36px_36px_32px] backdrop-blur-md">
          {details.map((d) => (
            <div key={d.label} className="flex justify-between gap-4 py-[18px] border-b border-white/[0.14] last:border-b-0">
              <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#9eb098] whitespace-nowrap">{d.label}</span>
              <span className="font-serif text-[22px] tracking-[-0.01em] text-[#f1ede0] text-right leading-[1.3]">{d.value}</span>
            </div>
          ))}
        </AnimateIn>
      </div>
      <ContactDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </section>
  );
}
