import React, { useContext, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";
import Container from "../../Layouts/Container";
import { CircleCheckBig } from "lucide-react";
import { BiSolidCategory } from "react-icons/bi";
import { RiIdCardFill, RiUserSharedFill } from "react-icons/ri";
import { GiVote } from "react-icons/gi";

const EcoTipCard = ({ tip }) => {
  const {
    _id,
    title,
    content,
    category,
    author,
    authorName,
    upvotes,
    createdAt,
  } = tip;
  const formattedDate = new Date(createdAt).toLocaleDateString();
  const { user } = useContext(AuthContext);

  const [voteCount, setVoteCount] = useState(upvotes);
  const [isVoting, setIsVoting] = useState(false);

  const handleUpvote = async () => {
    if (!user?.email) {
      return Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to upvote!",
      });
    }

    try {
      setIsVoting(true);

      const res = await axios.patch(
        `https://y-xi-drab.vercel.app/api/eco-tips/${_id}/upvotes`,
        {
          email: user.email,
        }
      );

      setVoteCount((prev) => prev + 1);

      Swal.fire({
        icon: "success",
        title: "Vote Successful!",
        text: res.data.message,
        confirmButtonText: "OK",
        customClass: {
          confirmButton:
            "bg-[#297B33] hover:bg-[#82B532] text-white py-2 px-4 rounded-xl transition-colors",
        },
      });
    } catch (err) {
      console.error("Error upvoting:", err);
      Swal.fire({
        icon: "error",
        text: "Upvote Failed",
        title: err.response?.data?.message || "Something went wrong",
      });
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div className="border border-green-400 rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-lg p-4">
      <div className="flex flex-col justify-between h-full">
        <div className="flex-grow">
          {/* Card Header */}
          <div className="bg-green-600 px-4 py-2 rounded-tl-full rounded-br-full mb-4">
            <h2 className="text-white font-semibold text-lg">{title}</h2>
          </div>

          {/* Card Content */}
          <div className="px-4">
            <p className="font-semibold mb-2">{content}</p>
            <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
              {/* <span className="font-medium">Category:</span> {category} */}
              <p className="flex items-center gap-2">
                <BiSolidCategory className="text-green-600" />
                {category}
              </p>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
              {/* <span className="font-medium">Author Email:</span> {author} <RiUserSharedFill /> */}
              <p className="flex items-center gap-2">
                <RiUserSharedFill className="text-green-600" />
                {author}
              </p>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
              <span className="flex items-center gap-2 font-medium">
                <RiIdCardFill className="text-green-600" />
                Name:
              </span>
              {authorName}
            </div>
            <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
              <span className="flex itmes-center gap-2 font-medium">
                <GiVote className="text-green-600" />
                Upvotes:
              </span>{" "}
              {voteCount}
            </div>
            <div className="text-sm text-gray-500">
              Posted on: {formattedDate}
            </div>
          </div>
        </div>

        {/* Footer Button */}
        <div className="flex justify-center border-t-3 border-dotted border-green-500 mt-5 pt-5">
          <button
            onClick={handleUpvote}
            disabled={isVoting}
            className={`rounded-tr-4xl rounded-bl-4xl flex flex-col justify-center mb-2 items-center w-2/4 px-4 py-2 bg-green-600 text-white text-center font-medium cursor-pointer hover:bg-green-200 hover:text-green-600 hover:border-green-600 border transition-colors duration-300 ${
              isVoting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            <CircleCheckBig />
            <span>{isVoting ? "Voting..." : "Liked Tip"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EcoTipCard;
