const express = require('express');
const db = require('../services/db'); // Adjust the path accordingly

const router = express.Router();
router.use(express.json());

// Route to create a new lecture
router.post('/lectures', async (req, res) => {
    const { date, courseId, instructorId, batch } = req.body;

    try {
        // Check if there is already a lecture scheduled for the same date, course, instructor, and batch
        const existingLecture = await db.query('SELECT * FROM lectures WHERE Date = ? AND CourseID = ? AND InstructorID = ? AND Batch = ?', [date, courseId, instructorId, batch]);

        if (existingLecture.length > 0) {
            return res.status(400).json({ error: 'A lecture for this course, instructor, and batch is already scheduled on this date' });
        }

        // Insert the new lecture into the database
        const result = await db.query('INSERT INTO lectures (Date, CourseID, InstructorID, Batch) VALUES (?, ?, ?, ?)', [date, courseId, instructorId, batch]);

        // Send the newly created lecture data in the response
        const createdLecture = await db.query('SELECT * FROM lectures WHERE LectureID = ?', [result.insertId]);
        res.status(201).json(createdLecture[0]);
    } catch (error) {
        console.error('Error creating lecture:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
