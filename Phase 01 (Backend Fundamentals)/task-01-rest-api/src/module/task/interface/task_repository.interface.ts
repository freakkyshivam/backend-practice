import type { Task, TaskStatus, TaskUpdateKey } from "../../../domain/types/task.types.js";

export interface TaskRepository {

    create(
        user_id : string,
        title : string, 
        description ?: string, 
    ) : Promise<Task | null>

    getAllTasks(
        user_id : string,
        page : number,
        limit ?: number,
        status ?: TaskStatus
    ) : Promise<Task[] | null >;

    getSingleTask(
        id :string,
        user_id : string
    ) : Promise<Task | null>;

    updateTask(
        key : TaskUpdateKey,
        value : string,
        id : string,
        user_id : string
    ) : Promise <void>;

    deleteTask(
        id : string,
        user_id : string
    ) : Promise<void>;


} 