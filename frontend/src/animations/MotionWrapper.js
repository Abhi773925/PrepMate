// MotionWrapper.js
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const MotionWrapper = ({ children, location }) => {
  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <AnimatePresence mode="wait"> {/* Set mode to 'wait' */}
      <motion.div
        key={location.key}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default MotionWrapper;
