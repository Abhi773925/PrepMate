import React from "react";
import { FaArrowRight, FaStar, FaGraduationCap } from "react-icons/fa"; 
import { useNavigate } from 'react-router-dom';

import "../../App.css";

const HeroSection = () => {
  const navigate=useNavigate();
  return (
    <div className="bg-[#0d0c0a] max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center justify-between pt-[1rem] sm:pt-[6rem] p-4">
      {/* Left side of the hero section */}
      <div className="text-left text-[#fff9f8] w-full lg:w-1/2">
        {/* Slogan for the website with new text color */}
        <h1 className="font-montserrat text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
        Bridging the gap between theory and mastery.
        </h1>
        <h3 className="font-grotesk text-lg mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
        one practice session at a time
        </h3>
        
        {/* Button and Student Count */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center">
          <div className="mb-4 lg:mb-0 lg:mr-4"> 
            <button onClick={()=>{navigate("/courses")}}  className="relative inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-[#fff9f8] transition-all duration-300 bg-[#0d0c0a] border-2 border-transparent rounded-full overflow-hidden group hover:bg-opacity-60 md:px-6 md:py-3 md:text-lg">
              {/* Glowing Effect Background */}
              <span className="absolute inset-0 transition-all duration-300 bg-gradient-to-r from-purple-600 to-pink-600 opacity-30 rounded-full scale-110 group-hover:scale-125"></span>
              {/* Button Text */}
              <span className="flex flex-row items-center"> 
                Browse Courses <FaArrowRight className="ml-2 -rotate-45" />
              </span>
              {/* Traveling Border Animation */}
              <span className="absolute inset-0 border-4 border-transparent rounded-full"></span>
            </button>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center border-[3px] rounded-3xl border-[#5e1204] p-2 relative overflow-hidden glow-border">
              <span className="font-montserrat text-2xl font-bold">300+</span>
              <span className="ml-2 font-montserrat text-1xl">Happy Students</span>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-[#0d0c0a] pl-0 p-6 max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Trust Section */}
            <div className="flex items-start bg-[#1f1f1f] p-4 rounded-lg">
              <div className="text-purple-600 text-4xl mr-4">
                <FaStar />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#fff9f8]">Trust</h3>
                <p className="text-gray-400">
                  Fostering reliability through integrity, empowering students with unwavering support.
                </p>
              </div>
            </div>

            {/* Excellence Section */}
            <div className="flex items-start bg-[#1f1f1f] p-4 rounded-lg">
              <div className="text-purple-600 text-4xl mr-4">
                <FaGraduationCap />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#fff9f8]">Excellence</h3>
                <p className="text-gray-400">
                  Striving for greatness, cultivating knowledge and skills in every learner.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right section of the hero section */}
      <div className="flex items-center justify-center mt-6 lg:mt-0 w-full lg:w-1/2">
        <img
          src="https://cdn3d.iconscout.com/3d/premium/thumb/education-3d-icon-download-in-png-blend-fbx-gltf-file-formats--knowledge-books-book-school-pack-icons-5522882.png?f=webp"
          alt="Building"
          className="w-full max-w-sm rounded-lg"
        />
      </div>
    </div>
  );
};

export default HeroSection;
