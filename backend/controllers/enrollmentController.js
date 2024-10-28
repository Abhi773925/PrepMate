
const express = require('express');
const router = express.Router();
const Enrollment = require('../models/Enrollment'); // Assuming Enrollment schema is set up

router.post('/enrollments', async (req, res) => {
  const { courseId, username } = req.body;

  try {
    const existingEnrollment = await Enrollment.findOne({ courseId, username });
    
    if (existingEnrollment) {
      return res.status(400).json({ message: 'User is already enrolled in this course' });
    }

    const newEnrollment = new Enrollment({ courseId, username });
    await newEnrollment.save();

    res.status(201).json({ message: 'Successfully enrolled in the course', enrollment: newEnrollment });
  } catch (error) {
    console.error('Error enrolling user:', error);
    res.status(500).json({ message: 'Failed to enroll in course' });
  }
});

module.exports = router;
