import React from "react";
import { FaCalendarCheck } from "react-icons/fa";
import EventsCard from "../Event/EventsCard";
import { Link } from "react-router";
import useEvents from "../../Hooks/useEvents";

const UpcomingEvents = () => {

const {events}= useEvents();
// console.log(events);
  // Sort by date (latest upcoming first)
  const recentEvents = events?.sort((a, b) => new Date(a.date) - new Date(b.date))?.slice(0, 4); // Only 4 recent ones

  return (
    <section className="py-16 bg-base-200" id="upcoming-events">
      <div className="container mx-auto px-5">
        {/* Heading */}
        <div className="text-center mb-10">
          <div className="flex justify-center text-[#297B33] items-center gap-2 mb-2">
            <FaCalendarCheck size={40} />
            <h2 className="text-3xl md:text-4xl font-bold">Upcoming Events</h2>
          </div>
          
        </div>

        {/* Event Cards Grid */}
        <div className="grid justify-center sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentEvents.map((event) => (
            <EventsCard key={event._id} event={event}  />
            
          ))}
        </div>
        {/* View All Button */}
        <div className="text-center mt-10">
          <Link to={"/events"} className="btn bg-[#297B33] hover:bg-[#82B532] text-white transition-all">
            View All Events
          </Link>
        </div>

      </div>
    </section>
  );
};

export default UpcomingEvents;
