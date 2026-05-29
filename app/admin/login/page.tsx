"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        setError("Invalid email or password.");
      } else {
        router.push("/admin/properties");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f3efe6] flex items-center justify-center px-6">
      <div className="w-full max-w-[400px]">
        {/* Brand */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-9 h-9 rounded-full border border-ink bg-paper grid place-items-center relative">
            <span className="font-serif italic text-[20px] leading-none text-ink translate-y-[-1px]">C</span>
          </div>
          <div>
            <div className="font-serif text-[22px] tracking-[-0.01em] text-ink">Crestbourne</div>
            <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-muted">Admin</span>
          </div>
        </div>

        {/* Form card */}
        <div className="bg-paper border border-rule p-8">
          <div
            className="absolute inset-x-0 top-0 h-[6px] rounded-t-[2px]"
            style={{ background: "linear-gradient(90deg,#2f4a36 0 33%,#8a6d3a 33% 66%,#171612 66%)" }}
          />
          <h1 className="font-serif font-normal text-[28px] tracking-[-0.01em] text-ink mb-1">Sign in</h1>
          <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted mb-8">Admin access only</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block font-mono text-[10px] tracking-[0.12em] uppercase text-muted mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full px-4 py-3 bg-[#f3efe6] border border-rule text-ink text-[15px] focus:outline-none focus:border-ink transition-colors"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] tracking-[0.12em] uppercase text-muted mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full px-4 py-3 bg-[#f3efe6] border border-rule text-ink text-[15px] focus:outline-none focus:border-ink transition-colors"
              />
            </div>

            {error && (
              <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-ink text-paper font-mono text-[11px] tracking-[0.14em] uppercase font-medium hover:bg-ink-2 transition-colors disabled:opacity-50 mt-2"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>

        <p className="text-center font-mono text-[9px] tracking-[0.14em] uppercase text-muted mt-6">
          © 2026 The Crestbourne Group Ltd
        </p>
      </div>
    </div>
  );
}
