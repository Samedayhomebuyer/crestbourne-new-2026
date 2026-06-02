"use client";

import { useState } from "react";

type Props = {
  propertyId: string;
  propertyTitle: string;
  isPublished: boolean;
};

type State = "idle" | "confirming" | "sending" | "done" | "error";

export default function BroadcastButton({ propertyId, propertyTitle, isPublished }: Props) {
  const [state, setState] = useState<State>("idle");
  const [result, setResult] = useState<{ broadcastId?: string; error?: string }>({});

  async function handleSend() {
    setState("sending");
    try {
      const res = await fetch(`/api/broadcast/${propertyId}`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setResult({ error: data.error ?? "Failed to broadcast" });
        setState("error");
      } else {
        setResult({ broadcastId: data.broadcastId });
        setState("done");
      }
    } catch {
      setResult({ error: "Network error" });
      setState("error");
    }
  }

  if (!isPublished) {
    return (
      <button
        disabled
        title="Publish property first"
        className="px-5 py-2 bg-[#ebe5d6] text-muted font-mono text-[11px] tracking-[0.14em] uppercase cursor-not-allowed opacity-60"
      >
        Broadcast
      </button>
    );
  }

  if (state === "done") {
    return (
      <div className="flex items-center gap-3">
        <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-accent">
          Broadcast sent
        </span>
        <button
          onClick={() => setState("idle")}
          className="font-mono text-[10px] tracking-[0.12em] uppercase text-muted hover:text-ink transition-colors"
        >
          Dismiss
        </button>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="flex items-center gap-3">
        <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-red-600">{result.error}</span>
        <button
          onClick={() => setState("idle")}
          className="font-mono text-[10px] tracking-[0.12em] uppercase text-muted hover:text-ink transition-colors"
        >
          Dismiss
        </button>
      </div>
    );
  }

  if (state === "confirming") {
    return (
      <div className="flex items-center gap-3">
        <span className="font-mono text-[11px] tracking-[0.1em] text-ink">
          Send &ldquo;{propertyTitle}&rdquo; to all subscribers?
        </span>
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-ink text-paper font-mono text-[11px] tracking-[0.14em] uppercase hover:bg-ink-2 transition-colors"
        >
          Send
        </button>
        <button
          onClick={() => setState("idle")}
          className="font-mono text-[10px] tracking-[0.12em] uppercase text-muted hover:text-ink transition-colors"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setState("confirming")}
      disabled={state === "sending"}
      className="px-5 py-2 border border-ink text-ink font-mono text-[11px] tracking-[0.14em] uppercase hover:bg-ink hover:text-paper transition-colors disabled:opacity-50"
    >
      {state === "sending" ? "Sending…" : "Broadcast"}
    </button>
  );
}
