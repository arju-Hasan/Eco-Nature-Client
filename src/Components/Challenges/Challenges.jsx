import React, { useState } from "react";
import ActiveChallengesCard from "./ActiveChallengesCard";
import Loading from "../../Pages/Loading";
import useAllChallenges from "../../Hooks/useAllChallenges";
import ActiveChallengesCardSkeleton from "../../Components/ActiveChallengesCardSkeleton";
import Container from "../../Layouts/Container";

const Challenges = () => {
  // Filters input state
  const [participantsMinInput, setParticipantsMinInput] = useState("");
  const [participantsMaxInput, setParticipantsMaxInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [startDateFromInput, setStartDateFromInput] = useState("");
  const [startDateToInput, setStartDateToInput] = useState("");

  // Filters applied state (used in hook)
  const [appliedFilters, setAppliedFilters] = useState({});

  // Predefined categories for dropdown
  const categories = [
    "Waste Reduction",
    "Energy Saving",
    "Water Conservation",
    "Community Clean-Up",
    "Sustainable Diet",
    "Plastic-Free July"
  ];

  // Apply filters button
  const handleApplyFilters = () => {
    const f = {};
    if (participantsMinInput) f.participantsMin = participantsMinInput;
    if (participantsMaxInput) f.participantsMax = participantsMaxInput;
    if (categoryInput) f.category = categoryInput;
    if (startDateFromInput) f.startDateFrom = startDateFromInput;
    if (startDateToInput) f.startDateTo = startDateToInput;
    setAppliedFilters(f);
  };

  const { challenges, loading, error } = useAllChallenges(appliedFilters);



  // Safe sorting
  const sortedChallenges = [...challenges]
    .filter(challenge => challenge && challenge._id)
    .sort((a, b) => b._id.localeCompare(a._id));




  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
        {[1, 2, 3, 4].map((n) => (
          <ActiveChallengesCardSkeleton key={n} />
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl text-center py-5 font-bold mb-6 text-[#297B33]">All Challenges</h2>

      {/* Filters UI */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4 px-6 md:px-12">
        <input
          type="number"
          placeholder="Min Participants"
          value={participantsMinInput}
          onChange={(e) => setParticipantsMinInput(e.target.value)}
          className="input input-bordered w-full"
        />
        <input
          type="number"
          placeholder="Max Participants"
          value={participantsMaxInput}
          onChange={(e) => setParticipantsMaxInput(e.target.value)}
          className="input input-bordered w-full"
        />
        {/* Category Dropdown */}
        <select
          value={categoryInput}
          onChange={(e) => setCategoryInput(e.target.value)}
          className="select select-bordered w-full"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="date"
          placeholder="Start Date From"
          value={startDateFromInput}
          onChange={(e) => setStartDateFromInput(e.target.value)}
          className="input input-bordered w-full"
        />
        <input
          type="date"
          placeholder="Start Date To"
          value={startDateToInput}
          onChange={(e) => setStartDateToInput(e.target.value)}
          className="input input-bordered w-full"
        />
        {/* Apply Filter Button */}
        <button
          onClick={handleApplyFilters}
          className="btn bg-[#297B33] text-white hover:bg-[#82B532] w-full"
        >
          Apply Filter
        </button>
      </div>

      {/* Content */}
      {loading && <Loading />}
      {error && <p className="text-center text-red-500">Error loading challenges.</p>}
      {!loading && !error && !sortedChallenges.length && (
        <p className="text-center text-gray-500">No challenges found.</p>
      )}

      {!loading && !error && sortedChallenges.length > 0 && (
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 px-6 md:px-12">
          {sortedChallenges.map((challenge) => (
            <ActiveChallengesCard key={challenge._id} challenge={challenge} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Challenges;




































