import {
  uuid,
  pgTable,
  varchar,
  text,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

export const resourceEnum = pgEnum("resource_enum", [
  "note",
  "article",
  "document",
  "video",
  "link",
]);

export const resourceSchema = pgTable("resources", {
  id: uuid().primaryKey().defaultRandom().notNull(),

  title: varchar("title", { length: 255 }).notNull(),

  description: text("description").notNull(),

  type: resourceEnum('resource_enum').default('note').notNull(),

  url: text("url"),
  filePath : text('file_path'),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),

  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});
