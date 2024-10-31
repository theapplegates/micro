import { text, integer, pgTable } from "drizzle-orm/pg-core";

export const viewCount = pgTable("viewCount", {
  slug: text("slug").notNull().unique(),
  views: integer("views").notNull(),
});
