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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function createUser(name, password, email, age) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.user.create({
            data: {
                name,
                email,
                password,
                age,
            },
            select: {
                name: true,
                email: true,
                age: true,
                password: false
            }
        });
        console.log(res);
    });
}
// createUser("shasmher" , "passwword232" , "sachinxmpl6@gmailc.on" , 23)
// createUser("sachin" , "sachinxmpl6" , "kck588385@gmail.com" , 40 )
function update(name, email) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.user.update({
            where: { email: email },
            data: {
                name: name
            },
            select: {
                password: false,
                name: true,
                email: true,
                id: true,
                age: true
            }
        });
        console.log(res);
    });
}
// update("updateduser" , "kck588385@gmail.com")
function getUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.user.findMany({
            where: { age: { gt: 20 } }
        });
        console.log(res);
    });
}
getUser();
