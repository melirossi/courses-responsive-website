import { createPool } from "mysql2/promise";

// Create connection pool
const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'melisa',
    database: 'skill_bridge',
    port: 3307,
    connectionLimit: 5 // Adjust the connection limit as per your requirements
});

// Test connection
pool.getConnection()
    .then(connection => {
        console.log('Connected to the database');
        connection.release();
    })
    .catch(error => {
        console.log('Error connecting to the database:', error);
        if (error.code === 'ETIMEDOUT') {
            console.log('Connection timed out. Please check your database server and network settings.');
        }
    });

export default pool;