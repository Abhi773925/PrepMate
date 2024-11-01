import React, { useState } from "react";
import { FaBookOpen, FaCalendarAlt, FaRocket } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Button = ({ children, className, ...props }) => (
  <button
    className={`rounded-xl border-[#27272A] bg-[#18181B] py-4 text-[#E4E4E7] hover:bg-[#27272A] transition duration-200 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Card = ({ children, className }) => (
  <div
    className={`relative overflow-hidden rounded-2xl bg-[#141414] p-6 ${className}`}
  >
    {children}
  </div>
);

const Input = React.forwardRef(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={`rounded-xl border-[#27272A] bg-[#18181B] py-4 text-[#E4E4E7] placeholder-[#71717A] focus:outline-none focus:border-[#6366F1] ${className}`}
    {...props}
  />
));
Input.displayName = "Input";

export default function LoginForm() {
  const navigate = useNavigate(); // Correctly call useNavigate here
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(
        "http://localhost:5000/api/mocktests/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Invalid login credentials.");
      }

      const result = await response.json();
      localStorage.setItem("userToken", result.token);
      localStorage.setItem("username", formData.username);

      setSuccess("Login successful! Redirecting...");
      
      // Redirect to home after a short delay
      setTimeout(() => {
        navigate("/"); // Correctly navigate to home page
      }, 2000); // Delay for user feedback
    } catch (err) {
      console.error("Error during login:", err);
      setError(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Column - Feature Cards */}
          <div className="space-y-6">
            <Card>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#6366F1]/20">
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

          {/* Right Column - Login Form */}
          <Card className="p-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-center">
                  Welcome Back To PrepMate
                </h1>
                <p className="text-[#A1A1AA] text-center">
                  Continue Your Preparation With PrepMate.
                </p>
              </div>

              <div className="space-y-4">
                <Button className="w-full justify-start gap-3">
                  Continue with Google
                </Button>

                <Button className="w-full justify-start gap-3">
                  Continue with GitHub
                </Button>

                <div className="space-y-4">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex justify-between items-center text-center">
                      <Input
                        name="username"
                        type="text"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="flex-grow mr-2 text-center" // Adds space on the right
                      />
                    </div>

                    <div className="flex justify-between items-center">
                      <Input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="flex-grow mr-2 text-center" // Adds space on the right
                      />
                    </div>

                    <Button type="submit" className="w-full bg-[#515db1]">
                      Login
                    </Button>

                    {error && <div className="text-red-500">{error}</div>}
                    {success && <div className="text-green-500">{success}</div>}
                  </form>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
