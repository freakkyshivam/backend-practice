
export class AppError extends Error{

  statusCode: number;
  isOperational: boolean;

    constructor(
        msg : string,
        statusCode : number
    ){
        super(msg);

        this.statusCode = statusCode;
        this.isOperational = true

        Error.captureStackTrace(this, this.constructor)
    }
}

export default AppError;