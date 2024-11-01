import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const FaqQuestion = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "I am unable to login. What should I do?",
      answer: "Please try resetting your password or contact support if the issue persists."
    },
    {
      question: "How can I join the Discord server after purchasing the course?",
      answer: "After purchasing, you'll receive an email with the invite link to join the server."
    },
    {
      question: "I have not received any email to join the Discord server. What should I do?",
      answer: "Check your spam folder, and if you still don’t see it, contact our support team."
    },
    {
      question: "I mistakenly bought the course and need a refund. What is the refund policy?",
      answer: "Refund requests can be submitted within 7 days of purchase. Contact support for assistance."
    },
    {
      question: "How can I access a lecture of the course?",
      answer: "Log in to your account and navigate to 'My Courses' to access your lectures."
    },
    {
      question: "What should I do if I am facing a lag issue in video recordings?",
      answer: "Ensure a stable internet connection, and try lowering the video quality if the issue persists."
    },
  ];

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col md:flex-row p-6 bg-black text-white min-h-screen space-x-0 md:space-x-6">
      {/* FAQ Section */}
      <div className="md:w-1/2 p-4">
        <h2 className="text-3xl font-bold mb-4 text-blue-500">Frequently Faced Issues</h2>
        <ul className="space-y-4">
          {faqs.map((faq, index) => (
            <li key={index} className="border-b border-gray-700 pb-4 flex flex-col">
              <div className="flex justify-between items-center">
                <h3
                  className="font-semibold text-lg flex-1 cursor-pointer hover:text-blue-500 transition-colors"
                  onClick={() => handleToggle(index)}
                >
                  {faq.question}
                </h3>
                <span className="ml-4 text-blue-500">
                  {openIndex === index ? <FaMinus /> : <FaPlus />}
                </span>
              </div>
              {openIndex === index && (
                <p className="bg-gray-800 mt-2 p-4 rounded-lg shadow-md">{faq.answer}</p>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Contact Form Section */}
      <div className="md:w-1/2 p-4 bg-[#141414] rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Send us a message</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-white mb-1" htmlFor="name">Name<span className="text-red-500">*</span></label>
            <input type="text" id="name" className="w-full p-2 rounded-lg bg-gray-800 text-white" placeholder="Enter your name" />
          </div>
          <div>
            <label className="block text-white mb-1" htmlFor="email">Email<span className="text-red-500">*</span></label>
            <input type="email" id="email" className="w-full p-2 rounded-lg bg-gray-800 text-white" placeholder="Enter your email" />
          </div>
          <div>
            <label className="block text-white mb-1" htmlFor="phone">Phone Number<span className="text-red-500">*</span></label>
            <input type="tel" id="phone" className="w-full p-2 rounded-lg bg-gray-800 text-white" placeholder="Enter your phone number" />
          </div>
          <div>
            <label className="block text-white mb-1" htmlFor="category">Category<span className="text-red-500">*</span></label>
            <select id="category" className="w-full p-2 rounded-lg bg-gray-800 text-white">
              <option>Not able to login</option>
              <option>Issue with Discord invite</option>
              <option>Refund request</option>
              <option>Accessing course content</option>
              <option>Video playback issues</option>
            </select>
          </div>
          <div>
            <label className="block text-white mb-1" htmlFor="message">Message<span className="text-red-500">*</span></label>
            <textarea id="message" className="w-full p-2 rounded-lg bg-gray-800 text-white" rows="4" placeholder="Enter your message"></textarea>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="captcha" className="mr-2" />
            <label htmlFor="captcha" className="text-white">I'm not a robot</label>
          </div>
          <button type="submit" className="w-full py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FaqQuestion;
