import './App.css';
import FeaturedCourses from './components/courses/FeaturedCourses';
import HeroSection from './components/homepage/HeroSection';
import Navbar from './components/homepage/Navbar';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'; 
import TestInstructions from './components/courses/TestInstructions';  
import MockTestSeries from './components/mocktest/MockTestSeries';
import TimeAndClock from './components/testseries/TimeAndClock';
import WorkAndTime from './components/testseries/WorkAndTime';
import TestAnalysis from './components/testanalysis/TestAnalysis';
import Ntpc from './components/testseries/Ntpc';
import LoginForm from './components/form/LoginForm';
import SignUp from './components/form/SignUp';
import MotionWrapper from "./animations/MotionWrapper"; // Import MotionWrapper
import MyLearning from './components/enrollment/MyLearning';
import Accuracy from "./components/enrollment/Accuracy";
import Testimonials from './components/homepage/Testimonials';
import Footer from './components/homepage/Footer';
import Faq from './components/homepage/Faq';
import FaqQuestion from './components/homepage/FaqQuestion';
function App() {
  const location = useLocation(); // Get the current location

  return (
    <div>
      <Navbar />
      <MotionWrapper location={location}> {/* Wrap Routes in MotionWrapper */}
        <Routes location={location}>
          <Route path="/" element={
            <>
          
              <HeroSection />
              <FeaturedCourses />
              <Faq/>
              <Testimonials/>
              <Footer/>
              
            </>
          } />
          <Route path="/apple" element={<Accuracy />} />
          <Route path="/test-instructions" element={<TestInstructions />} />
          <Route path="/test-series/:courseId" element={<MockTestSeries />} />
          <Route path='/time-and-clock' element={<TimeAndClock />} />
          <Route path='/work-and-time' element={<WorkAndTime />} />
          <Route path='/test-analysis' element={<TestAnalysis />} />
          <Route path='/all-courses' element={<FeaturedCourses />} />
          <Route path='/rrb-ntpc' element={<Ntpc />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/courses' element={<FeaturedCourses />} />
          <Route path='/my-learning' element={<MyLearning/>}/>
          <Route path="/courses/test-series/:courseId" element={<MockTestSeries />} />
          <Route path='/faq' element={<FaqQuestion/>}/>
          <Route path='/contact' element={<FaqQuestion/>}/>
          <Route path='/testimonials'  element={<Testimonials/>}/>
       

        </Routes>
      </MotionWrapper>
    </div>
  );
}

// Wrap the App component with Router
const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
