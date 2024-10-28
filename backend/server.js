const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const signuproutes = require('./routes/signuproutes'); 
const loginroutes = require("./routes/loginroutes");
const mocktestRoutes = require('./routes/mocktests');
const Enrollment = require('./models/Enrollment');
const Course = require('./models/Course'); 
const enrolledRoutes = require('./routes/enrolledRoutes');
const testAnalysisRoutes = require('./routes/testAnalysisRoutes');
const accuracyRoutes = require('./routes/accuracyRoutes'); 

const app = express();
const port = 5000;
app.use(express.json()); 
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/mocktests", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

app.get("/api/mocktests/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json({ courses });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/mocktests/courses/:courseId", async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/mocktests/courses/:courseId/lessons/:lessonId", async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const lesson = course.lessons.id(lessonId);
    if (!lesson) {
      return res.status(404).json({ error: "Lesson not found" });
    }

    res.json(lesson);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post('/api/mocktests/enrollments', async (req, res) => {
  const { courseId, username } = req.body;
  try {
    const newEnrollment = new Enrollment({ courseId, username });
    
    await newEnrollment.save();
    
    res.status(200).json({ message: 'Enrollment successful' });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: 'Failed to enroll in course' });
  }
});
app.get('/api/mocktests/enrollments/:username/:courseId', async (req, res) => {
  const { username, courseId } = req.params;
  try {
    const enrollment = await Enrollment.findOne({ username, courseId });
    if (enrollment) {
      return res.json({ isEnrolled: true });
    }
    return res.json({ isEnrolled: false });
  } catch (error) {
    console.error("Error checking enrollment:", error);
    res.status(500).json({ error: "Server error" });
  }
});


// Use defined routes
app.use('/api/mocktests', signuproutes); 
app.use('/api/mocktests', loginroutes);
app.use('/api/mocktests', mocktestRoutes);
app.use('/api/mocktests', enrolledRoutes); 
app.use('/api/mocktests', testAnalysisRoutes);
app.use('/api/mocktests', accuracyRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
