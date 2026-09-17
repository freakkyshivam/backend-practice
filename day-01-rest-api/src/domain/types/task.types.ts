export type Task = {
    id : string,
    user_id : string,
    title : string,
    description : string | null,
    status : "pending" | "completed",
    createdAt :  Date | null,
    updatedAt : Date | null

}

export type TaskStatus = "pending" | "completed";

export type TaskUpdateKey = "title" | "description" | "status";