import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Accuracy from './Accuracy'; // Import the Accuracy component

const MyLearning = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [testAnalyses, setTestAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      const username = localStorage.getItem('username');
      if (!username) {
        setError('User not logged in');
        setLoading(false);
        return;
      }

      try {
        const [enrollmentsResponse, testAnalysesResponse] = await Promise.all([
          axios.get(`http://localhost:5000/api/mocktests/enrollments`, {
            params: { username },
          }),
          axios.get(`http://localhost:5000/api/mocktests/testanalyses`),
        ]);

        setEnrolledCourses(enrollmentsResponse.data.enrollments || []);
        setTestAnalyses(testAnalysesResponse.data);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, []);

  const handleStartTest = (courseId) => {
    const username = localStorage.getItem("username");
    if (username) {
      navigate(`/test-series/${courseId}`);
    } else {
      setError("Please login or signup to continue.");
    }
  };

  const getAccuracyForCourse = (courseId) => {
    const test = testAnalyses.find(test => test.courseId === courseId);
    return test ? test.accuracy : 'N/A'; 
  };

  const handleViewAccuracy = (courseId, courseTitle, lessonNames) => {
    const username = localStorage.getItem("username");
    if (username) {
      setSelectedCourse({ courseId, courseTitle, lessonNames });  
      // navigate(`/accuracy/${courseId}`, { state: { courseTitle, lessonNames } });
      // navigate(`/accuracy/${courseId}/${courseTitle}/${lessonNames}`);
      // navigate('/apple');
      console.log("Selected Course:", { courseId, courseTitle, lessonNames });
    } else {
      setError("Please login or signup to continue.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (enrolledCourses.length === 0) {
    return <div>No enrolled courses found.</div>;
  }

  return (
    <div className='rounded-3xl bg-[#0d0c0a]'>
      <h1 className="font-montserrat text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 text-center">
        My Enrolled Courses
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {enrolledCourses.map((enrollment) => (
          <div key={enrollment._id} className="bg-[#2d2d2d] rounded-3xl shadow-lg p-4 flex flex-col">
            <img
              src={enrollment.courseId.imgUrl}
              alt={enrollment.courseId.title}
              className="course-image w-full h-40 object-cover rounded"
            />
            <div className="course-content flex-grow">
              <h2 className="text-lg font-semibold mt-2">{enrollment.courseId.title}</h2>
              <p className="text-sm text-gray-600 mt-1">{enrollment.courseId.description}</p>
              <p className="text-sm text-gray-600 mt-1">Accuracy: {getAccuracyForCourse(enrollment.courseId._id)}%</p>
            </div>
            <div className='flex flex-row justify-between'>
              <button 
                onClick={() => handleViewAccuracy(enrollment.courseId._id, enrollment.courseId.title, enrollment.courseId.lessons.map(lesson => lesson.lessonName))}
                className="relative inline-flex items-center justify-center h-[45px] text-white rounded-full bg-[#333333] overflow-hidden transition duration-300 ease-in-out group hover:shadow-lg"
                style={{ fontFamily: "'Helvetica Neue', sans-serif" }}
              >
                <span className="absolute inset-0 transition-all duration-300 bg-gradient-to-r from-purple-600 to-pink-600 opacity-30 rounded-full scale-110 group-hover:scale-125"></span>
                <span className="flex items-center px-4 py-2">View Accuracy</span>
                <span className="absolute inset-0 border-4 border-transparent rounded-full"></span>
              </button>
              <button 
                onClick={() => handleStartTest(enrollment.courseId._id)}
                className="relative inline-flex items-center justify-center h-[45px] text-white rounded-full bg-[#333333] overflow-hidden transition duration-300 ease-in-out group hover:shadow-lg"
                style={{ fontFamily: "'Helvetica Neue', sans-serif" }}
              >
                <span className="absolute inset-0 transition-all duration-300 bg-gradient-to-r from-purple-600 to-pink-600 opacity-30 rounded-full scale-110 group-hover:scale-125"></span>
                <span className="flex items-center px-4 py-2">Start Test</span>
                <span className="absolute inset-0 border-4 border-transparent rounded-full"></span>
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedCourse && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-white">Accuracy for {selectedCourse.courseTitle}</h2>
          <Accuracy 
      courseId={selectedCourse.courseId} 
      courseTitle={selectedCourse.courseTitle} 
      lessonNames={selectedCourse.lessonNames}
      testAnalyses={testAnalyses} 
    />
        </div>
      )}
    </div>
  );
};

export default MyLearning;
