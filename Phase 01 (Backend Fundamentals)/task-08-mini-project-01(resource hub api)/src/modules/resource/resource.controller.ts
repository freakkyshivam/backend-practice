import type { Request, Response } from "express";
import type { ResourceServie } from "./resource.service.js";
import {resourcesCreationValidation} from './resources.validator.js'

export class ResourceController {

    constructor(
        private readonly resourceService : ResourceServie
    ){}

    create = async(req : Request, res : Response)=>{
        try {
            
        
            const validationResult = resourcesCreationValidation.safeParse(req.body)
            
            if(!validationResult.success){
                return res.status(400).json({
                    success : false,
                    msg : validationResult.error.flatten().fieldErrors,
                    data : []
                })
            }

            const {title , description, type} = validationResult.data

            const result = await this
            .resourceService
            .create(
                title,
                description,
                type
            )

            return res.status(201).json({
                success : true,
                msg : "Resource created",
                data : result
            })
            
        } catch (err) {
            return res.status(400).json({
                success : false,
                data : [],
                msg : err instanceof Error ? err.message : "Resource creation error"
            })
        }

    }

    // get all resources
     getAll = async (req : Request, res : Response)=>{
            try {

                const {limit, page,search} = req.query;

                const result = await this.resourceService.getAll(
                    Number(limit),
                    Number(page),
                    search as string
                )

                if(!result){
                    return res.status(400).json({
                        success : false,
                        msg : "Resource not found",
                        data : []
                    })
                }

                const {resources, meta} = result;

                return res.status(200).json({
                    success : true,
                    msg : "Resources found",
                    data : resources,
                    meta
                })
                
            } catch (err) {
                return res.status(404).json({
                    success : false,
                    msg : err instanceof Error ? err.message : "Something went wrong"
                })
            }
        }

        // get single task

        getSingle  = async(req :Request, res : Response)=>{
            try {
                const {id} = req.params;

                if(!id){
                    return res.status(400).json({
                        success : false,
                        msg :"Id is required",
                        data : []
                    })

                }

                const result = await this.resourceService.getSingle(id as string);

                return res.status(200).json({
                    success : true,
                    msg : "Resource found",
                    data : result
                })

            } catch (err) {
                return res.status(404).json({
                    success : false,
                    data : [],
                    msg : err instanceof Error ? err.message : ""
                })
            }
        }

        // update resource
        update = async(req : Request, res : Response)=>{
            try {

                const {key, value} = req.body;

                if(!key || !value){
                    return res.status(400).json({
                        success : false,
                        msg : "All fields are required",
                        data : []
                    })
                }

                const {id} = req.params;

                if(!id){
                    return res.status(400).json({
                        success: false,
                        msg : "Resource id is required",
                        data : []
                    })
                }

                if(key !== 'title' || key !== "description" || key !== 'url'){
                    return res.status(400).json({
                        success : false,
                        msg : "Invalid update request",
                        data : [],
                        allowed : ['title', 'description', 'url']
                    })
                }

                await this
                .resourceService
                .update(id as string, key, value);

                return res.status(200).json({
                    success : false,
                    msg : "Resource updated",
                    data : []
                })
            } catch (err) {
                return res.status(500).json({
                    success : false,
                    data : [],
                    msg : err instanceof Error ? err.message : "Resource updation error",
                })
            }
        }

        // delete
        delete = async(req : Request, res : Response)=>{
            try {

                const {id} = req.params;

                if(!id){
                    return res.status(400).json({
                        success : false,
                        msg : 'Resource id is required',
                        data : []
                    })
                }

                await this.resourceService.delete(id as string);

                return res.status(200).json({
                    success : true,
                    msg : "Resource deleted",
                    data : []
                })
                
            } catch (err) {
                return res.status(500).json({
                    success : false,
                    data : [],
                    msg : err instanceof Error ? err.message : "Resource updation error"
                })
            }
        }

        fileUpload = async (req : Request, res : Response)=>{
            try {
                const {id} = req.params;

                if(!id){
                    return res.status(400).json({
                        success : false,
                        msg : 'Resource id is required',
                        data : []
                    })
                }

                const uploaded_resource = req.file;

                if(!uploaded_resource){
                    return res.status(400).json({
                        success : false,
                        msg : "File is required",
                        data : []
                    })
                }
                await this.resourceService.fileUpload(
                    id as string,
                   uploaded_resource.path
                )
                return res.status(200).json({
                    success : true,
                    msg : "File uploaded",
                    data : uploaded_resource
                })
            } catch (err) {
                throw err;
            }
        }
}