import {pgTable, uuid, text, timestamp, varchar,pgEnum} from 'drizzle-orm/pg-core'
import users from './user.schema.js'

export const taskStatusEnum = pgEnum("task_status_enum",[
    'pending',
    'completed'
])

export const taskSchema = pgTable('tasks',{
    id : uuid().primaryKey().defaultRandom().unique(),

    user_id : uuid().references(()=> users.id).notNull(),

    title : text("task_title").notNull(),

    status : taskStatusEnum('task_status').default('pending').notNull(),

    description : text("task_description"),

    updatedAt : timestamp("updated_at", {withTimezone : true}).$onUpdate(()=> new Date()),

    createdAt : timestamp("created_at", {withTimezone : true}).defaultNow()
})


export default taskSchema;