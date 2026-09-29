import type { Request, Response, NextFunction } from "express";


export const currUser = (req : Request, res : Response, next : NextFunction)=>{

    try {
        const user_id = req.cookies.user_id;

    if(!user_id){
        throw new Error("User is not found from cookie")
    }

    req.user_id = user_id;

    next();
    } catch (error) {
        return res.status(401).json({
            msg : error instanceof Error ? error.message : "Cookie not found"
        })
    }


}