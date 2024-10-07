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
const error_1 = require("./error");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
const Prisma = new client_1.PrismaClient();
const utils_1 = require("./utils");
router.post("/createtodo", utils_1.isLoggedIN, (0, error_1.wrapAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    const sampleId = 1;
    const newtodo = yield Prisma.todo.create({
        data: {
            title,
            description,
            userId: sampleId,
        },
    });
    res.json(newtodo);
})));
router.get("/alltodos", utils_1.isLoggedIN, (0, error_1.wrapAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield Prisma.todo.findMany({});
    res.json(todos);
})));
router.get("/alltodos/:id", utils_1.isLoggedIN, (0, error_1.wrapAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const selectedtodo = yield Prisma.todo.findUnique({
        where: { id: parseInt(id) },
    });
    if (!selectedtodo) {
        res.status(404).json({ message: "not found" });
    }
    else {
        res.json(selectedtodo);
    }
})));
exports.default = router;
