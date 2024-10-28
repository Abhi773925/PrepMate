const express = require('express');
const { getEnrolledCourses, enrollInCourse } = require('../controllers/enrolledController');

const router = express.Router();

router.get('/enrollments', getEnrolledCourses);

router.post('/enrollments', enrollInCourse);

module.exports = router;
