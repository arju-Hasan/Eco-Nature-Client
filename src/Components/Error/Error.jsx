import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import 'animate.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
// import ErrorImg from '../../assets/img/Error.jpg';

const Error404 = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-primary text-white">
      

      
      <main className="flex flex-col justify-center items-center flex-grow text-center px-4">
        <img 
          data-aos="zoom-in"
          className="h-40 md:h-60 lg:h-80 mb-10 rounded-full animate__animated animate__pulse animate__infinite"
          src=""
          alt="Error" 
        />

        <p className="text-xl md:text-2xl text-blue-100 tracking-wide mb-6">
          OOPS! The page you are looking for doesn’t exist.
        </p>

        <motion.a
          href="/"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-5 py-3 rounded-full bg-primary hover:bg-primary shadow-lg transition-colors duration-300"
        >
          Go Back Home
        </motion.a>
      </main>
      
    </div>
  );
};

export default Error404;
