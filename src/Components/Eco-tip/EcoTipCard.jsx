
import React, { useContext, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";

const EcoTipCard = ({ tip }) => {
  const { _id, title, content, category, author, authorName, upvotes, createdAt } = tip;
  const formattedDate = new Date(createdAt).toLocaleDateString();
   const { user } = useContext(AuthContext);

  const [voteCount, setVoteCount] = useState(upvotes);
  const [isVoting, setIsVoting] = useState(false);

  const handleUpvote = async () => {
    if (isVoting) return;

    // Check if already voted
    const voted = localStorage.getItem(`voted_${_id}`);
    if (voted) {
      return Swal.fire({
        icon: "warning",
        title: "Already Upvoted!",
        text: "You have already voted for this tip.",
        confirmButtonText: "OK",
        customClass: {
          confirmButton:
            "bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-xl transition-colors",
        },
      });
    }

    try {
      setIsVoting(true);
      setVoteCount(prev => prev + 1);

      // await axios.patch(`http://localhost:3000/api/ecotips/${_id}/upvote`);
 await axios.patch(
  `http://localhost:3000/api/eco-tips/${_id}/upvote`,
  { email: user?.email }
);

      // Store vote status
      localStorage.setItem(`voted_${_id}`, true);

      Swal.fire({
        icon: "success",
        title: "Vote Successful!",
        text: "Upvote added successfully 🎉",
        confirmButtonText: "OK",
        customClass: {
          confirmButton:
            "bg-[#297B33] hover:bg-[#82B532] text-white py-2 px-4 rounded-xl transition-colors",
        },
      });

    } catch (error) {
      console.error("Error upvoting:", error);
      setVoteCount(prev => prev - 1);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
      {/* Card Header */}
      <div className="bg-[#297B33] px-4 py-2">
        <h2 className="text-white font-semibold text-lg">{title}</h2>
      </div>

      {/* Card Content */}
      <div className="p-4">
        <p className="text-gray-700 mb-2">{content}</p>
        <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
          <span className="font-medium">Category:</span> {category}
        </div>
        <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
          <span className="font-medium">Author Email:</span> {author}
        </div>
        <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
          <span className="font-medium">Author Name:</span> {authorName}
        </div>
        <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
          <span className="font-medium">Upvotes:</span> {voteCount}
        </div>
        <div className="text-sm text-gray-400">
          Posted on: {formattedDate}
        </div>
      </div>

      {/* Footer Button */}
      <div className="flex justify-center">
        <button
          onClick={handleUpvote}
          disabled={isVoting}
          className={`rounded-t-4xl flex flex-col justify-center items-center w-1/3 px-4 py-2 bg-[#297B33] text-white text-center font-medium cursor-pointer hover:bg-[#82B532] transition-colors duration-300 ${
            isVoting ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          <FaArrowUp />
          <span>{isVoting ? "Voting..." : "Upvote Tip"}</span>
        </button>
      </div>
    </div>
  );
};

export default EcoTipCard;
