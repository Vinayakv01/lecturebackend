const express = require('express');
const db = require('../services/db');

const router = express.Router();
router.use(express.json());

// Route to get all instructors
router.get('/getinstructor', (req, res) => {
  // Query the database to retrieve all instructors
  const query = 'SELECT * FROM instructors';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error executing SQL query: ', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    // Send the retrieved instructors as JSON response
    res.json(result);
  });
});

module.exports = router;
