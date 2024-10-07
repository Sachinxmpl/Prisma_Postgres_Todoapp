import { Request, Response, NextFunction } from "express";
import CustomError from "./error";
import jwt from "jsonwebtoken";
import { tokenSecret } from "./user";

export async function isLoggedIN(req: any, res: Response, next: NextFunction) {
            const loggedincookies = req.cookies["user-auth"]
            if (!loggedincookies) {
                        return next(new CustomError(401 , "You are not logged in please"))
            }
            try {
                        const decoded = jwt.verify(loggedincookies, tokenSecret)
                        console.log(decoded)
                        req.user = decoded;
                        next();
            }
            catch (e) {
                        throw new CustomError(501, "Something went wrong in verifying jwt ");
                        return next(new CustomError(501 , "Something went wrong ")) ; 
            }
}