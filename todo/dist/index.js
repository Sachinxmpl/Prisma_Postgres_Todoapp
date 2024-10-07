"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const client_1 = require("@prisma/client");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
const user_1 = __importDefault(require("./user"));
const todo_1 = __importDefault(require("./todo"));
const error_1 = require("./error");
app.use("/user", user_1.default);
app.use("/todo", todo_1.default);
app.use(error_1.handleError);
// app.use((err : CustomError , req :Request , res :Response , next :NextFunction)=>{
//         res.json({
//                 message : err.message || "Default error " , 
//                 status : err.statusCode || 500
//         })
// })
app.listen(3000, () => {
    console.log("running");
});
