import {pgTable, uuid, varchar, timestamp, text} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {

    id : uuid().primaryKey().defaultRandom().unique(),
    
    name : varchar('name', {length : 255}).notNull(),

    email : varchar('email', {length : 255}).unique().notNull(),

    hashPassword : text("hash_password").notNull(),

    createdAt : timestamp('created_at', {withTimezone : true}).defaultNow()

})

export default users;