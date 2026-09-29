import {uuid, pgTable, text,varchar, numeric, timestamp}from 'drizzle-orm/pg-core'


export const productSchema = pgTable("products",{
    id : uuid().primaryKey().defaultRandom().notNull(),

    name: varchar("product_name", {length : 255}).notNull(),

    description : text("product_description").notNull(),

    category : varchar("product_category", {length : 255}).notNull(),

    price : numeric("product_price").notNull(),

    createdAt : timestamp("created_at", {withTimezone : true}).defaultNow().notNull()
})