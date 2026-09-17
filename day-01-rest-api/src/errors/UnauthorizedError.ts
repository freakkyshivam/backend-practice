import { AppError } from "./AppError.js";

export class UnauthorizedError extends AppError{
    
    constructor(
        message : "Unauthorized",
        data ?: unknown,
        details ?: unknown
    ){
        super(message, {
            status : 401,
            code : "UNAUTHORIZED",
            data,
            details
        })
    }
}