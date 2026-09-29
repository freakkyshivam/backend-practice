
import type { Request, Response } from "express";


export const testController = (req : Request, res : Response)=>{
    return res.status(200).json({
        msg : "Request successfull"
    })
}