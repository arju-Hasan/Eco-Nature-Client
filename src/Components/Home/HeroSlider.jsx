import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./HeroSlider.css";
import { Link } from "react-router";


const HeroSlider = () => {
  return (
    <div className="h-[60vh] w-full overflow-hidden">
      <Swiper
        direction="horizontal"
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        modules={[Pagination, Autoplay]}
        className="mySwiper h-full"
      >
        {/* Slide 1 - Join the Green Movement */}
        <SwiperSlide>
         <div
            className="flex flex-col items-center justify-center text-black text-center p-6 w-full h-full"
            style={{
              backgroundImage:
                "url('https://i.ibb.co.com/pBKDsGy2/environment-sustainable-ESG-climate-crop-id-2740832.jpg')",
              backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center",
            }}>
              <div className="bg-white/20 p-10 rounded-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Join the Green Movement
            </h2>
            <p className="max-w-xl mb-6 text-lg opacity-90">
              Be part of a sustainable community where every small action
              counts toward a cleaner, greener planet.
            </p>
            <Link to={"/events"} className="btn bg-green-500 hover:bg-green-600 text-white border-none">
              Join Now
            </Link>
          </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 - Take Sustainability Challenges */}
        <SwiperSlide>
          <div className="flex flex-col items-center justify-center h-full bg-[#82B532] text-black text-center p-6" style={{
              backgroundImage:
                "url('https://i.ibb.co.com/qYcjm1mB/ADL.webp')",
              backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center",
            }}>
               <div className="bg-white/60 p-10 rounded-2xl">
             <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Take Sustainability Challenges
            </h2>
            <p className="max-w-xl mb-6 text-lg opacity-90">
              Test your eco-habits and join community challenges that make
              real-world impact — from recycling to energy saving.
            </p>
            <Link to={"/challenges"} className="btn bg-green-600 text-white hover:bg-green-700 border-none">
              Explore Challenges
            </Link>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 - Discover Local Green Events */}
        <SwiperSlide>
          <div
            className="flex flex-col items-center justify-center h-full text-white text-center p-6 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://i.ibb.co.com/q3mw22w8/Homepage-Hero-4.jpg')",backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center",
            }}
          >
            <div className="p-10 rounded-2xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Discover Local Green Events
              </h2>
              <p className="max-w-xl mb-6 text-lg opacity-90">
                Stay connected with local eco-initiatives, workshops, and
                meetups that empower sustainable living.
              </p>
              <Link to={"/events"} className="btn bg-green-500 hover:bg-green-600 text-white border-none">
                Browse Events
              </Link>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 4 - Track Your Eco Impact */}
        <SwiperSlide>
          <div className="flex flex-col items-center justify-center h-full bg-[#D9F99D] text-white text-center p-6" style={{
              backgroundImage:
                "url('https://i.ibb.co.com/Z6T3dD2w/20230621165.jpg')",backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center",
            }} >
              <div className="bg-black/40 p-10 rounded-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Track Your Eco Impact
            </h2>
            <p className="max-w-xl mb-6 text-lg opacity-90">
              Monitor your personal progress, carbon savings, and contribution
              to the environment — and celebrate your green wins!
            </p>
            <Link to={"/my-activities"} className="btn bg-green-600 hover:bg-green-700 text-white border-none">
              Start Tracking
            </Link>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 5 - Share Your Eco Tips */}
        <SwiperSlide>
          <div
            className="flex flex-col items-center justify-center h-full text-white text-center p-6 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://i.ibb.co.com/Q3RjKNsx/eco-friendly.png')",backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center",
            }}
          >
            <div className="bg-black/40 p-10 rounded-2xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Your Eco Tips
              </h2>
              <p className="max-w-xl mb-6 text-lg opacity-90">
                Inspire others by sharing your sustainable habits and creative
                eco-friendly hacks with the community.
              </p>
              <Link to={"/eco-tips"} className="btn bg-green-500 hover:bg-green-600 text-white border-none">
               Your Tips
              </Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HeroSlider;
