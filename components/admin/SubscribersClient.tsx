"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { SubscriberView } from "@/lib/data/subscribers";

export default function SubscribersClient({ initial }: { initial: SubscriberView[] }) {
  const [subscribers, setSubscribers] = useState(initial);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState("");

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setAdding(true);
    setAddError("");
    try {
      const res = await fetch("/api/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        setAddError(data.error ?? "Failed to add subscriber");
      } else {
        const row: SubscriberView = await res.json();
        setSubscribers([row, ...subscribers]);
        setForm({ name: "", email: "" });
        setShowAdd(false);
      }
    } finally {
      setAdding(false);
    }
  }

  async function handleRemove(id: string) {
    await fetch(`/api/subscribers/${id}`, { method: "DELETE" });
    setSubscribers(subscribers.filter((s) => s.id !== id));
  }

  async function handleToggle(sub: SubscriberView) {
    const res = await fetch(`/api/subscribers/${sub.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subscribed: !sub.subscribed }),
    });
    if (res.ok) {
      const updated: SubscriberView = await res.json();
      setSubscribers(subscribers.map((s) => (s.id === updated.id ? updated : s)));
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif font-normal text-[32px] tracking-[-0.01em] text-ink">Subscribers</h1>
          <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-muted mt-1">
            {subscribers.length} total · {subscribers.filter((s) => s.subscribed).length} active
          </p>
        </div>
        <button
          onClick={() => { setShowAdd(!showAdd); setAddError(""); }}
          className="px-5 py-2 bg-ink text-paper font-mono text-[11px] tracking-[0.14em] uppercase hover:bg-ink-2 transition-colors"
        >
          {showAdd ? "Cancel" : "+ Add subscriber"}
        </button>
      </div>

      {/* Add form */}
      {showAdd && (
        <form onSubmit={handleAdd} className="border border-rule bg-paper p-6 mb-6 space-y-4">
          <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-muted mb-2">New subscriber</p>
          {addError && (
            <p className="font-mono text-[10px] text-red-600 tracking-[0.1em]">{addError}</p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-[10px] tracking-[0.14em] uppercase text-muted mb-1">Name *</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-rule bg-paper px-3 py-2 text-[14px] text-ink focus:outline-none focus:border-ink"
                placeholder="Jane Smith"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] tracking-[0.14em] uppercase text-muted mb-1">Email *</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-rule bg-paper px-3 py-2 text-[14px] text-ink focus:outline-none focus:border-ink"
                placeholder="jane@example.com"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={adding}
            className="px-5 py-2 bg-ink text-paper font-mono text-[11px] tracking-[0.14em] uppercase hover:bg-ink-2 transition-colors disabled:opacity-50"
          >
            {adding ? "Adding…" : "Add subscriber"}
          </button>
        </form>
      )}

      {/* List */}
      <div className="border border-rule bg-paper">
        {subscribers.length === 0 && (
          <p className="p-8 font-mono text-[11px] uppercase text-muted text-center">No subscribers yet.</p>
        )}
        {subscribers.map((sub, i) => (
          <div
            key={sub.id}
            className={cn("flex items-center gap-4 p-4", i > 0 && "border-t border-rule-soft")}
          >
            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="font-medium text-ink text-[15px] truncate">{sub.name}</div>
              <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-muted mt-[2px] truncate">
                {sub.email}
              </div>
            </div>

            {/* Joined */}
            <span className="font-mono text-[10px] tracking-[0.1em] text-muted flex-shrink-0 hidden sm:block">
              {new Date(sub.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
            </span>

            {/* Status badge */}
            <button
              onClick={() => handleToggle(sub)}
              className={cn(
                "font-mono text-[9.5px] tracking-[0.14em] uppercase px-2 py-1 rounded-full flex-shrink-0 transition-colors",
                sub.subscribed
                  ? "bg-accent/10 text-accent hover:bg-accent/20"
                  : "bg-[#ebe5d6] text-muted hover:bg-[#ddd7c8]"
              )}
            >
              {sub.subscribed ? "Active" : "Unsubscribed"}
            </button>

            {/* Remove */}
            <button
              onClick={() => handleRemove(sub.id)}
              className="font-mono text-[10px] tracking-[0.12em] uppercase text-muted hover:text-red-600 transition-colors flex-shrink-0"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
