import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
const MockTestSeries = () => {
  const location=useLocation();
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [courseDetails, setCourseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const courseTitle = location.state?.courseTitle || courseDetails?.title;
  console.log(courseTitle);
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/mocktests/courses/${courseId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCourseDetails(data);
      } catch (error) {
        console.error('Error fetching course details:', error);
        setCourseDetails(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const handleStartTest = (lessonName, courseTitle) => {
    const username = localStorage.getItem('username');
    if (username) {
      navigate("/test-instructions", { state: { lessonName, courseTitle } });
    } else {
      setError("Please login or signup to continue.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0c0a] text-[#fff9f8] p-6">
      <div className="max-w-6xl mx-auto bg-[#0d0c0a] text-[#fff9f8] rounded-lg shadow-lg p-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 bg-[#0d0c0a] hover:bg-[#fff9f8] text-[#fff9f8] hover:text-[#0d0c0a] font-bold py-2 px-6 rounded-full border border-[#fff9f8]"
        >
          Back
        </button>

        {/* Display Course Title */}
        {loading ? (
          <p className="text-center text-[#fff9f8]">Loading course details...</p>
        ) : !courseDetails ? (
          <p className="text-center text-[#fff9f8]">Course not found.</p>
        ) : (
          <>
            {/* Display the course title prominently */}
            <h1 className="text-4xl font-bold mb-6 text-center">{courseDetails.title || 'Untitled Course'}</h1>

            <div className="bg-[#0d0c0a] text-[#fff9f8] p-4 rounded-lg mb-4">
              <div className="flex justify-between items-center">
                <img
                  src={courseDetails.imgUrl || 'default-image.jpg'}
                  alt={courseDetails.title || 'Course image'}
                  className="w-20 h-20 object-cover mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold text-[#fff9f8]">
                    {courseDetails.title || 'Untitled Course'}
                  </h3>
                  <span className="text-lg font-medium text-[#fff9f8]">
                    Price: {courseDetails.price || 'Free'}
                  </span>
                </div>
              </div>

              <h3 className="text-2xl font-bold mt-2 text-[#fff9f8]">Lessons</h3>
              {courseDetails.lessons && courseDetails.lessons.length > 0 ? (
                courseDetails.lessons.map((lesson, lessonIndex) => (
                  <div
                    key={lessonIndex}
                    className="flex justify-between items-center mt-2 bg-[#1b1a17] p-4 rounded-lg"
                  >
                    <div>
                      <span className="text-lg font-medium">{lesson.lessonName}</span>
                      <span className="text-sm text-gray-400 ml-4">{lesson.duration} min</span>
                    </div>
                    <button
                      onClick={() => handleStartTest(lesson.lessonName, courseTitle)}
                      className="bg-[#fff9f8] text-[#0d0c0a] font-bold py-2 px-4 rounded-full"
                    >
                      Start Test
                    </button>
                  </div>
                ))
              ) : (
                <p>No lessons available</p>
              )}
            </div>
          </>
        )}

        {error && (
          <div className="mt-4 text-red-500">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default MockTestSeries;
