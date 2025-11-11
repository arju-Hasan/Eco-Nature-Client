import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { motion } from "framer-motion";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const HeroSwiper = () => {
  const images = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    
  ];

  return (
    <div className="max-w-5xl mx-auto py-10">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        spaceBetween={30}
        slidesPerView={1}
        loop
        className="rounded-2xl overflow-hidden shadow-lg"
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <div className="relative group">
              <img
                src={img}
                alt={`slide-${i}`}
                className="w-full h-[300px] md:h-[350px] lg:h-[400px] xl:h-[500px] object-cover rounded-2xl"
              />
              
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="px-5 py-2 bg-primary text-white rounded-lg shadow-lg backdrop-blur-sm font-semibold hover:bg-secondary"
                >
                  About More
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="px-5 py-2 bg-primary text-white rounded-lg shadow-lg backdrop-blur-sm font-semibold hover:bg-secondary"
                >
                  Details
                </motion.button>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSwiper;
