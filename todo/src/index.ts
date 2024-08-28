import express , {Request , Response , NextFunction} from "express";
const app = express();

import { PrismaClient } from "@prisma/client";
import cookieParser  from "cookie-parser" 


const prisma = new PrismaClient();

app.use(express.json())
app.use(cookieParser())


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

app.post("/createtodo", wrapAsync(async (req:Request, res : Response) => {
    const { title, description }  : {title : string , description : string}= req.body;
    const sampleId = 1;
    const newtodo = await prisma.todo.create({
      data: {
        title,
        description,
        userId: sampleId,
      },
    });
    res.json(newtodo);
}));

app.get("/alltodos", wrapAsync(async (req : Request, res : Response) => {

    const todos = await prisma.todo.findMany({});
    res.json(todos);
}));


app.get("/alltodos/:id" ,wrapAsync(async(req : Request, res : Response)=>{
        const {id}  = req.params
        const selectedtodo = await prisma.todo.findUnique({
            where  : {id : parseInt(id) }
        })
        if(!selectedtodo){
            res.status(404).json({message : "not found" });
        }else {
            res.json(selectedtodo);
        }
}))

// write a custom express Class ExpressError that sets message and statuscode (remember typescript file




app.listen(3000, () => {
  console.log("running");
});
