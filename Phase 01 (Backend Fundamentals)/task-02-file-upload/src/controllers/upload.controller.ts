
import type { Request, Response } from "express";
import fs from 'node:fs'
import path from "node:path";

export const uploadFile = (req : Request, res : Response)=>{
    try {
        const file = req.file;

        if(!file){
            return res.status(400).json({
                success : false,
                msg : "File is required",
                data : []
            })
        }

         return res.status(201).json({
            success : true,
            msg :"file uploaded",
            data : file
         })

    } catch (err) {
        return res.status(400).json({
            success : false,
            msg : err instanceof Error ? err.message : "File upload error",
            data : []
        })
    }
}

// get file
export const getFile =  (req : Request, res :Response)=>{
    try {
        const {fileName} = req.params

        if(!fileName){
            return res.status(400).json({
                success : false,
                msg : "File name is required",
                data : []
            })
        }

        const filePath = path.join(
            process.cwd(),
            'public/data/uploads',
            fileName as string
        )

     const isFileExists =  fs.existsSync(filePath)
   
        if(!isFileExists){
            return res.status(404).json({
                success : false,
                msg : "File not found",
                data : []
            })
        }

       return res.sendFile(filePath)

    } catch (err) {
        return res.status(400).json({
            success : false,
            msg : err instanceof Error ? err.message : "File upload error",
            data : []
        })
    }
}

export const deleteFile = async (req : Request, res :Response)=>{
    try {
        const {fileName} = req.params

        if(!fileName){
            return res.status(400).json({
                success : false,
                msg : "File name is required",
                data : []
            })
        }

        const filePath = path.join(
            process.cwd(),
            'public/data/uploads',
            fileName as string
        )

     const isFileExists =  fs.existsSync(filePath)
   
        if(!isFileExists){
            return res.status(404).json({
                success : false,
                msg : "File not found",
                data : []
            })
        }

        await fs.promises.rm(filePath)

       return res.status(200).json({
        success : true,
        msg : "File deleted",
        err : [],
        data : []
       })

    } catch (err) {
        return res.status(400).json({
            success : false,
            msg : err instanceof Error ? err.message : "File deletion error",
            data : []
        })
    }
}