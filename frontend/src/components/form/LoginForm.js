import React, { useState } from 'react';
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      // Attempt to log in
      const response = await fetch('http://localhost:5000/api/mocktests/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid login credentials.');
      }

      const result = await response.json();
      localStorage.setItem('userToken', result.token); 
      localStorage.setItem('username', formData.username); 

      

      setSuccess("Login successful!");
      navigate('/');

    } catch (err) {
      console.error("Error during login:", err);
      setError(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0d0c0a] text-white">
      <div className="flex flex-col justify-center p-8 mx-auto md:w-1/2">
        <div className="mx-auto w-full max-w-md">
          <h1 className="text-3xl font-bold text-white mb-2">Login to Your Account</h1>
          <p className="mb-8 text-white">Access your courses and resources!</p>

          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center border border-gray-300 rounded-md">
              <FaUser className="text-gray-500 p-2" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username (Email)"
                required
                className="flex-1 p-2 focus:outline-none bg-[#0d0c0a] text-white"
              />
            </div>
            <div className="flex items-center border border-gray-300 rounded-md">
              <FaLock className="text-gray-500 p-2" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="flex-1 p-2 focus:outline-none bg-[#0d0c0a] text-white"
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center items-center py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            >
              <FaSignInAlt className="mr-2" />
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
