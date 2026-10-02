
import type { Request, Response, NextFunction } from "express";
import { AppError} from "../errors/AppErrors.js";

export const errorHandler = (
    err : Error,
    req : Request,
    res : Response,
    next : NextFunction
)=>{
    let statusCode = 500;
  let message = "Internal Server Error";

  if(err instanceof AppError){
    statusCode = err.statusCode,
    message = err.message
  }

  return res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
  })
}

export default errorHandler;