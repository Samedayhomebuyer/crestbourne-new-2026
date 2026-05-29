import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { properties, propertyImages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import PropertyForm from "@/components/admin/PropertyForm";
import type { PropertyWithImages } from "@/lib/data/properties";

export const dynamic = "force-dynamic";

export default async function EditPropertyPage({ params }: { params: { id: string } }) {
  const property = await db.query.properties.findFirst({
    where: eq(properties.id, params.id),
    with: { images: { orderBy: [propertyImages.displayOrder] } },
  });

  if (!property) notFound();

  return (
    <div className="p-8 max-w-[800px]">
      <div className="mb-8">
        <Link href="/admin/properties" className="font-mono text-[10px] tracking-[0.12em] uppercase text-muted hover:text-ink transition-colors">
          ← Properties
        </Link>
        <h1 className="font-serif font-normal text-[32px] tracking-[-0.01em] text-ink mt-3">Edit property</h1>
        <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-muted mt-1">{property.slug}</p>
      </div>
      <PropertyForm property={property as PropertyWithImages} />
    </div>
  );
}
