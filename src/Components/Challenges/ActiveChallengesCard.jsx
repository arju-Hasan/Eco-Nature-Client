import React from "react";
import { Link } from "react-router";

const ActiveChallengesCard = ({ challenge }) => {
  
  return (
    <div className=" md:flex-row bg-white rounded-2xl shadow-md hover:shadow-2xl overflow-hidden transform hover:-translate-y-1 transition-all duration-300 max-w-4xl mx-auto border border-gray-100">
      {/* Left Side: Image */}
      <div className="flex flex-col justify-between h-full">
        <div>
        <img
          src={challenge.imageUrl}
          alt={challenge.title}
          className="w-full h-40 md:h-60 lg:h-80 object-cover"
        />
     
      <div className=" w-full p-6 flex flex-col justify-between bg-gray-50">
        {/* Step 1: Title */}
        <h2 className="text-2xl text-start font-semibold text-gray-800 mb-4">
          {challenge.title}
        </h2>

        <div className="text-start space-y-2 text-gray-700 text-sm">
          {/* Step 2: Category */}
          <p>
            <span className="font-medium text-gray-900">Category:</span>{" "}
            {challenge.category}
          </p>

          {/* Step 3: Duration */}
          <p>
            <span className="font-medium text-gray-900">Duration:</span>{" "}
            {challenge.duration} days
          </p>

          {/* Step 4: Participants */}
          <p>
            <span className="font-medium text-gray-900">Participants:</span>{" "}
            {challenge.participants}
          </p>

          {/* Step 5: Created By */}
          <p>
            <span className="font-medium text-gray-900">Created By:</span>{" "}
            {challenge.createdBy}
          </p>

          {/* Step 6: Start Date */}
          <p>
            <span className="font-medium text-gray-900">Start Date:</span>{" "}
            {challenge.startDate}
          </p>

          {/* Step 7: End Date */}
          <p>
            <span className="font-medium text-gray-900">End Date:</span>{" "}
            {challenge.endDate}
          </p>

          {/* Step 8: Target */}
          <p>
            <span className="font-medium text-gray-900">Target:</span>{" "}
            {challenge.target}
          </p>

          {/* Step 9: Impact Metric */}
          <p>
            <span className="font-medium text-gray-900">Impact Metric:</span>{" "}
            {challenge.impactMetric}
          </p>
        </div>
        </div>
        </div>

        {/* Button */}
        <Link  to={`/challenges/${challenge._id}`} className="mb-4 mx-2 text-center bg-green-600 hover:bg-white hover:text-green-600 hover:border-green-600 border text-white py-2 rounded-xl  transition-colors duration-300 font-medium">
          View Challenge
        </Link>
      </div>
    </div>
  );
};

export default ActiveChallengesCard;

