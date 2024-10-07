
import express, { Request, Response, NextFunction } from "express"
import { wrapAsync } from "./error";
import { PrismaClient } from "@prisma/client";
const router = express.Router();

const Prisma = new PrismaClient();
import { isLoggedIN } from "./utils";

router.post(
            "/createtodo",
            isLoggedIN , 
            wrapAsync(async (req: Request, res: Response) => {
                        const { title, description }: { title: string; description: string } =
                                    req.body;
                        const sampleId = 1;
                        const newtodo = await Prisma.todo.create({
                                    data: {
                                                title,
                                                description,
                                                userId: sampleId,
                                    },
                        });
                        res.json(newtodo);
            })
);

router.get(
            "/alltodos",
            isLoggedIN , 
            wrapAsync(async (req: Request, res: Response) => {
                        const todos = await Prisma.todo.findMany({});
                        res.json(todos);
            })
);

router.get(
            "/alltodos/:id",
            isLoggedIN,
            wrapAsync(async (req: Request, res: Response) => {
                        const { id } = req.params;
                        const selectedtodo = await Prisma.todo.findUnique({
                                    where: { id: parseInt(id) },
                        });
                        if (!selectedtodo) {
                                    res.status(404).json({ message: "not found" });
                        } else {
                                    res.json(selectedtodo);
                        }
            })
);



export default router; 