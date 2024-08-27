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
const client = new pg_1.Client({
    host: "localhost",
    port: 5432,
    database: "sample",
    user: "postgres",
    password: "router",
});
const create = (username, password, age, city, pincode) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        yield client.query(`CREATE TABLE IF NOT EXISTS users (id serial primary key, username varchar(50), password varchar(100), age int)`);
        console.log("Users table created");
        yield client.query(`CREATE TABLE IF NOT EXISTS addresses (
        id serial primary key, 
        user_id int not null, 
        city varchar(50), 
        pincode int, 
        foreign key (user_id) references users(id) on delete cascade
      )`);
        console.log("Addresses table created");
        const res = yield client.query(`INSERT INTO users (username, password, age) VALUES ($1, $2, $3) RETURNING id`, [username, password, age]);
        const userId = res.rows[0].id;
        const res2 = yield client.query(`INSERT INTO addresses (user_id, city, pincode) VALUES ($1, $2, $3)`, [userId, city, pincode]);
        console.log("Address inserted successfully", res2);
    }
    catch (e) {
        console.log("Error:", e);
    }
    finally {
        yield client.end();
    }
});
// create("test1", "<newpassword>", 30, "city1", 123456);
//! using joins to get the combines data from the combines talble 
const getData = (username, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        const query = `
            SELECT users.id, users.username, users.password, users.age, addresses.city, addresses.pincode 
            FROM users 
            JOIN addresses ON addresses.user_id = users.id 
            WHERE users.username = $1 AND users.id = $2
        `;
        const res = yield client.query(query, [username, userId]);
        console.log(res.rows);
    }
    catch (e) {
        console.log("error", e);
    }
    finally {
        yield client.end();
    }
});
getData("test1", 1);
