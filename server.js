const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({ origin: '*' }));

const db = mysql.createPool({
  host: 'safety.megc.ph',
  user: 'safety',
  password: 'safety2025',
  database: 'megc',
  port: 3306, // MySQL default port is 3306, not 22
});

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});

// Endpoint to get equipment numbers
app.get('/api/equipment', async (req, res) => {
  try {
    const query = 'SELECT equipment_number FROM equipment';
    const [results] = await db.query(query);

    if (results.length === 0) {
      return res.status(404).json({ message: 'No equipment found' });
    }

    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching equipment data:', err);
    res.status(500).json({ message: 'Server error occurred while fetching equipment data.' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});