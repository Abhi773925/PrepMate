const express = require('express');
const { createEnrollment } = require('../controllers/enrollmentController'); // Adjust the path as necessary
const router = express.Router();

router.post('/enrollments', createEnrollment);

module.exports = router;
