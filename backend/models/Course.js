const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: String, required: true },
  imgUrl: { type: String, required: true },
  lessons: [
    {
      lessonName: { type: String, required: true },
      duration: { type: String, required: true },
    },
  ],
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
