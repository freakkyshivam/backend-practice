
import { DrizzleTaskRepository } from "../../database/repository/task.drizzle.repository.js";
import { TaskService } from "./services/task.service.js";

const taskRepository = new DrizzleTaskRepository();

export const taskService = new TaskService(taskRepository)