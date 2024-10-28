import React, { useEffect, useMemo, useState } from 'react';
// import { CircularProgressbar } from 'react-circular-progressbar';
import { FaBullseye, FaTimes, FaExclamationCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const TestAnalysis = ({ questions, userAnswers, score, accuracy, lessonName, courseTitle, restartTest }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  
  const accuracyValue = Number(accuracy) || 0;
  const incorrectAnswers = questions.length - score;
  const missedQuestions = questions.filter(q => !userAnswers[q.id]).length;
  const scorePercentage = useMemo(() => (score / questions.length) * 100, [score, questions.length]);
  const username=localStorage.getItem('username');
  // console.log(username);
  const saveTestAnalysis = async () => {
    setLoading(true);
    const analysisData = {
      username:username,
      testName: lessonName || "Test",
      courseTitle:courseTitle||"default course title",
      score,
      accuracy: accuracyValue,
    };
  
    console.log(JSON.stringify(analysisData)); 
  
    try {
      const response = await fetch("http://localhost:5000/api/mocktests/testanalyses", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(analysisData), 
      });
  
      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to save test analysis: ${error}`);
      }
  
      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage(error.message); 
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    saveTestAnalysis();
  }, [score, accuracy, lessonName, courseTitle,username]); // Add courseTitle to the dependency array

  return (
    <div className="flex w-full flex-col justify-center items-center p-4 bg-[#0d0c0a]">
      <h2 className="text-2xl font-bold">{lessonName || "Test"}</h2>
      <div className="bg-[#0d0c0a] p-8 rounded-lg shadow-lg text-white w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Test Submitted!</h2>

        {loading && <p className="text-yellow-400">Saving your test analysis...</p>}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <div className="mb-8 flex flex-col items-center">
          <h3 className="text-lg font-semibold text-center mb-2">Overall Score</h3>
          <div style={{ width: 120, height: 120 }}>
            {/* <CircularProgressbar
              value={scorePercentage}
              text={`${score}/${questions.length}`}
              styles={{
                path: { stroke: '#3b82f6' },
                trail: { stroke: '#4b5563' },
                text: { fill: '#fff', fontSize: '16px', fontWeight: 'bold' },
              }}
            /> */}
          </div>
          <p className="text-center text-lg font-semibold">{scorePercentage.toFixed(2)}%</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-white bg-[#0d0c0a] py-6 rounded-lg shadow-lg mb-8">
          <div className="flex border-2 border-white-300 flex-col items-center p-4 rounded-lg shadow-md text-center">
            <FaBullseye className="text-red-500 text-2xl mb-2" />
            <h4 className="text-md font-semibold">Accuracy</h4>
            <p className="text-lg">{accuracyValue.toFixed(2)}%</p>
          </div>

          <div className="flex border-2 border-white-300 flex-col items-center p-4 rounded-lg shadow-md text-center">
            <FaTimes className="text-red-600 text-2xl mb-2" />
            <h4 className="text-md font-semibold">Incorrect Answers</h4>
            <p className="text-lg">{incorrectAnswers}</p>
          </div>

          <div className="flex border-2 border-white-300 flex-col items-center p-4 rounded-lg shadow-md text-center">
            <FaExclamationCircle className="text-red-500 text-2xl mb-2" />
            <h4 className="text-md font-semibold">Missed Questions</h4>
            <p className="text-lg">{missedQuestions}</p>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className="mt-4 text-center">
            <button onClick={() => navigate('/')} className="py-2 px-4 bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 text-black rounded-lg">Go to Home Page</button>
          </div>
          <div className="mt-4 text-center">
            <button onClick={restartTest} className="py-2 px-4 bg-gradient-to-r from-orange-400 via-yellow-500 to-red-500 hover:from-orange-500 hover:via-yellow-600 hover:to-red-600 rounded-xl font-semibold text-black">Restart Test</button>
          </div>
        </div>

        <h3 className="mt-4 text-xl font-semibold text-center">Detailed Analysis:</h3>
        <div className="mt-2 w-full space-y-4 justify-center gap-4 grid items-center grid-cols-1 md:grid-cols-2 sm:grid-cols-2 xl:grid-cols-3">
          {questions.map((question, index) => {
            const isCorrect = userAnswers[question.id] === question.answer;
            return (
              <div key={question.id} className={`border p-4 rounded-lg shadow-md ${isCorrect ? 'border-green-500' : 'border-red-500'} bg-[#0d0c0a]`}>
                <h4 className="font-semibold">{index + 1}. {question.question}</h4>
                <div className="mt-2">
                  {question.options && Object.entries(question.options).map(([key, option], idx) => (
                    <div key={key} className="flex items-center ">
                      <input
                        type="radio"
                        disabled
                        checked={userAnswers[question.id] === key}
                        className="mr-2"
                      />
                      <label className={`text-md ${key === question.answer ? 'font-bold text-green-500' : ''}`}>
                        {String.fromCharCode(65 + idx)}. {option}
                      </label>
                    </div>
                  ))} 
                </div>
                <p className="mt-2 text-md">
                  You answered: <span className="font-semibold">{userAnswers[question.id] || 'Not answered'}</span> {isCorrect ? '(Correct)' : '(Incorrect)'}
                </p>
                <p className="text-md">
                  Correct answer: <span className="font-semibold">{question.answer}</span>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TestAnalysis;
