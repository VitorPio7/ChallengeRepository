export default class AppError extends Error {
    constructor(messsage, statusCode){
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4')?'fail':error;
        
        Error.captureStackTrace(this, this.constructor);
    }
}

