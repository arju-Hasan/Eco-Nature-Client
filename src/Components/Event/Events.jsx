import React from "react";
import { FaCalendarCheck } from "react-icons/fa";
import useEvents from "../../Hooks/useEvents";
import EventsCard from "./EventsCard";
import EcoTipCardSkeleton from "../Eco-tip/EcoTipCardSkeleton";
import Container from "../../Layouts/Container";
import Loading from "../../Pages/Loading";


const Events = () => {

const {events, loading, error}= useEvents();

  if (loading) {
    return (
    
      <Loading />
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }


  return (
    <section className="py-16 bg-base-200" id="upcoming-events">
      <div className="container mx-auto px-5">
        {/* Heading */}
        <div className="text-center mb-10">
          <div className="flex justify-center text-green-600 items-center gap-2 mb-2">
            <FaCalendarCheck size={24} />
            <h2 className="text-3xl font-bold">All Events</h2>
          </div>
          <p className="text-gray-600 max-w-xl mx-auto">
            Join our community initiatives and make a real difference in the environment.
          </p>
        </div>

        {/* Event Cards Grid */}
        <div className="grid justify-center sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <EventsCard key={event._id} event={event}  />
            
          ))}
        </div>

      </div>
    </section>
  );
};

export default Events;
