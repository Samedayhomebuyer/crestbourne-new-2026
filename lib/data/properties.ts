import { unstable_noStore as noStore } from "next/cache";
import { db } from "@/lib/db";
import { properties, propertyImages } from "@/lib/db/schema";
import type { PropertyCategory } from "@/lib/db/schema";
import { eq, desc, inArray } from "drizzle-orm";

export type PropertyWithImages = typeof properties.$inferSelect & {
  images: (typeof propertyImages.$inferSelect)[];
};

export async function getAllProperties(): Promise<PropertyWithImages[]> {
  noStore();
  const rows = await db.query.properties.findMany({
    orderBy: [desc(properties.createdAt)],
    with: { images: { orderBy: [propertyImages.displayOrder] } },
  });
  return rows as PropertyWithImages[];
}

export async function getPublishedProperties(): Promise<PropertyWithImages[]> {
  noStore();
  const props = await db
    .select()
    .from(properties)
    .where(eq(properties.isPublished, true))
    .orderBy(desc(properties.acquisitionDate), desc(properties.createdAt));

  if (!props.length) return [];

  const imgs = await db
    .select()
    .from(propertyImages)
    .where(inArray(propertyImages.propertyId, props.map((p) => p.id)))
    .orderBy(propertyImages.displayOrder);

  const byId = imgs.reduce<Record<string, (typeof propertyImages.$inferSelect)[]>>((acc, img) => {
    (acc[img.propertyId] ??= []).push(img);
    return acc;
  }, {});

  return props.map((p) => ({ ...p, images: byId[p.id] ?? [] }));
}

/** Fisher–Yates sample of up to `count` items (new array, does not mutate input). */
export function pickRandom<T>(items: T[], count: number): T[] {
  if (!items.length) return [];
  const n = Math.min(count, items.length);
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

export async function getRecentlyAcquired() {
  const all = await getPublishedProperties();
  return {
    cards: all.slice(0, 4),
  };
}

export async function getPortfolioProperties() {
  const all = await getPublishedProperties();
  const portfolio = all;
  const filterCounts = portfolio.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] ?? 0) + 1;
    acc.all = (acc.all ?? 0) + 1;
    return acc;
  }, {});
  return { properties: portfolio, filterCounts };
}

export async function getPropertyBySlug(slug: string): Promise<PropertyWithImages | null> {
  noStore();
  const row = await db.query.properties.findFirst({
    where: eq(properties.slug, slug),
    with: { images: { orderBy: [propertyImages.displayOrder] } },
  });
  return (row as PropertyWithImages) ?? null;
}

export async function getPropertyById(id: string): Promise<PropertyWithImages | null> {
  noStore();
  const row = await db.query.properties.findFirst({
    where: eq(properties.id, id),
    with: { images: { orderBy: [propertyImages.displayOrder] } },
  });
  return (row as PropertyWithImages) ?? null;
}

export async function getRelatedProperties(slug: string, category: PropertyCategory, count = 3) {
  const all = await getPublishedProperties();
  const sameCategory = all.filter((p) => p.slug !== slug && p.category === category);
  const others = all.filter((p) => p.slug !== slug && p.category !== category);
  return [...sameCategory, ...others].slice(0, count);
}

export async function createProperty(data: typeof properties.$inferInsert) {
  const [row] = await db.insert(properties).values(data).returning();
  return row;
}

export async function updateProperty(id: string, data: Partial<typeof properties.$inferInsert>) {
  const [row] = await db
    .update(properties)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(properties.id, id))
    .returning();
  return row;
}

export async function deleteProperty(id: string) {
  await db.delete(properties).where(eq(properties.id, id));
}

export async function setPropertyImages(
  propertyId: string,
  imgs: { url: string; altText?: string; caption?: string }[]
) {
  await db.delete(propertyImages).where(eq(propertyImages.propertyId, propertyId));
  if (!imgs.length) return;
  await db.insert(propertyImages).values(
    imgs.map((img, i) => ({
      propertyId,
      url: img.url,
      altText: img.altText ?? null,
      caption: img.caption ?? null,
      displayOrder: i,
      isCover: i === 0,
    }))
  );
}
