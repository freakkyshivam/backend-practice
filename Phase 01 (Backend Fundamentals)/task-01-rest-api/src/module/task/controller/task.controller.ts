import type { TaskService } from "../services/task.service.js";
import type { Request, Response } from "express";

import { UnauthorizedError } from "../../../errors/UnauthorizedError.js";
import { BadRequestError } from "../../../errors/BadRequestError.js";
import { NotFoundError } from "../../../errors/NotFoundError.js";
import type { TaskStatus } from "../../../domain/types/task.types.js";

export class TaskController {

    constructor(
        private readonly taskService : TaskService
    ){

    }

    // create task
    createTask = async (req : Request, res : Response)=>{

        
        try {
            const user_id  = req.user_id;

            if(!user_id){
                 return res.status(401).json({
                    status : false,
                    msg : 'User is not authenticated',
                    data : []
                 })
            }

            const {title, description} = req.body;

            if(!title){
                return res.status(400).json({
                    status : false,
                    msg : "Title is required",
                    data : []
                })
            }

            const result = await this
            .taskService.
            createTask(
                user_id,
                title,
                description
            )

            if(!result){
                throw Error("Task creation error")
            }

            return  res.status(201).json({
                status : true,
                msg : "Taks created",
                data : result
            })
        } catch (err) {
            return res.status(500).json({
                status : false,
                msg : process.env.NODE_ENV === "production" ? 
                "Somthing went wrong": err instanceof Error ? err.message : "Task creation failed",

                data : []
            })
        }
    }

    // get all user tasks
    getAllTasks = async (req : Request, res : Response)=>{
        try {

            const user_id = req.user_id;

            if(!user_id){
                return res.status(401).json({
                    status : false,
                    msg : "User is not authenticated",
                    data : []
                })
            }

            const {page, limit, status} = req.query;
            

            const tasks = await this
            .taskService
            .getAllTask(
                user_id,
                Number(page),
                Number(limit),
                status as TaskStatus
            )

             return res.status(200).json({
                status : true,
                msg : "Task fetched",
                data : tasks
             })
            
        } catch (err) {
            return res.status(500).json({
                status : false,
                msg : process.env.NODE_ENV === "production" ? 
                "Somthing went wrong": err instanceof Error ? err.message : "Somthing went wrong",

                data : []
            })
        }
    }

    // get single task
    getSingleTask = async (req : Request, res : Response)=>{
        try {
            
            const user_id = req.user_id;
             if(!user_id){
                return res.status(401).json({
                    status : false,
                    msg : "User is not authenticated",
                    data : []
                })
            }

            const {id} = req.params;

            if(!id){
                return res.status(400).json({
                    status : false,
                    msg : "Id is required",
                    data : []
                })
            }

            const task = await this.taskService.getSingleTask(id as string,user_id);

            if(!task){
                return res.status(404).json({
                    status : false,
                    msg : "Task not found",
                    data : []
                })
            }

            return res.status(200).json({
                status : true,
                msg : "Task found",
                data : task
            })

        } catch (err) {
             return res.status(500).json({
                status : false,
                msg : process.env.NODE_ENV === "production" ? 
                "Somthing went wrong": err instanceof Error ? err.message : "Get single task error",

                data : []
            })
        }
    }

    // update task
    updateTask = async(req : Request, res : Response)=>{
        try {
            const user_id = req.user_id;

             if(!user_id){
                return res.status(401).json({
                    status : false,
                    msg : "User is not authenticated",
                    data : []
                })
            }

            const {key, value} = req.body;
            const {id} = req.params;

            if(!key || !value || !id){
                return res.status(400).json({
                    status : false,
                    msg : "Key and value and id are required",
                    data : [],
                })
            }

            await this.taskService.updateTask(key,value,id as string, user_id);

            return res.status(200).json({
                status : true,
                msg : "Task updated",
                data : []
            })
        } catch (err) {
             return res.status(500).json({
                status : false,
                msg : process.env.NODE_ENV === "production" ? 
                "Somthing went wrong": err instanceof Error ? err.message : "Task updation error",

                data : []
            })
        }
    }

    // delete task
      deleteTask = async(req : Request, res : Response)=>{
        try {
            const user_id = req.user_id;

             if(!user_id){
                return res.status(401).json({
                    status : false,
                    msg : "User is not authenticated",
                    data : []
                })
            }

            const {id} = req.params;

            if(!id){
                return res.status(400).json({
                    status : false,
                    msg : "Id is required",
                    data : [],
                })
            }

            await this.taskService.deleteTask(id as string, user_id);

            return res.status(200).json({
                status : true,
                msg : "Task deleted",
                data : []
            })
        } catch (err) {
             return res.status(500).json({
                status : false,
                msg : process.env.NODE_ENV === "production" ? 
                "Somthing went wrong": err instanceof Error ? err.message : "Task deletion error",

                data : []
            })
        }
    }
}