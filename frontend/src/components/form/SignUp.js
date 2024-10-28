import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import signup from "../../assets/signup.jpg";
export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    agreeTerms: false,
  });

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
          'Content-Type': 'application/json'
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
    <div className="flex min-h-screen bg-[#0d0c0a] text-white">
      <div className="hidden md:block md:w-1/2 relative h-auto w-auto z-30">
        <img
          src=".//sd"
          alt="Educational Background"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">Join Our Learning Community</h2>
          <p className="text-lg mb-8">
            Unlock your potential with our comprehensive courses and resources.
          </p>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <svg className="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Expert Instructors</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Flexible Learning</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex text-white flex-col justify-center p-8 md:w-1/2">
        <div className="mx-auto w-full max-w-md p-8 bg-gray-800 bg-opacity-70 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-2">Create Your Account</h1>
          <p className="mb-8">Start your learning journey with us!</p>

          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center border border-gray-300 rounded-md transition duration-300 focus-within:ring-2 focus-within:ring-blue-500">
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
            <div className="flex items-center border border-gray-300 rounded-md transition duration-300 focus-within:ring-2 focus-within:ring-blue-500">
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
            <div className="flex items-center border border-gray-300 rounded-md transition duration-300 focus-within:ring-2 focus-within:ring-blue-500">
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
            <div className="flex items-center border border-gray-300 rounded-md transition duration-300 focus-within:ring-2 focus-within:ring-blue-500">
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
              className="w-full flex justify-center items-center py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 transform hover:scale-105"
            >
              <FaSignInAlt className="mr-2" />
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
