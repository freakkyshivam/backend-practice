import { and, eq } from "drizzle-orm";
import type { Task, TaskStatus } from "../../domain/types/task.types.js";
import type { TaskRepository } from "../../module/task/interface/task_repository.interface.js";
import db from "../connection/db.js";
import taskSchema from "../schema/task.schema.js";

export class DrizzleTaskRepository implements TaskRepository {
  // create task
  async create(
    user_id: string,
    title: string,
    description?: string,
  ): Promise<Task | null> {
    try {
      const [task] = await db
        .insert(taskSchema)
        .values({
          title,
          user_id,
          description,
        })
        .returning();

      return task ? task : null;
    } catch (err) {
      throw err;
    }
  }

  // get all tasks
  async getAllTasks(
  user_id: string,
  page: number,
  limit?: number,
  status?: TaskStatus
): Promise<Task[] | null> {
  try {
    
    if(!limit) limit = 10;

    const tasks = await db
      .select()
      .from(taskSchema)
      .where(and(
        eq(taskSchema.user_id, user_id),
        status ? eq(taskSchema.status, status) : undefined
      ))
      .orderBy(taskSchema.createdAt)
      .limit(limit)
      .offset((page - 1) * limit);

    return tasks;
  } catch (err) {
    throw err;
  }
}

  // get single task
  async getSingleTask(id: string, user_id: string): Promise<Task | null> {
    try {
      const [task] = await db
        .select()
        .from(taskSchema)
        .where(and(eq(taskSchema.id, id), eq(taskSchema.user_id, user_id)))
        .limit(1);

      return task ? task : null;
    } catch (err) {
      throw err;
    }
  }


  // update task
  async updateTask(key : string, value: string, id : string, user_id: string): Promise<void> {
    try {
 

        await db
        .update(taskSchema)
        .set({
            [key] : value
        })
        .where(and(
          eq(taskSchema.id, id),
          eq(taskSchema.user_id, user_id)
        ))
    } catch (err) {
        throw err;
    }
  }

  // delete task
  async deleteTask(id: string, user_id: string): Promise<void> {
    try {
      await db
        .delete(taskSchema)
        .where(and(eq(taskSchema.id, id), eq(taskSchema.user_id, user_id)));
    } catch (err) {
      throw err;
    }
  }
}
