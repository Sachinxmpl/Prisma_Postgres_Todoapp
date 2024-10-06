import { NextFunction, Request, Response } from "express";

class CustomError extends Error {
            public statusCode: number;
            public message: string;

            constructor(statusCode: number,message: string) {
                        super(); 
                        this.statusCode = statusCode;
                        this.message= message ; 

                        
                        if (Error.captureStackTrace) {
                                    Error.captureStackTrace(this, this.constructor);
                        }
            }
}



function wrapAsync(fn:any) {
            return function (req: Request, res: Response, next: NextFunction) {
                        fn(req, res, next).catch(next); 
            };
}


const handleError = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
            const status = err.statusCode || 500; 
            const message = err.message || 'Internal Server Error';

            res.status(status).json({
                        success: false,
                        status,
                        message
            });
};

export {
            wrapAsync,
            handleError
};

export default CustomError;
