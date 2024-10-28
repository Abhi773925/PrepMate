import React, { useEffect, useState } from "react";
import { FaArrowRight, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import loader from "../../assets/loading.gif";

const FeaturedCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/mocktests/courses");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setCourses(Array.isArray(data) ? data : data.courses || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    const username = localStorage.getItem("username");
    if (!username) {
      setError("Please login or signup to continue.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/mocktests/enrollments/${username}/${courseId}`,
        { method: "GET", headers: { "Content-Type": "application/json" } }
      );

      if (!response.ok) {
        throw new Error("Failed to check enrollment status.");
      }

      const enrollmentData = await response.json();
      if (enrollmentData.isEnrolled) {
        alert("You are already enrolled in this course.");
        return;
      }

      const enrollResponse = await fetch(
        "http://localhost:5000/api/mocktests/enrollments",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ courseId, username }),
        }
      );

      if (!enrollResponse.ok) {
        throw new Error("Failed to enroll in course.");
      }

      alert("Successfully enrolled in the course!");
      setEnrolledCourses((prevEnrolledCourses) => [...prevEnrolledCourses, courseId]);
    } catch (error) {
      console.error("Error enrolling in course:", error);
      setError("Failed to enroll in course. Please try again.");
    }
  };

  const handleStartTest = (courseId, courseTitle) => {
    const username = localStorage.getItem("username");
    if (username) {
      navigate(`/test-series/${courseId}`, { state: { courseTitle } });
    } else {
      setError("Please login or signup to continue.");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center text-center text-white">
        <img src={loader} className="h-24 w-24" alt="Loading..." />
      </div>
    );

  if (error) return <div className="text-center text-white">{error}</div>;
  if (courses.length === 0)
    return <div className="text-center text-white">No courses available.</div>;

  return (
    <div className="bg-[#0D0C0A] pt-8 sm:pt-4 md:pt-6 p-4 max-w-screen-xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mb-8 items-start justify-between">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#FFF9F8] mb-2" style={{ fontFamily: "'Garamond', serif" }}>
          Featured Courses
        </h2>
        <div className="flex justify-center md:justify-end">
          <button
            onClick={() => navigate("/courses")}
            className="relative inline-flex items-center justify-center px-4 py-2 text-sm font-semibold transition-all duration-300 bg-[#333333] border-2 border-transparent rounded-full overflow-hidden group hover:bg-opacity-100 md:px-6 md:py-3 md:text-lg"
            style={{ fontFamily: "'Helvetica Neue', sans-serif" }}
          >
            <span className="absolute inset-0 transition-all duration-00 bg-gradient-to-r from-purple-600 to-pink-600 opacity-30 rounded-full scale-110 group-hover:scale-125"></span>
            <span className="flex flex-row items-center">
              <p className="text-white opacity-1 font-bold">View All Courses</p> <FaArrowRight className="ml-2 -rotate-45" />
            </span>
            <span className="absolute inset-0 border-4 border-transparent rounded-full"></span>
          </button>
        </div>
      </div>

      <div className="grid  grid-cols-1 sm:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
        {courses.map((course) => (
          <div key={course._id || course.id} className="relative bg-[#1F1F1F] rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 overflow-hidden">
            <img src={course.imgUrl} alt={course.title} className="w-full h-48 object-cover" />
            <div className="p-6 flex flex-col">
              <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Futura', sans-serif" }}>
                {course.title}
              </h3>
              <div className="flex items-center text-yellow-400">
                <FaStar className="mr-1" />
                <FaStar className="mr-1" />
                <FaStar className="mr-1" />
                <FaStar className="mr-1" />
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="text-lg text-[#FFF9F8] font-bold">{course.price}</div>
                <div className="text-sm text-gray-400 line-through">$999</div>
              </div>
              <div className="mt-auto flex items-center justify-between">
                <button
                  className="bg-purple-600 text-white py-2 px-4 rounded-full mt-4"
                  onClick={() => handleEnroll(course._id || course.id)}
                >
                  Enroll Now
                </button>
                <button
                  className="bg-gray-800 text-white py-2 px-4 rounded-full mt-4"
                  onClick={() => handleStartTest(course._id || course.id, course.title)}
                >
                  Start Test
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCourses;
