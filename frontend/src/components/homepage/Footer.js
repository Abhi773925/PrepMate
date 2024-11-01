import { FaFacebookF, FaGooglePlusG, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#0d0c0a] py-8 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold text-[#fff9f8] mb-4">Let’s connect!</h2>
        <p className="text-[#fff9f8] mb-4">
          Employers & Recruiters stay up to date with the latest product updates & announcements:
        </p>
        <div className="flex justify-center mb-4">
          <input
            type="email"
            placeholder="type your e-mail here..."
            className="border border-[#fff9f8] rounded-l-lg px-4 py-2 bg-[#0d0c0a] text-[#fff9f8] placeholder-[#fff9f8]/70 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button className="bg-red-600 text-white font-semibold rounded-r-lg px-4 py-2 hover:bg-red-700 transition duration-200">
            Join
          </button>
        </div>
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="text-[#fff9f8] hover:text-orange-500 transition duration-200">
            <FaFacebookF className="h-6 w-6" />
          </a>
          <a href="#" className="text-[#fff9f8] hover:text-orange-500 transition duration-200">
            <FaGooglePlusG className="h-6 w-6" />
          </a>
          <a href="#" className="text-[#fff9f8] hover:text-orange-500 transition duration-200">
            <FaInstagram className="h-6 w-6" />
          </a>
          <a href="#" className="text-[#fff9f8] hover:text-orange-500 transition duration-200">
            <FaLinkedinIn className="h-6 w-6" />
          </a>
          <a href="#" className="text-[#fff9f8] hover:text-orange-500 transition duration-200">
            <FaTwitter className="h-6 w-6" />
          </a>
        </div>
        <p className="text-xs text-[#fff9f8]/70">PrepMate 2024 © All Rights reserved</p>
        <p className="text-xs text-[#fff9f8]/70">Designed by PrepMate</p>
      </div>
    </footer>
  );
};

export default Footer;
