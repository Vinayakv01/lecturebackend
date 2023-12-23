const express = require('express');
const db = require('../services/db');

const router = express.Router();
router.use(express.json());

// Route to add a new course
router.post('/addcourse', async (req, res) => {
  try {
    const { Name, Level, Description } = req.body;

    // Validate input
    if (!Name || !Level || !Description) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Insert the new course into the database
    const result = await db.query(
      'INSERT INTO courses (Name, Level, Description) VALUES (?, ?, ?)',
      [Name, Level, Description]
    );

    // Respond with the newly created course
    const newCourseId = result.insertId;
    const newCourse = { CourseID: newCourseId, Name, Level, Description };
    res.status(201).json(newCourse);
  } catch (error) {
    console.error('Error adding course:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
