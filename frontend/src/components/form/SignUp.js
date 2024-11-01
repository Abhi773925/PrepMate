import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import { FaBookOpen, FaCalendarAlt, FaRocket } from "react-icons/fa";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    agreeTerms: false,
  });

  const Card = ({ children, className }) => (
    <div
      className={`relative overflow-hidden rounded-2xl bg-[#141414] p-6 ${className}`}
    >
      {children}
    </div>
  );
  
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!formData.agreeTerms) {
      setError("You must agree to the terms and conditions.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/mocktests/signupdetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to sign up.');
      } else {
        const result = await response.json();
        setSuccess("Account created successfully!");
        console.log(result);
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#0a0a0a]">
      <div className="w-full lg:w-1/2 space-y-6 p-4 flex justify-center items-center flex-col">
        <Card>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0a0a0a]">
              <FaBookOpen className="h-6 w-6 text-[#6366F1]" />
            </div>
            <h2 className="text-lg font-semibold text-[#6366F1]">
              Learn: Access 100+ Courses
            </h2>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EC4899]/20">
              <FaCalendarAlt className="h-6 w-6 text-[#EC4899]" />
            </div>
            <h2 className="text-lg font-semibold text-[#EC4899]">
              Apply: Build, Play, Create
            </h2>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#10B981]/20">
              <FaRocket className="h-6 w-6 text-[#10B981]" />
            </div>
            <h2 className="text-lg font-semibold text-[#10B981]">
              Grow: Elevate Your Career
            </h2>
          </div>
        </Card>
      </div>
      {/* Right Side - SignUp Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#0a0a0a] p-4 rounded-2xl">
        <div className="bg-[#141414] bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md rounded-2xl">
          <h1 className="text-2xl font-bold mb-4 text-center text-white">Sign Up</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center border border-gray-300 rounded-md">
              <FaUser className="text-gray-400 p-2" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="flex-1 p-2 bg-transparent focus:outline-none text-white placeholder-gray-400"
              />
            </div>
            <div className="flex items-center border border-gray-300 rounded-md">
              <FaUser className="text-gray-400 p-2" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                required
                className="flex-1 p-2 bg-transparent focus:outline-none text-white placeholder-gray-400"
              />
            </div>
            <div className="flex items-center border border-gray-300 rounded-md">
              <FaEnvelope className="text-gray-400 p-2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className="flex-1 p-2 bg-transparent focus:outline-none text-white placeholder-gray-400"
              />
            </div>
            <div className="flex items-center border border-gray-300 rounded-md">
              <FaLock className="text-gray-400 p-2" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="flex-1 p-2 bg-transparent focus:outline-none text-white placeholder-gray-400"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="mr-2 rounded text-blue-500"
              />
              <label className="text-gray-300">I agree to the terms and conditions</label>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center items-center py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
            >
              <FaSignInAlt className="mr-2" />
              Sign Up
            </button>
            <p className="text-center mt-4">
              Already have an account? 
              <a href="/login" className="text-blue-500 hover:underline"> Login here</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
