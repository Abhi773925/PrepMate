import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "flowbite";
import { initFlowbite } from 'flowbite';

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    initFlowbite();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const isLoggedIn = Boolean(localStorage.getItem('userToken'));

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileMenuOpen) setDropdownOpen(false);
  };

  return (
    <div className='navbar sticky top-0 z-50 shadow-lg'>
      <nav className="bg-[#0D0C0A]">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-[#FFF9F8]">PrepMate</span>
          </Link>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {isLoggedIn ? (
              <>
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="relative inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white transition-all duration-300 bg-black border-2 border-transparent rounded-full overflow-hidden group hover:bg-opacity-60 md:px-6 md:py-3 md:text-lg"
                  >
                    {/* Glowing Effect Background */}
                    <span className="absolute inset-0 transition-all duration-300 bg-gradient-to-r from-purple-600 to-pink-600 opacity-30 rounded-full scale-110 group-hover:scale-125"></span>

                    {/* Button Text */}
                    <span>Welcome {localStorage.getItem('username')}</span>

                    {/* Traveling Border Animation */}
                    <span className="absolute inset-0 border-4 border-transparent rounded-full "></span>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 z-10 w-48 mt-2 bg-[#0D0C0A] border border-gray-700 rounded-md shadow-lg">
                      <div className="py-2">
                        <p className="block px-4 py-2 text-sm text-[#FFF9F8]">{localStorage.getItem('username')}</p>
                        <p className="block px-4 py-2 text-sm text-[#FFF9F8]">{localStorage.getItem('email') || 'No Email'}</p>
                        <Link to="/my-learning" className="block px-4 py-2 text-sm text-[#FFF9F8] rounded hover:bg-gray-700">
                          My Learning
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-[#FFF9F8] rounded hover:bg-gray-700"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/signup" className="block px-4 py-2 text-sm text-[#FFF9F8] rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600">Sign Up</Link>
                <Link to="/login" className="block px-4 py-2 text-sm text-[#FFF9F8] rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600">Login</Link>
              </>
            )}
          </div>

          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-[#0D0C0A]">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 text-[#FFF9F8] rounded md:bg-transparent md:p-0 md:hover:text-blue-700"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/courses"
                  className="block py-2 px-3 text-[#FFF9F8] rounded md:hover:text-blue-700 md:p-0"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/my-learning"
                  className="block py-2 px-3 text-[#FFF9F8] rounded md:hover:text-blue-700 md:p-0"
                >
                  My Learning
                </Link>
              </li>
              <li>
                <Link
                  to="/testimonials"
                  className="block py-2 px-3 text-[#FFF9F8] rounded md:hover:text-blue-700 md:p-0"
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="block py-2 px-3 text-[#FFF9F8] rounded md:hover:text-blue-700 md:p-0"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:hidden">
            <button onClick={toggleMobileMenu}
              data-collapse-toggle="navbar-user"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-user"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>

            {isMobileMenuOpen && (
              <div className="absolute right-0 z-10 w-48 mt-2 bg-black text-white border border-red-700 rounded-md shadow-lg">
                <ul className="flex flex-col font-medium p-4">
                  <li>
                    <Link
                      to="/"
                      className="block py-2 px-3 text-white rounded"
                      aria-current="page"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/courses"
                      className="block py-2 px-3 text-white rounded"
                    >
                      Courses
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/mock-tests"
                      className="block py-2 px-3 text-white rounded"
                    >
                      Mock Tests
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/testimonials"
                      className="block py-2 px-3 text-white rounded"
                    >
                      Testimonials
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="block py-2 px-3 text-white rounded"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
