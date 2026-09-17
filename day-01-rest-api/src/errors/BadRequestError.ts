import { AppError } from "./AppError.js";

export class BadRequestError extends AppError{

    constructor(
        message : "Bad request",
        data ?: unknown,
        details ?: unknown
    ){
        super(message,{
            status : 400,
            code : "BAD_REQUEST",
            data,
            details
        })
    }
}