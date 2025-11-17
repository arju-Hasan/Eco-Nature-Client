import React from "react";
import { Link } from "react-router";
import { FaCalendarAlt, FaMapMarkerAlt, FaUser, FaUsers } from "react-icons/fa";
import useEvents from "../../Hooks/useEvents";
import Loader from "../../Pages/Loading";
import { ArrowBigRight } from "lucide-react";

const EventsCard = ({ event }) => {

const {loading} = useEvents();
  const {
    _id,
    title,
    description,
    date,
    location,
    organizer,
    maxParticipants,
    currentParticipants,
  } = event;

  const formattedDate = new Date(date).toLocaleString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });



  if (loading) {
    return (<Loader />);
  }

  return (
    <div className="card w-full max-w-md bg-white border border-gray-200 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 rounded-2xl">
      <div className="card-body p-6">
        <h2 className="card-title text-xl font-semibold text-green-600">
          {title}
        </h2>
        <p className="text-gray-600">{description}</p>

        <div className="mt-3 space-y-2 text-sm text-gray-700">
          <p className="flex items-center gap-2">
            <FaCalendarAlt className="text-green-600" /> {formattedDate}
          </p>
          <p className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-green-600" /> {location}
          </p>
          <p className="flex items-center gap-2">
            <FaUser className="text-green-600" /> {organizer}
          </p>
          <p className="flex items-center gap-2">
            <FaUsers className="text-green-600" /> {currentParticipants} / {maxParticipants} participants
          </p>
        </div>
            
            <div className="mt-10 mx-5 w-full flex justify-center">
                <Link to={`/events/${_id}`} className="w-full flex justify-center">
                    <span className="flex items-center gap-3 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-white hover:text-green-600 hover:border-green-600 border transition-colors duration-300">
                    View All EcoTips <ArrowBigRight />
                    </span>
                </Link>
                </div>
        </div>
      </div>
    
  );
};

export default EventsCard;
