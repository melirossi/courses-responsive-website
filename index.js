import express from 'express';
import pool from './config/db.js';

// Create an Express app
const app = express();

// Enable JSON parsing for request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Read all resources
app.get('/courses', async (req, res) => {
    const sql = 'SELECT courses.title, courses.description, courses.duration, courses.language, courses.price, courses.image_url, categories.name as category, levels.name as level, professors.name as professor FROM courses JOIN categories ON courses.category_id = categories.id JOIN levels ON courses.level_id = levels.id JOIN professors ON courses.professor_id = professors.id ORDER By courses.title DESC'; 
    try {
        const connection = await pool.getConnection()
        const [rows] = await connection.query(sql);
        connection.release();
        res.json(rows);
    } catch (error) {
        res.status(500).send('Internal server error');
    }
});

// Read a specific resource
app.get('/courses/:id', async (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT courses.title, courses.description, courses.duration, courses.language, courses.price, courses.image_url, categories.name as category, levels.name as level, professors.name as professor FROM courses JOIN categories ON courses.category_id = categories.id JOIN levels ON courses.level_id = levels.id JOIN professors ON courses.professor_id = professors.id WHERE courses.id = ?';
    try {
        const connection = await pool.getConnection()
        const [rows] = await connection.query(sql, [id]);
        connection.release();
        console.log("UN CURSO -->", rows[0])
        res.json(rows[0]);
    } catch (error) {
        res.status(500).send('Internal server error');
    }
});

// Create a new resource
app.post('/courses', async (req, res) => {
    const course = req.body;
    const sql = 'INSERT INTO courses SET ?';
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql, [course]);
        connection.release();
        console.log(rows);
        res.json(rows); // Usar res.json para enviar una respuesta JSON
    } catch (error) {
        console.error('Error connecting to the database:', error);
        res.status(500).send('Internal server error'); 
    }
});


// Update a specific resource
app.put('/courses/:id', async (req, res) => {
    const id = req.params.id;
    const course = req.body;
    const sql = 'UPDATE courses SET ? WHERE id = ?';
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(sql, [course, id]);
        connection.release();
        console.log(rows);
        res.send(`
            <h1>Producto actualizado id: ${id}</h1>
        `)
    } catch (error) {
        console.error('Error updating the course:', error);
        res.status(500).send('Internal server error');
    } finally {
        if (connection) connection.release();
    }
});

// Delete a specific resource
app.delete('/courses/:id', async (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM courses WHERE courses.id = ?';
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(sql, [id]);
        connection.release();
        console.log(rows);
        res.send(`
            <h1>Producto borrado id: ${id}</h1>
        `)
    } catch (error) {
        console.error('Error connecting to the database:', error);
        res.status(500).send('Internal server error'); // Usar res.status en lugar de res.send
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
