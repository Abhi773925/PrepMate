import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TestInstructions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const lessonName = location.state?.lessonName;
  const courseTitle = location.state?.courseTitle;
  console.log(lessonName);
  console.log(courseTitle);
  const [isChecked, setIsChecked] = useState(false);

  const handleStartTest = () => {
    if (lessonName === "Time And Clock" && isChecked) {
      navigate("/time-and-clock", { state: { lessonName: lessonName, courseTitle: courseTitle } });

    }
    if (lessonName === "Work And Time" && isChecked) {
      navigate("/work-and-time", { state: { lessonName: lessonName } });
    }
    if (lessonName === "Full Length Mock Test" && isChecked) {
      navigate("/rrb-ntpc", { state: { lessonName: lessonName } });
    } else {
      alert("Please check the box before starting the test.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0C0A] text-[#FFF9F8] p-4">
      <div className="max-w-6xl mx-auto bg-[#0D0C0A] rounded-lg shadow-lg p-8 text-[#FFF9F8]">
        <div className="grid grid-cols-1 md:grid-cols-2 justify-between items-center mb-8">
          <h2 className="text-4xl font-bold">Test Instructions</h2>
          <img src="logo_url" alt="Logo" className="h-12" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-2xl font-bold mb-4">Test Details</h3>
            <ul className="space-y-2">
              <li>
                <span className="font-bold">★ Test Name:</span>{" "}
                {lessonName || "Unknown Test"}
              </li>
              <li>
                <span className="font-bold">★ No of Questions:</span> 20
              </li>
              <li>
                <span className="font-bold">★ Allocated Time:</span> 60 Minutes
              </li>
              <li>
                <span className="font-bold">★ Negative Marking:</span> 1/4
              </li>
            </ul>
            <h4 className="font-bold mt-6 text-xl">Instructions</h4>
            <p>
              Instructions for the test are displayed here for the user to read
              before starting.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">Navigation Tools</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <button className="bg-[#331FFF] hover:bg-[#574BFF] text-white font-bold py-2 px-4 rounded-full w-28">
                  Next &gt;
                </button>
                <span className="ml-3">Next: Move to the next question.</span>
              </li>
              <li className="flex items-center">
                <button className="bg-[#331FFF] hover:bg-[#574BFF] text-white font-bold py-2 px-4 rounded-full w-28">
                  &lt; Prev
                </button>
                <span className="ml-3">
                  Previous: Go back to the previous question.
                </span>
              </li>
              <li className="flex items-center">
                <button className="bg-[#F2C94C] hover:bg-[#E8B923] text-white font-bold py-2 px-4 rounded-full w-28">
                  Flag
                </button>
                <span className="ml-3">
                  Flag: Mark a question to respond later.
                </span>
              </li>
              <li className="flex items-center">
                <button className="bg-[#EB5757] hover:bg-[#D04141] text-white font-bold py-2 px-4 rounded-full w-28">
                  End Test
                </button>
                <span className="ml-3">End Test: Submit your test.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
            <span>
              I have gone through the instructions, understood the legends, and
              will follow the same.
            </span>
          </label>

          <div className="flex justify-between mt-6">
            <button
              onClick={() => navigate(-1)}
              className="bg-[#0d0c0a] hover:bg-[#fff9f8] text-[#fff9f8] hover:text-[#0d0c0a] font-bold py-2 px-6 rounded-full border border-[#fff9f8]"
            >
              Back
            </button>
            <button
              onClick={handleStartTest}
              disabled={!isChecked}
              className={`${
                !isChecked
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#FF5722] hover:bg-[#FF3D00]"
              } text-white font-bold py-2 px-4 rounded-full`}
            >
              Start Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestInstructions;
