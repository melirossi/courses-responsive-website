import { createPool } from "mysql2/promise";

// Create a connection pool
const pool = createPool({
    host: 'br0nttbzusolrkjz2drq-mysql.services.clever-cloud.com',
    user: 'unyu9w8seqxx6enb',
    password: 'pC47CwcDBFgsmKILjqrl',
    database: 'br0nttbzusolrkjz2drq',
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