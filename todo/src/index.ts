import express, { Request, Response, NextFunction } from "express";
const app = express();

import { PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";

const prisma = new PrismaClient();

app.use(express.json());
app.use(cookieParser());


import userroute from "./user"
import todoroute from "./todo";
import Custom_Error, { wrapAsync,handleError } from "./error";


app.use("/user",userroute);
app.use("/todo",todoroute)




app.use(handleError)

app.listen(3000, () => {
        console.log("running");
});
