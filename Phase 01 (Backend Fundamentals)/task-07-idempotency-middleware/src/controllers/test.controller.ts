 
import type { Request, Response } from "express";

export const testController = (req : Request, res : Response)=>{

    const {productId, quantity} = req.body;
    console.log("CONTROLLER HIT");
    return res.status(201).json({
        success : true,
        msg : "Order created",
        data : {
            productId,
            quantity
        }
    })
}