import { Client } from "pg";

const client = new Client({
  host: "localhost",
  port: 5432,
  database: "sample",
  user: "postgres",
  password: "router",
});

const create = async (
  username: string,
  password: string,
  age: number,
  city: string,
  pincode: number
) => {
  try {
    await client.connect();

    await client.query(
      `CREATE TABLE IF NOT EXISTS users (id serial primary key, username varchar(50), password varchar(100), age int)`
    );

    console.log("Users table created");

    await client.query(
      `CREATE TABLE IF NOT EXISTS addresses (
        id serial primary key, 
        user_id int not null, 
        city varchar(50), 
        pincode int, 
        foreign key (user_id) references users(id) on delete cascade
      )`
    );

    console.log("Addresses table created");

    const res = await client.query(
      `INSERT INTO users (username, password, age) VALUES ($1, $2, $3) RETURNING id`,
      [username, password, age]
    );

    const userId = res.rows[0].id;

    const res2 = await client.query(
      `INSERT INTO addresses (user_id, city, pincode) VALUES ($1, $2, $3)`,
      [userId, city, pincode]
    );

    console.log("Address inserted successfully", res2);
  } catch (e) {
    console.log("Error:", e);
  } finally {
    await client.end();
  }
};

// create("test1", "<newpassword>", 30, "city1", 123456);




//! using joins to get the combines data from the combines talble 

const getData = async (username: string, userId: number) => {
    try {
        await client.connect();

        const query = `
            SELECT users.id, users.username, users.password, users.age, addresses.city, addresses.pincode 
            FROM users 
            JOIN addresses ON addresses.user_id = users.id 
            WHERE users.username = $1 AND users.id = $2
        `;

        const res = await client.query(query, [username, userId]);

        console.log(res.rows);
    } catch (e) {
        console.log("error", e);
    } finally {
        await client.end();
    }
};

getData("test1", 1);
