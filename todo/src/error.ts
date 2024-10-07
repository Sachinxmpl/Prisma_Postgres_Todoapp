import { NextFunction, Request, Response } from "express";

class CustomError extends Error {
            public statusCode: number;
            public message: string;

            constructor(statusCode: number,message: string) {
                        super(); 
                        this.statusCode = statusCode;
                        this.message= message ; 
            }
}



function wrapAsync(fn:any) {
            return function (req: Request, res: Response, next: NextFunction) {
                        fn(req, res, next).catch(next); 
            };
}


const handleError = (err: CustomError, req: any, res: any, next: any) => {
            const status = err.statusCode || 500; 
            const message = err.message || 'Internal Server Error';

            if(err instanceof CustomError) {
                        return res.status(status).json({
                                    "error" : message  , 
                                    "success" : false 
                        })
            }


            return res.status(status).json({
                        "success": false,
                        "error" :      "Unidenfitied error"
            });
};

export {
            wrapAsync,
            handleError
};

export default CustomError;
