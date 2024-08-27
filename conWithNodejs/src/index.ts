import { Client } from "pg";

//  this is not the right syntax to use , this is inssecure sql injections are possible
// async function run() {
//     await client.connect()
//     const result = await client.query(`CREATE TABLE person (id SERIAL PRIMARY KEY, name VARCHAR(50), age INT);`)

//     // now add sample person to talbe person
//     const addUser = await client.query(`INSERT INTO person (name,age) VALUES ('John',30);`)
//     console.log(addUser)
// }

// run();

async function better(name: string, age: number) {
  const client = new Client({
    host: "localhost",
    port: 5432,
    database: "sample",
    user: "postgres",
    password: "router",
  });
  try {
    await client.connect();
    await client.query(
      `CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, name VARCHAR(50), age INT);`
    );
    const insertQuery = `INSERT INTO users (name, age) VALUES ($1, $2);`;
    await client.query(insertQuery, [name, age]);
  } catch (e) {
    console.log(e);
  } finally {
    await client.end();
  }
}

better("shamsher", 30);






