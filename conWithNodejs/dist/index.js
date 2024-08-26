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
const pg_1 = require("pg");
//  this is not the right syntax to use , this is inssecure sql injections are possible
// async function run() {
//     await client.connect()
//     const result = await client.query(`CREATE TABLE person (id SERIAL PRIMARY KEY, name VARCHAR(50), age INT);`)
//     // now add sample person to talbe person
//     const addUser = await client.query(`INSERT INTO person (name,age) VALUES ('John',30);`)
//     console.log(addUser)
// }
// run();
function better(name, age) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new pg_1.Client({
            host: "localhost",
            port: 5432,
            database: "sample",
            user: "postgres",
            password: "router",
        });
        try {
            yield client.connect();
            yield client.query(`CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, name VARCHAR(50), age INT);`);
            const insertQuery = `INSERT INTO users (name, age) VALUES ($1, $2);`;
            yield client.query(insertQuery, [name, age]);
        }
        catch (e) {
            console.log(e);
        }
        finally {
            yield client.end();
        }
    });
}
better("shamsher", 30);
