import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TestAnalysis from '../testanalysis/TestAnalysis';
import { useLocation } from "react-router-dom";

const TimeAndClock = () => {
  const location = useLocation();

  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(1800);
  const [timeSpent, setTimeSpent] = useState(Array(10).fill(0));
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [warning, setWarning] = useState(false);
  const lessonName = location.state?.lessonName;
  const courseTitle=location.state?.courseTitle;
 const courseId=location.state?.courseId;
 console.log(courseId);
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://run.mocky.io/v3/2304173b-c8c2-43e1-b6c1-cc3327d433ad');
        setQuestions(response.data.questions);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchQuestions();

    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 60 && !warning) {
          setWarning(true);
        }
        if (prevTime <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  
  useEffect(() => {
    localStorage.setItem('userAnswers', JSON.stringify(userAnswers));
    localStorage.setItem('timeRemaining', timeRemaining.toString());
  }, [userAnswers, timeRemaining]);
  
  const updateTimeSpent = () => {
    const endTime = Date.now();
    const timeOnQuestion = Math.floor((endTime - questionStartTime) / 1000);
    setTimeSpent((prevTimes) => {
      const newTimes = [...prevTimes];
      newTimes[currentQuestionIndex] += timeOnQuestion;
      return newTimes;
    });
    setQuestionStartTime(Date.now());
  };

  const handleOptionChange = (questionId, answer) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleClearResponse = () => {
    setUserAnswers((prevAnswers) => {
      const updatedAnswers = { ...prevAnswers };
      delete updatedAnswers[questions[currentQuestionIndex]?.id];
      return updatedAnswers;
    });
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    updateTimeSpent();
    const totalScore = questions.reduce((score, question) => {
      return score + (userAnswers[question.id] === question.answer ? 1 : 0);
    }, 0);
    setScore(totalScore);
    setAccuracy(((totalScore / questions.length) * 100).toFixed(2));
    setSubmitted(true);
  };

  const handleNext = () => {
    updateTimeSpent();
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleBack = () => {
    updateTimeSpent();
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleQuestionClick = (index) => {
    updateTimeSpent();
    setCurrentQuestionIndex(index);
  };

  const renderOptions = () => (
    questions[currentQuestionIndex]?.options && 
    Object.entries(questions[currentQuestionIndex].options).map(([key, option], index) => {
      const optionLabel = String.fromCharCode(65 + index);
      return (
        <div key={key} className="flex items-center mb-2">
          <input
            type="radio"
            id={`${questions[currentQuestionIndex].id}-${key}`}
            name={`question-${questions[currentQuestionIndex].id}`}
            value={key}
            checked={userAnswers[questions[currentQuestionIndex].id] === key}
            onChange={() => handleOptionChange(questions[currentQuestionIndex].id, key)}
            className="mr-2"
            aria-label={`Option ${optionLabel} for question ${currentQuestionIndex + 1}`}
          />
          <label htmlFor={`${questions[currentQuestionIndex].id}-${key}`} className="text-md">
            {optionLabel}. {option}
          </label>
        </div>
      );
    })
  );

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="flex flex-col h-screen bg-[#0d0c0a] pt-6">
      <div className="flex justify-between flex-col items-center p-4 text-white">
        {!submitted && (
          <div>
            <h2 className="text-2xl font-bold">{lessonName || "Test"}</h2>
            <h2 className="text-2xl font-bold">{courseTitle || "dont know"}</h2>

            <p className="mr-2 border-red-200 h-[20px] w-auto">
              Time Remaining: {Math.floor(timeRemaining / 60)}:{String(timeRemaining % 60).padStart(2, '0')}
            </p>
            {warning && <span className="text-red-500">Time is running out!</span>}
            <div className="h-2 bg-gray-300 rounded w-full mt-4">
              <div className="h-full bg-blue-600 rounded" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}
      </div>

      {!submitted ? (
        <div className="flex flex-1 p-4 flex-col lg:flex-row">
          <div className="w-full lg:w-2/3 p-4 bg-[#0d0c0a] rounded-lg shadow-md">
            <form onSubmit={handleSubmit}>
              <h2 className="text-lg font-semibold mb-2">Question {currentQuestionIndex + 1}/10</h2>
              <h3 className="text-lg mb-4">{questions[currentQuestionIndex]?.question}</h3>
              {renderOptions()}
              <div className="flex justify-between mt-4">
                <button type="button" onClick={handleBack} className={`bg-cyan-200 text-black rounded-2xl py-2 px-4 ${currentQuestionIndex === 0 ? 'bg-gray-400' : 'bg-gray-600 hover:bg-gray-700'}`} disabled={currentQuestionIndex === 0}>
                  Back
                </button>
                <button type="button" onClick={handleClearResponse} className="rounded-2xl py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-black font-normal">
                  Clear Response
                </button>
                <button type="button" onClick={handleNext} className={`rounded-2xl text-white py-2 px-4 ${currentQuestionIndex === questions.length - 1 ? 'bg-blue-400' : 'bg-blue-600 hover:bg-gray-700'}`} disabled={currentQuestionIndex === questions.length - 1}>
                  Next
                </button>
              </div>
              <button type="submit" className="rounded-2xl flex items-center w-[100px] justify-center py-2 mt-4 bg-red-600 h-auto text-white hover:bg-blue-700">
                End Test
              </button>
            </form>
          </div>
          <div className="w-full lg:w-1/3 p-4">
            <h2 className="font-bold mb-2">Question Status</h2>
            <div className="grid grid-cols-4 gap-2">
              {questions.map((question, index) => (
                <div key={question.id} onClick={() => handleQuestionClick(index)} className={`p-2 rounded-xl text-center cursor-pointer ${userAnswers[question.id] ? 'bg-green-500' : 'bg-white text-black'}`}>
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <TestAnalysis score={score} accuracy={accuracy} userAnswers={userAnswers} questions={questions} lessonName={lessonName} courseId={courseId}  courseTitle={courseTitle}  />
      )}
    </div> 
  );
};

export default TimeAndClock;
