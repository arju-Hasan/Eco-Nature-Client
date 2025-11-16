import React from "react";

const ParticipantCard = ({ participant }) => {
    return (
        <div className="flex flex-col md:flex-row  bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 w-full mx-auto my-4 hover:shadow-lg transition-shadow duration-300">

            {/* Left: Image */}

                <figure className="max-w-40  h-40 md:h-auto ">
                    <img
                        src={participant.imageUrl}
                        alt={participant.participantName}
                        className="w-full h-full object-cover  md:rounded-l-2xl"
                    />
                </figure>


            {/* Right: Info */}
            <div className=" w-full p-4 flex flex-col justify-between bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{participant.participantName}</h3>
                <p className="text-sm text-gray-700"><span className="font-medium text-gray-900">Email:</span> {participant.participantEmail}</p>
                <p className="text-sm text-gray-700"><span className="font-medium text-gray-900">Location:</span> {participant.location}</p>
                <p className="text-sm text-gray-700"><span className="font-medium text-gray-900">Join Date:</span> {participant.joinDate}</p>
                <p className="text-sm text-gray-700"><span className="font-medium text-gray-900">Notes:</span> {participant.notes}</p>
            </div>

        </div>
    );
};

export default ParticipantCard;
