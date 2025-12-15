const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// DATABASE CONFIGURATION
const pool = new Pool({
  user: 'postgres',        // Default user
  host: 'localhost',
  database: 'lifeline_db',
  password: 'your_password', // CHANGE THIS to your Postgres password
  port: 5432,
});

// ROUTE 1: RECEIVE SOS FROM MOBILE
app.post('/api/sos', async (req, res) => {
  const { lat, long, description } = req.body;

  try {
    // 1. Ask Python AI for priority score
    // Note: Python must be running on port 8000
    const aiResponse = await axios.post('http://127.0.0.1:8000/analyze', {
      description: description
    });
    const priority = aiResponse.data.priority_score;

    // 2. Save to Database
    const newTicket = await pool.query(
      'INSERT INTO sos_requests (latitude, longitude, description, priority_score) VALUES ($1, $2, $3, $4) RETURNING *',
      [lat, long, description, priority]
    );

    res.json(newTicket.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// ROUTE 2: GET ALL SOS FOR WEB DASHBOARD
app.get('/api/sos', async (req, res) => {
  try {
    const allTickets = await pool.query('SELECT * FROM sos_requests ORDER BY priority_score DESC');
    res.json(allTickets.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log('Node Server running on port 5000');
});