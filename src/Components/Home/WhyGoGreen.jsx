// WhyGoGreen.jsx
import React from "react";
import { SiPaloaltonetworks } from "react-icons/si";
import {
  Leaf,
  Recycle,
  Globe2,
  HeartHandshake,
  Zap,
  Footprints,
} from "lucide-react";
import { motion } from "framer-motion";
import Container from "../../Layouts/Container";

const benefits = [
  {
    icon: <Leaf className="text-green-600 w-6 h-6" />,
    title: "Reduce Environmental Impact",
    desc: "Small changes in daily habits can drastically cut waste, pollution, and carbon emissions.",
  },
  {
    icon: <Globe2 className="text-green-600 w-6 h-6" />,
    title: "Protect Our Planet",
    desc: "Help preserve forests, oceans, and biodiversity for future generations through mindful living.",
  },
  {
    icon: <HeartHandshake className="text-green-600 w-6 h-6" />,
    title: "Build a Conscious Community",
    desc: "Join EcoTrack’s sustainability network and collaborate with people who share your eco values.",
  },
  {
    icon: <Recycle className="text-green-600 w-6 h-6" />,
    title: "Promote Circular Living",
    desc: "Adopt the ‘reduce, reuse, recycle’ mindset to extend product life and minimize waste.",
  },
  {
    icon: <Zap className="text-green-600 w-6 h-6" />,
    title: "Save Energy & Money",
    desc: "Energy-efficient habits reduce power bills and carbon output at the same time.",
  },
  {
    icon: <Footprints className="text-green-600 w-6 h-6" />,
    title: "Track Your Green Progress",
    desc: "With EcoTrack, measure your environmental impact and stay motivated with visible results.",
  },
];

const WhyGoGreen = () => {
  return (
    <section className="py-10" id="why-go-green">
      <Container>
        <div className="mx-auto px-6 text-center">
          <motion.h2
            className="flex text-3xl md:text-4xl gap-2 justify-center font-bold text-green-600 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SiPaloaltonetworks className="text-green-600" /> Why Go Green?
          </motion.h2>

          <p className="max-w-2xl mx-auto mb-12">
            Living sustainably isn’t just about saving the planet — it’s about
            improving your lifestyle, health, and future. JoinEcoTrack and start
            making measurable change today.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((item, index) => (
              <motion.div
                key={index}
                className="bg-green-200 rounded-2xl shadow-md hover:shadow-lg p-6 text-left border border-green-100 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center mb-3">
                  {item.icon}
                  <h3 className="ml-3 font-semibold text-green-600 text-lg">
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WhyGoGreen;
