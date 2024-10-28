const express = require('express');
const Course = require('../models/Course'); 

const router = express.Router();


router.get('/api/mocktests/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


module.exports = router;
