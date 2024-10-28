const Enrollment = require('../models/Enrollment');

const getEnrolledCourses = async (req, res) => {
  try {
    const { username } = req.query;
    if (!username) {
      return res.status(400).json({ message: 'Username is required.' });
    }

    const enrollments = await Enrollment.find({ username }).populate('courseId'); 
    res.status(200).json({ enrollments });
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const enrollInCourse = async (req, res) => {
  try {
    const { courseId, username } = req.body;

    if (!courseId || !username) {
      return res.status(400).json({ message: 'Course ID and username are required.' });
    }

    const existingEnrollment = await Enrollment.findOne({ courseId, username });

    if (existingEnrollment) {
      return res.status(400).json({ message: 'You are already enrolled in this course.' });
    }

    const newEnrollment = new Enrollment({ courseId, username });
    await newEnrollment.save();

    res.status(201).json({ message: 'Successfully enrolled in the course!', enrollment: newEnrollment });
  } catch (error) {
    console.error('Error enrolling in course:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getEnrolledCourses,
  enrollInCourse,
};
