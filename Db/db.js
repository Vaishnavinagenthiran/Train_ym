//connectivity code server 

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';


dotenv.config();

const db=mysql.createPool({
    host:process.env.SQL_HOST,
    database:process.env.SQL_DB,
    user:process.env.SQL_USER,
    password:process.env.SQL_PASS,
    port:process.env.SQL_PORT,
    waitForConnections:true,
    connectionLimit: 10,
    queueLimit:0

})

export const connectDB= async () => {
    try{
   const connection = await db.getConnection();
   console.log("Database connected successfully");
    connection.release();
      
} catch(err){
    console.error("Connection is not establish:", err);
    process.exit(1);
}
}
export default db;
