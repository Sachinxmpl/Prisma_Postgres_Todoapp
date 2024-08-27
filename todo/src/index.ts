import express , {Request , Response , NextFunction} from "express";
const app = express();

import { PrismaClient } from "@prisma/client";
import { wrap } from "module";

const prisma = new PrismaClient();

app.use(express.json())

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

class ExpressError extends Error {
    constructor( private message : string  , private statusCode :  number ){
        super() ; 
        this.message  = message ; 
        this.statusCode = statusCode ;
    }
}


app.use((err : ExpressError, req : Request, res : Response, next : NextFunction) => {
    let { statusCode = 500, message = "This is DEFAULT error message " } = err;
    res.status(statusCode).render("./lists/error.ejs", { error: err });
  });



app.listen(3000, () => {
  console.log("running");
});
