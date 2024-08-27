import { Client } from "pg";

const client = new Client({
    host: "localhost",
    port: 5432,
    password: "router",
    database: "sample",
    user: "postgres"
});

const insertData = async (id: number, name: string, age: number) => {
    try {
        await client.connect();

        // Create the table if it does not exist
        await client.query(`CREATE TABLE IF NOT EXISTS student (
            id INT PRIMARY KEY NOT NULL,
            name VARCHAR(100),
            age INT
        );`);

        // Insert the data into the table
        const insertQuery = `INSERT INTO student (id, name, age) VALUES ($1, $2, $3);`
        await client.query(insertQuery, [id, name, age]);

        console.log("Data inserted successfully");
    } catch (err) {
        console.error("Error inserting data:", err);
    } finally {
        await client.end(); // Close the connection
    }
}

// insertData(200, "RAM", 123);

const updateData = async(id: number) =>{
    try{
        await client.connect()
        const update = `UPDATE student SET name = 'Khatr is back' WHERE Id = $1`
        await client.query(update, [id])
    }catch(e){
        console.log(e)
    }
    finally{
        await client.end()
    }
}

updateData(200) ;
