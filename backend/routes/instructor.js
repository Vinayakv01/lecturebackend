const express = require('express');
const db = require('../services/db');

const router = express.Router();
router.use(express.json());

// Create an instructor
router.post('/instructors', async (req, res) => {
  try {
    const { Name, Email } = req.body;

    // Validate input
    if (!Name || !Email) {
      return res.status(400).json({ error: 'Name and Email are required fields' });
    }

    // Insert the new instructor into the database
    const result = await db.query('INSERT INTO instructors (Name, Email) VALUES (?, ?)', [Name, Email]);

    // Respond with the newly created instructor
    const newInstructorId = result.insertId;
    const newInstructor = { InstructorID: newInstructorId, Name, Email };
    res.status(201).json(newInstructor);
  } catch (error) {
    console.error('Error creating instructor:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
