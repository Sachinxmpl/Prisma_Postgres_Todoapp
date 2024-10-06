"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const error_1 = require("./error");
const prisma = new client_1.PrismaClient();
const tokenSecret = "sdfadslfjthisiasecretfilethatwilljustfindandfillthegoodofthebest";
router.post("/signup", (0, error_1.wrapAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user_token = jsonwebtoken_1.default.sign({ username, password }, tokenSecret, { expiresIn: "2h" });
    res.cookie("user-auth", user_token);
    const newUser = yield prisma.todoUser.create({
        data: {
            username,
            password
        },
    });
    res.status(201).json({
        newUser,
        "message": "user created successfully"
    });
})));
router.post("/logout", (0, error_1.wrapAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
})));
router.post("/login", (0, error_1.wrapAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const exixtinguser = yield prisma.todoUser.findUnique({
        where: { username, password }
    });
    if (!exixtinguser) {
        return res.status(401).json({
            "status": "failure",
            "message": "User not found please singup first "
        });
    }
    const user_token = jsonwebtoken_1.default.sign({ username, password }, tokenSecret, { expiresIn: "2h" });
    res.cookie("user-auth", user_token);
    res.status(200).json({
        "status": "success",
        "message": "Logged in successfully "
    });
})));
// const validateToken = (req: Request, res: Response, next: NextFunction) => {
// 	const unverifiedtoken = req.cookies["user-auth"]
// 	jwt.verify(unverifiedtoken, tokenSecret, fu)
// }
exports.default = router;
