import React from "react";

const ParticipantCard = ({ participant }) => {
  return (
    <div className="flex flex-col md:flex-row rounded-2xl shadow-md overflow-hidden border border-green-300 w-full mx-auto my-4 hover:shadow-lg transition-shadow duration-300">
      {/* Left: Image */}

      <figure className="max-w-40  h-40 md:h-auto ">
        <img
          src={participant.imageUrl}
          alt={participant.participantName}
          className="w-full h-full object-cover  md:rounded-xl"
        />
      </figure>

      {/* Right: Info */}
      <div className=" w-full p-4 flex flex-col justify-between ">
        <h3 className="text-lg font-semibold  mb-2">
          {participant.participantName}
        </h3>
        <p className="text-sm ">
          <span className="font-medium ">Email:</span>{" "}
          {participant.participantEmail}
        </p>
        <p className="text-sm ">
          <span className="font-medium ">Location:</span> {participant.location}
        </p>
        <p className="text-sm ">
          <span className="font-medium ">Join Date:</span>{" "}
          {participant.joinDate}
        </p>
        <p className="text-sm ">
          <span className="font-medium ">Notes:</span> {participant.notes}
        </p>
      </div>
    </div>
  );
};

export default ParticipantCard;
