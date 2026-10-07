import { pgTable, uuid, text, varchar, timestamp } from "drizzle-orm/pg-core";

export const userSchema = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),

  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email").unique().notNull(),

  hashPassword: text("hash_password").notNull(),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),

  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export default userSchema;