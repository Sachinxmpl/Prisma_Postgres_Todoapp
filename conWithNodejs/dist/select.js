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
    password: "router",
    database: "sample",
    user: "postgres"
});
const insertData = (id, name, age) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        // Create the table if it does not exist
        yield client.query(`CREATE TABLE IF NOT EXISTS student (
            id INT PRIMARY KEY NOT NULL,
            name VARCHAR(100),
            age INT
        );`);
        // Insert the data into the table
        const insertQuery = `INSERT INTO student (id, name, age) VALUES ($1, $2, $3);`;
        yield client.query(insertQuery, [id, name, age]);
        console.log("Data inserted successfully");
    }
    catch (err) {
        console.error("Error inserting data:", err);
    }
    finally {
        yield client.end(); // Close the connection
    }
});
// insertData(200, "RAM", 123);
const updateData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        const update = `UPDATE student SET name = 'Khatr is back' WHERE Id = $1`;
        yield client.query(update, [id]);
    }
    catch (e) {
        console.log(e);
    }
    finally {
        yield client.end();
    }
});
updateData(200);
