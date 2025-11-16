// HowItWorks.jsx
import React from "react";
import { motion } from "framer-motion";
import { Target, BarChart2, MessageSquareHeart } from "lucide-react";

const steps = [
  {
    icon: <Target className="text-[#297B33] w-8 h-8" />,
    title: "Join a Challenge",
    desc: "Pick a sustainability challenge that inspires you — from waste reduction to energy saving. Take your first step toward greener living.",
  },
  {
    icon: <BarChart2 className="text-[#297B33] w-8 h-8" />,
    title: "Track Your Progress",
    desc: "Monitor your eco-actions, measure your impact, and see your personal contribution grow within the EcoTrack community.",
  },
  {
    icon: <MessageSquareHeart className="text-[#297B33] w-8 h-8" />,
    title: "Share Eco Tips",
    desc: "Inspire others by sharing practical tips and success stories — together we build a conscious, sustainable community.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-white" id="how-it-works">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          className="text-4xl md:text-4xl font-bold text-[#297B33] mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          How It Works
        </motion.h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          EcoTrack makes sustainable living simple and measurable.  
          Just follow three easy steps and start your journey toward a greener lifestyle.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-green-50 rounded-2xl shadow-md hover:shadow-lg p-8 text-center border border-green-100 transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="font-semibold text-[#297B33] text-lg mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
