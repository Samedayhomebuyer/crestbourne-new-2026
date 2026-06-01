"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface ContactDrawerProps {
  open: boolean;
  onClose: () => void;
}

type Status = "idle" | "loading" | "success" | "error";

const FIELDS = [
  { id: "name", label: "Full Name", type: "text", placeholder: "e.g. James Whitmore" },
  { id: "phone", label: "Telephone", type: "tel", placeholder: "+44 (0)20 ..." },
  { id: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
] as const;

export default function ContactDrawer({ open, onClose }: ContactDrawerProps) {
  const [fields, setFields] = useState({ name: "", phone: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  function update(field: keyof typeof fields, value: string) {
    setFields((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    // Submission wired up in step 2
    await new Promise((r) => setTimeout(r, 800));
    setStatus("success");
  }

  function handleClose() {
    setStatus("idle");
    setFields({ name: "", phone: "", email: "", message: "" });
    onClose();
  }

  const inputClass =
    "w-full bg-bg border border-rule rounded-sm px-4 py-[13px] text-ink font-sans text-[15px] leading-snug " +
    "focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 " +
    "placeholder:text-muted/40 transition-colors disabled:opacity-50";

  const labelClass = "block font-mono text-[10.5px] tracking-widest2 uppercase text-muted mb-[7px]";

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-40 bg-ink/50 backdrop-blur-sm"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-heading"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 310, damping: 34, mass: 0.85 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-[520px] bg-paper shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex-shrink-0 px-8 pt-10 pb-8 border-b border-rule">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-mono text-[10.5px] tracking-widest2 uppercase text-muted flex items-center gap-[8px] mb-3">
                    <span className="inline-block w-[5px] h-[5px] rounded-full bg-gold-warm" />
                    Crestbourne Capital
                  </div>
                  <h2
                    id="drawer-heading"
                    className="font-serif font-normal text-[clamp(34px,5vw,44px)] leading-[1.0] tracking-[-0.02em] text-ink"
                  >
                    Get in <em className="italic text-accent">touch.</em>
                  </h2>
                  <p className="mt-3 text-[14px] text-muted leading-[1.55] max-w-[34ch]">
                    We respond personally, within two working days.
                  </p>
                </div>

                {/* Close button */}
                <button
                  onClick={handleClose}
                  aria-label="Close"
                  className="flex-shrink-0 w-[44px] h-[44px] -mr-2 -mt-1 flex items-center justify-center
                             rounded-full text-muted hover:text-ink hover:bg-bg transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M2 2l12 12M14 2L2 14" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-8 py-8">
              {status === "success" ? (
                <div className="flex flex-col items-center text-center py-12 gap-6">
                  {/* Check mark */}
                  <span className="w-[56px] h-[56px] rounded-full bg-accent/10 flex items-center justify-center">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                      <path d="M4 11.5l5 5 9-9" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-serif text-[32px] leading-[1.1] tracking-[-0.02em] text-ink">
                      Message <em className="italic text-gold-warm">received.</em>
                    </p>
                    <p className="mt-3 text-[14px] text-muted leading-relaxed max-w-[30ch] mx-auto">
                      We&apos;ll be in touch personally within two working days.
                    </p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="mt-2 inline-flex items-center gap-2 border border-ink/20 text-ink rounded-full
                               px-5 py-[9px] font-sans text-[13px] font-medium hover:bg-bg transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                  {FIELDS.map(({ id, label, type, placeholder }) => (
                    <div key={id}>
                      <label htmlFor={id} className={labelClass}>{label}</label>
                      <input
                        id={id}
                        type={type}
                        placeholder={placeholder}
                        value={fields[id as keyof typeof fields]}
                        onChange={(e) => update(id as keyof typeof fields, e.target.value)}
                        disabled={status === "loading"}
                        className={inputClass}
                        required={id !== "phone"}
                      />
                    </div>
                  ))}

                  <div>
                    <label htmlFor="message" className={labelClass}>Message</label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Tell us about your opportunity or enquiry…"
                      value={fields.message}
                      onChange={(e) => update("message", e.target.value)}
                      disabled={status === "loading"}
                      className={inputClass + " resize-none"}
                      required
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full bg-ink text-paper py-[15px] font-sans text-[12.5px] font-medium
                                 tracking-widest uppercase rounded-full
                                 hover:bg-ink/90 active:bg-ink/80
                                 disabled:opacity-50 transition-all"
                    >
                      {status === "loading" ? "Sending…" : "Send Message"}
                    </button>
                    <p className="mt-4 text-center text-[12px] text-muted/70 font-mono">
                      Your details are never shared with third parties.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
