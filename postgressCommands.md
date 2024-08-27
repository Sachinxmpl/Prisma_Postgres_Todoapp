###  Show all the database in psql shell
- \l
### Clear terminal
- \! cls

### Create a new databse 
- CREATE DATABASE <database_name>;


### Switch databse
- \c <databse name>

### We can also perform simple arithemetic operation in psql shell.
- select 1 + 1;
- select 4+(3*5)

### Create a table 
- CREATE TABLE <table_name>(column_name datatype);

- Example CREATE TABLE student(id int, name varchar(20), age int);

### insert data into the created table.
- INSERT INTO <table_name> (columns) VALUES (<values>) ;
- example: 	INSERT INTO student (id, name, age) VALUES (1,'John',23)

### display all table 
- select * from <table_name>;
- example :  select * from student;


### Conditional display 
- SELECT <columns> FROM <table_name> WHERE <condition>;
- select * from student where name = 'adsf'
- select * from student where age between 200 and 230;
- select id from student where age <1000;
- select * from student where age in (224 , 2343);

### Update data in the table.
- UPDATE <table_name> SET <column1>=<value1>, <column2>=<value2>
- update student set name = 'updatedname' where id = 1 

### Delete column in table 
- ALTER TABLE <table_name> DROP COLUMN <column_name>;
- example:  alter table student drop column age;

### Delete data from the table.
- DELETE FROM <table_name> WHERE <condition>;
- delete from student where id = 1;

### Delete table
- DROP TABLE <table_name>;
- example:  drop table student;

### Delete databse 
- DROP DATABASE <database_name>;
- example:  drop database testdb;



# Realtions in postgress using foeign keys 

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE addresses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    street VARCHAR(255) NOT NULL,
    pincode VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


### using joins to get data from talbe users and addresses 
- SELECT <columns> FROM <table1> INNER JOIN <table2> ON <condition> WHERE <condition>;
- example:  select * from users inner join addresses on users.id = addresses.user_id where city like '%city%' and country like '%country%';