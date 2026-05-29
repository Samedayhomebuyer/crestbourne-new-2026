import { config } from "dotenv";
config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../lib/db/schema";
import staticProperties from "../lib/data/properties-static";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function seed() {
  console.log("Seeding properties…");

  for (const p of staticProperties) {
    const displayIn = p.displayIn as string[];

    // Determine category from filter key
    const category = p.filter;

    // Upsert property (skip if slug already exists)
    const existing = await db.query.properties.findFirst({
      where: (props, { eq }) => eq(props.slug, p.slug),
    });

    if (existing) {
      console.log(`  skip  ${p.slug} (already exists)`);
      continue;
    }

    const [inserted] = await db.insert(schema.properties).values({
      slug:            p.slug,
      title:           p.titlePrefix + " " + p.italicWord,
      category,
      location:        p.location,
      type:            p.type,
      tag:             p.badge,
      tagAccent:       p.badgeAccent,
      address:         null,
      description:     p.desc,
      units:           p.stats.find((s) => ["Units", "Houses", "Properties", "Buildings"].includes(s.label))?.value ?? null,
      coverImageUrl:   p.img,
      coverImageAlt:   p.imgAlt,
      isPublished:     true,
      displayIn,
      refCode:         p.ref ?? null,
      acquisitionDate: null,
    }).returning();

    // Seed images
    for (let i = 0; i < p.images.length; i++) {
      const img = p.images[i];
      await db.insert(schema.propertyImages).values({
        propertyId:   inserted.id,
        url:          img.src,
        altText:      img.alt,
        caption:      img.caption,
        displayOrder: i,
        isCover:      i === 0,
      });
    }

    console.log(`  added ${p.slug}`);
  }

  console.log("Done.");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
