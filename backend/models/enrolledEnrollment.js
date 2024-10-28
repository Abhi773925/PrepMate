const mongoose = require('mongoose');

const EnrollmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EnrolledUser', 
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EnrolledCourse', 
    required: true,
  },
});

module.exports = mongoose.model('EnrolledEnrollment', EnrollmentSchema);
