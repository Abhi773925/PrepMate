import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Accuracy = ({ courseId, courseTitle, lessonNames = [], testAnalyses = [] }) => {
  const [accuracyData, setAccuracyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccuracyData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/mocktests/courses/${courseId}`);
        setAccuracyData(response.data);
      } catch (err) {
        setError('Failed to fetch accuracy data');
      } finally {
        setLoading(false);
      }
    };

    fetchAccuracyData();
  }, [courseId]);

  if (loading) {
    return <div className="text-white">Loading accuracy data...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!accuracyData) {
    return <div className="text-white">No accuracy data found.</div>;
  }

  if (!Array.isArray(lessonNames) || lessonNames.length === 0) {
    return <div className="text-white">No lessons available.</div>;
  }

  const lessonAccuracy = lessonNames.map(lessonName => {
    const test = testAnalyses.find(test => test.testName === lessonName);
    return {
      lessonName,
      accuracy: test ? test.accuracy : 'N/A',
    };
  });

  return (
    <div className="bg-black rounded-lg p-6 mt-4 shadow-lg">
      <h3 className="text-xl font-semibold text-white">Course ID: {courseId}</h3>
      <h4 className="text-lg text-white">Course Title: {courseTitle}</h4>
      <h5 className="text-md text-white mt-4">Lessons:</h5>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {lessonAccuracy.map(({ lessonName, accuracy }, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h6 className="text-lg font-medium text-white">{lessonName}</h6>
            <p className="text-md text-white">Accuracy: <span className="font-semibold">{accuracy}%</span></p>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Accuracy;
