import type { TaskStatus, TaskUpdateKey } from "../../../domain/types/task.types.js";
import type { TaskRepository } from "../interface/task_repository.interface.js";

export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  // create task
  async createTask(user_id: string, title: string, description?: string) {
    try {
      const result = await this.taskRepository.create(
        user_id,
        title,
        description,
      );

      return result;
    } catch (error) {
      throw error;
    }
  }

  // get all task
  async getAllTask(
    user_id: string, 
    page: number, 
    limit? : number, 
    status? : TaskStatus
  ) {
    try {
      const tasks = await this.taskRepository.getAllTasks(
        user_id,
        page,
        limit,
        status
      );

      return tasks;
    } catch (error) {
      throw error;
    }
  }

  // get single task

  async getSingleTask(id : string, user_id : string){
    try {
      const task = await this.taskRepository
      .getSingleTask(id, 
        user_id);

        return task;

    } catch (error) {
      throw error;
    }
  }

  // update task 

  async updateTask(
    key : TaskUpdateKey, 
    value : string , 
    id : string, 
    user_id : string){

    try {
      await this.taskRepository.updateTask(
      key,
      value,
      id,
      user_id
    )
    } catch (error) {
      throw error;
    }
  }

  // delete task

  async deleteTask(id : string, user_id : string){
    try{
      await this.taskRepository.deleteTask(
        id, user_id
      )
    }catch(err){
      throw err;
    }
  }


}
