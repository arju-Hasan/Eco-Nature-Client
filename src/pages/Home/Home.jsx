
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useAxios from "../../hooks/useAxios"; 


import slider1 from "../../assets/a.webp";
import slider2 from "../../assets/2.jpg";
import slider3 from "../../assets/3.jpeg";


const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
};


const sectionVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const Home = () => {
  const [featuredHabits, setFeaturedHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const axios = useAxios();

  useEffect(() => {
    setLoading(true);

    
    axios
      .get("/habits/featured")
      .then((res) => {
        setFeaturedHabits(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch featured habits:", error);
        setLoading(false);
      });
  }, [axios]);

  return (
    <div>
     
      <div className="w-full max-w-6xl mx-auto my-10 p-4">
        <Slider {...sliderSettings}>
         
          <div className="relative h-[450px] rounded-lg overflow-hidden">
            <img src={slider1} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent flex items-center justify-center text-center p-12">
              <div>
                <h1 className="text-4xl font-bold text-white mb-4">
                  Build Habits, Achieve Goals
                </h1>
                <p className="text-lg text-gray-200 mb-6">
                  Start tracking your daily habits and build a productive
                  streak.
                </p>
                <Link to="/add-habit" className="btn btn-primary">
                  Add New Habit
                </Link>
              </div>
            </div>
          </div>
          
          <div className="relative h-[450px] rounded-lg overflow-hidden">
            <img src={slider2} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent flex items-center justify-center text-center p-12">
              <div>
                <h1 className="text-4xl font-bold text-white mb-4">
                  See Your Progress
                </h1>
                <p className="text-lg text-gray-200 mb-6">
                  Visualize your journey with detailed stats and streaks.
                </p>
                <Link to="/my-habits" className="btn btn-primary">
                  View My Habits
                </Link>
              </div>
            </div>
          </div>
          
          <div className="relative h-[450px] rounded-lg overflow-hidden">
            <img src={slider3} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent flex items-center justify-center text-center p-12">
              <div>
                <h1 className="text-4xl font-bold text-white mb-4">
                  Join the Community
                </h1>
                <p className="text-lg text-gray-200 mb-6">
                  Browse public habits and get inspired by others.
                </p>
                <Link to="/browse-public" className="btn btn-primary">
                  Browse Habits
                </Link>
              </div>
            </div>
          </div>
        </Slider>
      </div>

    
      <motion.div
        className="max-w-6xl mx-auto p-4 my-16"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold text-center mb-10">
          Featured Habits
        </h2>
        {loading ? (
          <div className="text-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredHabits.map((habit) => (
              <div key={habit._id} className="card bg-base-100 shadow-xl">
                {habit.image && (
                  <figure className="h-48">
                    <img
                      src={habit.image}
                      alt={habit.title}
                      className="w-full h-full object-cover"
                    />
                  </figure>
                )}
                <div className="card-body">
                  <h3 className="card-title">{habit.title}</h3>
                  <p>
                    {habit.description
                      ? habit.description.substring(0, 100) + "..."
                      : "No description."}
                  </p>
                  <div className="card-actions justify-between items-center mt-4">
                    <div className="badge badge-outline">{habit.category}</div>
                    <Link
                      to={`/habit/${habit._id}`}
                      className="btn btn-primary btn-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>


      <motion.div
        className="max-w-6xl mx-auto p-4 my-16 bg-base-200 rounded-lg py-10"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold text-center mb-10">
          Why Build Habits?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        
          <div className="card bg-base-100 shadow-lg p-6">
            <div className="text-primary mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Boosts Productivity</h3>
            <p>Consistent actions lead to massive results over time.</p>
          </div>
          <div className="card bg-base-100 shadow-lg p-6">
            <div className="text-primary mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Improves Focus</h3>
            <p>Reduce distractions by automating daily decisions.</p>
          </div>
          <div className="card bg-base-100 shadow-lg p-6">
            <div className="text-primary mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.873 4.873C7.596 2.15 11.08 1.95 14.04 4.077l1.832 1.62C18.6 7.82 19 10.93 17.5 13.9c-1.1 2.2-3.2 3.8-5.7 4.5"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Reduces Stress</h3>
            <p>A predictable routine brings peace and order to your life.</p>
          </div>
          <div className="card bg-base-100 shadow-lg p-6">
            <div className="text-primary mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Builds Momentum</h3>
            <p>Small wins every day build confidence and motivation.</p>
          </div>
        </div>
      </motion.div>

      
      <motion.div
        className="max-w-6xl mx-auto p-4 my-16"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold text-center mb-10">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          
          <div className="p-6">
            <div className="inline-block p-4 bg-primary text-primary-content rounded-full mb-4">
              <span className="text-3xl font-bold">1</span>
            </div>
            <h3 className="text-2xl font-semibold mb-2">Create a Habit</h3>
            <p>
              Go to "Add Habit" and define your new goal, category, and
              reminders.
            </p>
          </div>
          
          <div className="p-6">
            <div className="inline-block p-4 bg-primary text-primary-content rounded-full mb-4">
              <span className="text-3xl font-bold">2</span>
            </div>
            <h3 className="text-2xl font-semibold mb-2">Mark as Complete</h3>
            <p>
              Visit "My Habits" daily and click "Mark Complete" to build your
              streak.
            </p>
          </div>
          
          <div className="p-6">
            <div className="inline-block p-4 bg-primary text-primary-content rounded-full mb-4">
              <span className="text-3xl font-bold">3</span>
            </div>
            <h3 className="text-2xl font-semibold mb-2">Analyze Progress</h3>
            <p>
              Check your "Dashboard" to see your weekly progress in a visual
              chart.
            </p>
          </div>
        </div>
      </motion.div>

      
      <motion.div
        className="max-w-6xl mx-auto p-4 my-16 bg-base-200 rounded-lg py-10"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold text-center mb-12">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         
          <div className="card bg-base-100 p-6 shadow-lg">
            <p className="italic">
              "This tracker changed my life. Seeing my streak grow from 0 to 30
              days for 'Morning Exercise' was the motivation I needed!"
            </p>
            <div className="flex items-center mt-4">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img src="https://i.pravatar.cc/150?img=12" />
                </div>
              </div>
              <div className="ml-4">
                <p className="font-semibold">Jane D.</p>
                <p className="text-sm opacity-70">Fitness Enthusiast</p>
              </div>
            </div>
          </div>
          
          <div className="card bg-base-100 p-6 shadow-lg">
            <p className="italic">
              "The dashboard is amazing. I finally understood my study patterns.
              Highly recommend this tool for students."
            </p>
            <div className="flex items-center mt-4">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img src="https://i.pravatar.cc/150?img=5" />
                </div>
              </div>
              <div className="ml-4">
                <p className="font-semibold">Mark S.</p>
                <p className="text-sm opacity-70">University Student</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
