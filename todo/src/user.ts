import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const tokenSecret =
    "sdfadslfjthisiasecretfilethatwilljustfindandfillthegoodofthebest";

type AsyncRouteHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void>;

function wrapAsync(fn: AsyncRouteHandler) {
    return function (req: Request, res: Response, next: NextFunction) {
        fn(req, res, next).catch(next);
    };
}

router.post(
    "/signup",wrapAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        
        const {username , password} = req.body  ; 
        const user_token = jwt.sign({ username , password}, tokenSecret , {expiresIn: "2h"})
        res.cookie("user-auth", user_token)

        const newUser = await prisma.todoUser.create({
            data : {
                username  , 
                password
            } , 
        })

        res.status(201).json({
            newUser , 
            "message" : "user created successfully" 
        })

    }
));


// router.post("/logout" ,wrapAsync(async (req: Request , res: Response , next: NextFunction) =>{
//     const loggedOut = 
// }))


const validateToken = (req : Request , res : Response , next : NextFunction) =>{
    const unverifiedtoken  = req.cookies["user-auth"]
    jwt.verify(unverifiedtoken , tokenSecret , fu)
}



export default router;
