"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/admin/properties", label: "Properties" },
  { href: "/admin/subscribers", label: "Subscribers" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <aside className="w-[220px] flex-shrink-0 bg-ink text-[#b8b09a] flex flex-col min-h-screen">
      {/* Brand */}
      <div className="px-6 py-6 border-b border-[#2b2823]">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-[#3a3528] bg-[#1f1d18] grid place-items-center flex-shrink-0">
            <span className="font-serif italic text-[18px] leading-none text-gold-warm translate-y-[-1px]">C</span>
          </div>
          <div>
            <div className="font-serif text-[18px] tracking-[-0.01em] text-[#f1ede0]">Crestbourne</div>
            <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-[#857c63]">Admin</span>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4">
        <p className="px-3 font-mono text-[9px] tracking-[0.16em] uppercase text-[#6e6753] mb-2">Menu</p>
        {nav.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-3 py-[9px] rounded-sm font-mono text-[11px] tracking-[0.1em] uppercase transition-colors mb-1",
                active
                  ? "bg-[rgba(255,255,255,0.08)] text-[#f1ede0]"
                  : "text-[#9d957f] hover:text-[#f1ede0] hover:bg-[rgba(255,255,255,0.04)]"
              )}
            >
              <span className={cn("w-[5px] h-[5px] rounded-full flex-shrink-0", active ? "bg-gold-warm" : "bg-[#3a3528]")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-5 border-t border-[#2b2823]">
        <Link
          href="/"
          className="block font-mono text-[10px] tracking-[0.12em] uppercase text-[#6e6753] hover:text-[#9d957f] transition-colors mb-3"
        >
          ← View site
        </Link>
        <button
          onClick={handleLogout}
          className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#6e6753] hover:text-[#9d957f] transition-colors w-full text-left"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
