import type {Request, Response, NextFunction } from "express";
import { ApiError } from "../errors/ApiError.js";

export const errorHandler = (
    err : Error,
    req : Request,
    res : Response,
    next : NextFunction
)=>{

    let message = "Somthing went wrong";
    let statusCode = 500;

    if(err instanceof ApiError){
        return res.status(err.statusCode).json({
            success : false,
            msg : err.message,
            status : err.statusCode
        })
    }

    return res.status(statusCode).json({
        success : false,
        status : statusCode,
        msg : message
    })
}