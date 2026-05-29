import { relations } from "drizzle-orm";
import {
  pgTable, uuid, text, boolean, timestamp, integer, date,
} from "drizzle-orm/pg-core";

export const properties = pgTable("properties", {
  id:              uuid("id").primaryKey().defaultRandom(),
  slug:            text("slug").notNull().unique(),
  title:           text("title").notNull(),
  category:        text("category").notNull(), // residential | commercial | hmo | mixed
  location:        text("location").notNull(),
  type:            text("type").notNull(),      // display label e.g. "Residential portfolio"
  tag:             text("tag"),                 // badge label e.g. "Flagship"
  tagAccent:       boolean("tag_accent").default(false),
  address:         text("address"),
  description:     text("description"),
  units:           text("units"),              // e.g. "68", "12 flats"
  coverImageUrl:   text("cover_image_url"),
  coverImageAlt:   text("cover_image_alt"),
  isPublished:     boolean("is_published").default(false).notNull(),
  displayIn:       text("display_in").array().default([]),
  refCode:         text("ref_code"),
  acquisitionDate: date("acquisition_date"),
  createdAt:       timestamp("created_at").defaultNow().notNull(),
  updatedAt:       timestamp("updated_at").defaultNow().notNull(),
});

export const propertyImages = pgTable("property_images", {
  id:           uuid("id").primaryKey().defaultRandom(),
  propertyId:   uuid("property_id").notNull().references(() => properties.id, { onDelete: "cascade" }),
  url:          text("url").notNull(),
  altText:      text("alt_text"),
  caption:      text("caption"),
  displayOrder: integer("display_order").default(0).notNull(),
  isCover:      boolean("is_cover").default(false).notNull(),
});

export const subscribers = pgTable("subscribers", {
  id:               uuid("id").primaryKey().defaultRandom(),
  name:             text("name").notNull(),
  email:            text("email").notNull().unique(),
  phone:            text("phone"),
  subscribed:       boolean("subscribed").default(true).notNull(),
  unsubscribeToken: uuid("unsubscribe_token").defaultRandom().notNull(),
  createdAt:        timestamp("created_at").defaultNow().notNull(),
});

export const propertiesRelations = relations(properties, ({ many }) => ({
  images: many(propertyImages),
}));

export const propertyImagesRelations = relations(propertyImages, ({ one }) => ({
  property: one(properties, {
    fields: [propertyImages.propertyId],
    references: [properties.id],
  }),
}));

export type Property       = typeof properties.$inferSelect;
export type NewProperty    = typeof properties.$inferInsert;
export type PropertyImage  = typeof propertyImages.$inferSelect;
export type Subscriber     = typeof subscribers.$inferSelect;
export type NewSubscriber  = typeof subscribers.$inferInsert;
