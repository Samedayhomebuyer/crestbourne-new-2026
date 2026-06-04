import type { MetadataRoute } from "next";
import { getPublishedProperties } from "@/lib/data/properties";
import { getSiteUrl } from "@/lib/site-url";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();

  let propertyEntries: MetadataRoute.Sitemap = [];
  let latestPropertyUpdate: Date | undefined;

  try {
    const properties = await getPublishedProperties();
    propertyEntries = properties.map((p) => {
      const lastModified = p.updatedAt ?? p.createdAt;
      if (
        !latestPropertyUpdate ||
        lastModified.getTime() > latestPropertyUpdate.getTime()
      ) {
        latestPropertyUpdate = lastModified;
      }
      return {
        url: `${baseUrl}/properties/${p.slug}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      };
    });
  } catch {
    // If the database is unavailable, still expose the homepage.
  }

  return [
    {
      url: baseUrl,
      lastModified: latestPropertyUpdate ?? new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...propertyEntries,
  ];
}
