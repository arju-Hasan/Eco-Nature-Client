import React from "react";
import { Link } from "react-router";
import { LuAlarmClock } from "react-icons/lu";
import { BiSolidCategory } from "react-icons/bi";
import { FaHourglassEnd, FaHourglassStart, FaUsers } from "react-icons/fa";
import { FaUserPen } from "react-icons/fa6";
import { TbTargetArrow } from "react-icons/tb";

const ActiveChallengesCard = ({ challenge }) => {
  return (
    <div className="md:flex-row  rounded-2xl shadow-md hover:shadow-2xl overflow-hidden transform hover:-translate-y-1 transition-all duration-300 mx-auto border border-green-300">
      {/* Left Side: Image */}
      <div className="flex flex-col justify-between h-full">
        <div>
          <img
            src={challenge.imageUrl}
            alt={challenge.title}
            // className="w-full h-40 md:h-60 lg:h-80 object-cover"
            className="w-full aspect-video object-cover rounded-lg"
          />

          <div className=" w-full p-6 flex flex-col justify-between">
            {/* Step 1: Title */}
            <h2 className="text-2xl text-start font-semibold  mb-0">
              {challenge.title}
            </h2>
            <hr />
            <div className="text-start space-y-2  text-sm mt-4">
              {/* Step 2: Category */}
              <div className="flex justify-between">
                <p className="flex items-center gap-2">
                  <BiSolidCategory className="text-green-600" />
                  {challenge.category}
                </p>

                {/* Step 3: Duration */}
                <p className="flex items-center gap-2">
                  <LuAlarmClock className="text-green-600" />
                  {challenge.duration} days
                </p>
              </div>

              <div className="flex justify-between">
                {/* Step 5: Created By */}
                <p className="flex items-center gap-2">
                  <FaUserPen className="text-green-600" />
                  {challenge.createdBy}
                </p>

                {/* Step 4: Participants */}
                <p className="flex font-bold items-center gap-2">
                  <FaUsers className="text-green-600" />
                  {challenge.participants}
                </p>
              </div>

              <div className="flex justify-between">
                {/* Step 6: Start Date */}
                <p className="flex items-center gap-2">
                  <FaHourglassStart className="text-green-600" />
                  {challenge.startDate}
                </p>

                {/* Step 7: End Date */}
                <p className="flex items-center gap-2">
                  <FaHourglassEnd className="text-green-600" />
                  {challenge.endDate}
                </p>
              </div>

              {/* Step 8: Target */}
              <p className="flex items-center gap-2">
                <TbTargetArrow className="text-green-600" /> {challenge.target}
              </p>

              {/* Step 9: Impact Metric */}
              <p className="flex items-center gap-2">
                <span className="font-medium ">Impact Metric:</span>
                {challenge.impactMetric}
              </p>
            </div>
          </div>
        </div>

        {/* Button */}
        <Link
          to={`/challenges/${challenge._id}`}
          className="mb-4 mx-2 text-center bg-green-600 hover:bg-white hover:text-green-600 hover:border-green-600 border text-white py-2 rounded-xl  transition-colors duration-300 font-medium"
        >
          View Challenge
        </Link>
      </div>
    </div>
  );
};

export default ActiveChallengesCard;
