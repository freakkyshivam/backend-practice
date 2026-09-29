import {pgTable, text, timestamp, varchar, uuid} from 'drizzle-orm/pg-core'


export const urlSchema = pgTable('urls',{
    id : uuid().primaryKey().defaultRandom().notNull(),

    shortCode : varchar("short_code", 
    {length : 20})
    .unique()
    .notNull(),

    originalUrl : text("original_url").notNull(),

    createdAt : timestamp("created_at", {withTimezone : true}).defaultNow(),
})

export default urlSchema;