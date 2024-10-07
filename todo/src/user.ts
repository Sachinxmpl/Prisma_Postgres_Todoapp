import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { wrapAsync } from "./error";

const prisma = new PrismaClient()

export const tokenSecret =
	"sdfadslfjthisiasecretfilethatwilljustfindandfillthegoodofthebest";


router.post(
	"/signup", wrapAsync(
		async (req: Request, res: Response, next: NextFunction) => {

			const { username, password } = req.body;

			const user_token = jwt.sign({ username, password }, tokenSecret, { expiresIn: "2h" })
			res.cookie("user-auth", user_token)

			const newUser = await prisma.todoUser.create({
				data: {
					username,
					password
				},
			})

			res.status(201).json({
				newUser,
				"message": "user created successfully"
			})

		}
	));


router.post("/logout",
	wrapAsync(
		async (req: Request, res: Response, next: NextFunction) => {
			const usercookie = req.cookies["user-auth"];
			if (usercookie) {
				res.clearCookie("user-auth");
				return res.status(200).json({
					"message": "logged out successfully",
					"status": "success"
				});
			}
			 res.status(401).json({
				"status": "failure",
				"message": "login first"
			});
	})
);


router.post("/login",
	wrapAsync(
		async(req : Request, res : Response, next: NextFunction)=>{
				const {username , password} = req.body ; 

				const exixtinguser = await prisma.todoUser.findUnique({
					where : {username , password}
				})

				if(!exixtinguser){
						return res.status(401).json({
							"status" : "failure" , 
							"message" : "User not found please singup first "
						})
				}

				const user_token = jwt.sign({username , password} , tokenSecret , {expiresIn : "2h"}) ; 
				res.cookie("user-auth", user_token) ; 
				res.status(200).json({
					"status" : "success" , 
					"message" :"Logged in successfully "
				})
		}
	)
)

// const validateToken = (req: Request, res: Response, next: NextFunction) => {
// 	const unverifiedtoken = req.cookies["user-auth"]
// 	jwt.verify(unverifiedtoken, tokenSecret, fu)
// }



export default router;
