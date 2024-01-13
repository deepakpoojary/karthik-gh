
const { Pool}=require('pg');

const pool = new Pool({
    user: "postgres",
    password: "yashmith",
    host: "localhost",
    port: 5432,
    database: "yt_login_system",
});

//for creating tables and databases
/*const createTblQry = `CREATE TABLE accounts1 (
    user_id serial PRIMARY KEY,
    username VARCHAR( 50) UNIQUE NOT NULL,
    password VARCHAR( 50) UNIQUE NOT NULL);`;

pool
    .query(createTblQry)
    .then((Response) =>{
    console.log ("table  Created"); 
    console.log(response); 
    })
    .catch((err) => {
    console.log(err);
    });  */

/* 
const createTblQry = `CREATE TABLE accounts6(
    user_id serial ,
    username VARCHAR( 50) NOT NULL,
    choice BOOLEAN NOT NULL,
    birthdate DATE NOT NULL);`;

pool
    .query(createTblQry)
    .then((Response) =>{
    console.log ("table1  Created"); 
    console.log(response); 
    })
    .catch((err) => {
    console.log(err);
    });  
*/
module.exports=pool;


