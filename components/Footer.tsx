"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowIcon } from "@/components/icons";

const SAME_DAY_HOME_BUYER_URL = "https://www.samedayhomebuyer.co.uk/";

const links = {
  Portfolio: [
    { label: "Recently Acquired", href: "#acquired" },
    { label: "All Holdings", href: "#portfolio" },
  ],
  "The Group": [
    { label: "Approach", href: "#approach" },
    { label: "Group Companies", href: "#group" },
  ],
};

function FooterSubscribe() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    const res = await fetch("/api/subscribers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: email.split("@")[0], email }),
    });
    setStatus(res.ok ? "done" : "error");
  }

  if (status === "done") {
    return (
      <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#9d957f] mt-4">
        You&apos;re registered. We&apos;ll be in touch.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#857c63] mb-2">
        Investor updates
      </p>
      <div className="flex gap-0">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 min-w-0 px-3 py-2 bg-[#1f1d18] border border-[#3a3528] text-[#f1ede0] placeholder:text-[#6e6753] text-[13px] focus:outline-none focus:border-[#857c63] transition-colors font-[inherit]"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-3 py-2 bg-gold-warm text-[#1c1a15] border-0 cursor-pointer hover:bg-[#e8d9a8] transition-colors flex-shrink-0 disabled:opacity-50"
          aria-label="Subscribe"
        >
          <ArrowIcon className="w-[13px] h-[13px]" />
        </button>
      </div>
      {status === "error" && (
        <p className="font-mono text-[9px] tracking-[0.1em] uppercase text-red-400 mt-1">
          Something went wrong. Try again.
        </p>
      )}
    </form>
  );
}

export default function Footer() {
  return (
    <footer className="bg-ink text-[#b8b09a] pt-16 pb-6">
      <div className="wrap">
        <div className="grid grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12 pb-12 border-b border-[#2b2823]">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <a className="flex items-center gap-[14px]" href="#">
              <div className="relative w-9 h-9 rounded-full border border-[#3a3528] bg-[#1f1d18] grid place-items-center flex-shrink-0 before:content-[''] before:absolute before:inset-1 before:rounded-full before:border before:border-[#3a3528] before:opacity-25">
                <span className="font-serif italic text-[20px] leading-none text-gold-warm translate-y-[-1px]">C</span>
              </div>
              <div>
                <div className="font-serif text-[24px] tracking-[-0.01em] text-[#f1ede0]">Crestbourne</div>
                <span className="block font-mono text-[9px] tracking-widest3 text-[#857c63] uppercase mt-[-2px]">Est. 1997 · London</span>
              </div>
            </a>
            <p className="text-[14px] leading-[1.6] max-w-[38ch] text-[#9d957f] mt-[14px]">
              Property investment and asset management for the long horizon. Family-led, principal-aligned, privately held since 1997.
            </p>
            <FooterSubscribe />
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading}>
              <h5 className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-[#857c63] m-0 mb-[18px] font-medium">
                {heading}
              </h5>
              <ul className="list-none m-0 p-0 flex flex-col gap-[10px]">
                {items.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="text-[#d8d2bf] text-sm hover:text-white transition-colors">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 p-6 lg:p-8 mb-12 border border-[#3a3528] bg-[#1f1d18]">
          <div>
            <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-gold-warm m-0 mb-2">
              Group company
            </p>
            <h3 className="font-serif font-normal text-[clamp(22px,3vw,28px)] tracking-[-0.01em] text-[#f1ede0] m-0 mb-2">
              Sell your house fast for cash
            </h3>
            <p className="text-[14px] leading-[1.6] text-[#9d957f] max-w-[52ch] m-0">
              <span className="text-[#d8d2bf]">Same Day Home Buyer</span> is part of the Crestbourne
              Group. Get a no-obligation cash offer in 2 hours and complete in as little as 7 days.
            </p>
          </div>
          <Button
            asChild
            className="w-full sm:w-auto flex-shrink-0 bg-gold-warm text-[#1c1a15] border-gold-warm hover:bg-[#e8d9a8] hover:text-[#1c1a15] hover:border-[#e8d9a8]"
          >
            <a href={SAME_DAY_HOME_BUYER_URL} target="_blank" rel="noopener noreferrer">
              Visit Same Day Home Buyer <ArrowIcon />
            </a>
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-6 font-mono text-[10px] tracking-[0.14em] uppercase text-[#6e6753]">
          <span>
            © 2026 <a href="https://www.breezeflowai.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Breezeflowai</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
