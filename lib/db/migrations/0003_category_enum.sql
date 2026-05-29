UPDATE "properties" SET "category" = 'residential' WHERE "category" = 'hmo';
--> statement-breakpoint
CREATE TYPE "property_category" AS ENUM ('residential', 'commercial', 'industrial', 'retail', 'mixed');
--> statement-breakpoint
ALTER TABLE "properties" ALTER COLUMN "category" TYPE "property_category" USING "category"::"property_category";
