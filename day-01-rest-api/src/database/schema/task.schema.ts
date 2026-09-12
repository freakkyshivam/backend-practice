import {pgTable, uuid, text, timestamp} from 'drizzle-orm/pg-core'
import users from './user.schema.js'

export const taskSchema = pgTable('tasks',{
    id : uuid().primaryKey().defaultRandom().unique(),

    user_id : uuid().references(()=> users.id).notNull(),

    title : text("task_title").notNull(),

    description : text("task_description").notNull(),

    updatedAt : timestamp("updated_at", {withTimezone : true}).$onUpdate(()=> new Date()),

    creadtedAt : timestamp("created_at", {withTimezone : true}).defaultNow()
})


export default taskSchema;