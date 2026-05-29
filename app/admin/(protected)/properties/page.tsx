import Link from "next/link";
import Image from "next/image";
import { getAllProperties } from "@/lib/data/properties";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminPropertiesPage() {
  const props = await getAllProperties();

  return (
    <div className="p-8 max-w-[1100px]">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif font-normal text-[32px] tracking-[-0.01em] text-ink">Properties</h1>
          <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-muted mt-1">{props.length} total</p>
        </div>
        <Link
          href="/admin/properties/new"
          className="px-5 py-2 bg-ink text-paper font-mono text-[11px] tracking-[0.14em] uppercase hover:bg-ink-2 transition-colors"
        >
          + New property
        </Link>
      </div>

      <div className="border border-rule bg-paper">
        {props.length === 0 && (
          <p className="p-8 font-mono text-[11px] uppercase text-muted text-center">No properties yet.</p>
        )}
        {props.map((p, i) => (
          <div
            key={p.id}
            className={cn("flex items-center gap-5 p-4", i > 0 && "border-t border-rule-soft")}
          >
            {/* Thumbnail */}
            <div className="w-16 h-12 bg-[#ebe5d6] flex-shrink-0 relative overflow-hidden">
              {p.coverImageUrl && (
                <Image src={p.coverImageUrl} alt={p.coverImageAlt ?? ""} fill className="object-cover" sizes="64px" />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="font-medium text-ink text-[15px] truncate">{p.title}</div>
              <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-muted mt-[2px]">
                {p.location} · {p.category}
              </div>
            </div>

            {/* Status */}
            <span className={cn(
              "font-mono text-[9.5px] tracking-[0.14em] uppercase px-2 py-1 rounded-full flex-shrink-0",
              p.isPublished ? "bg-accent/10 text-accent" : "bg-[#ebe5d6] text-muted"
            )}>
              {p.isPublished ? "Published" : "Draft"}
            </span>

            {/* Actions */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <Link
                href={`/properties/${p.slug}`}
                target="_blank"
                className="font-mono text-[10px] tracking-[0.12em] uppercase text-muted hover:text-ink transition-colors"
              >
                View ↗
              </Link>
              <Link
                href={`/admin/properties/${p.id}`}
                className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink hover:underline"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
