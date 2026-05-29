import Link from "next/link";
import PropertyForm from "@/components/admin/PropertyForm";

export default function NewPropertyPage() {
  return (
    <div className="p-8 max-w-[800px]">
      <div className="mb-8">
        <Link href="/admin/properties" className="font-mono text-[10px] tracking-[0.12em] uppercase text-muted hover:text-ink transition-colors">
          ← Properties
        </Link>
        <h1 className="font-serif font-normal text-[32px] tracking-[-0.01em] text-ink mt-3">New property</h1>
      </div>
      <PropertyForm />
    </div>
  );
}
