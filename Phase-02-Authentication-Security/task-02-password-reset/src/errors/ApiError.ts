
export class ApiError extends Error{

    statusCode : Number
    isOperational : boolean

    constructor(
        msg : string,
        statusCode : number
    ){
        super(msg);

        this.isOperational = true,
        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor)
    }
}