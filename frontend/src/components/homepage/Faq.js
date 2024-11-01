import React from 'react';
import { FaCommentDots } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

const Faq = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleButtonClick = () => {
    navigate('/faq'); // Navigate to the FAQ question page
  };

  return (
    <div>
      {/* Sticky Button */}
      <button
        onClick={handleButtonClick}
        className="fixed bottom-4 right-4 flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200"
        aria-label="Open FAQ"
      >
        <FaCommentDots className="text-3xl" />
      </button>
    </div>
  );
};

export default Faq;
