import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios"; 

const BrowsePublicHabits = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const axios = useAxios();


  const fetchPublicHabits = useCallback(
    (url) => {
      setLoading(true);
      axios
        .get(url)
        .then((res) => {
          setHabits(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch public habits:", error);
          setLoading(false);
        });
    },
    [axios]
  );

  useEffect(() => {
    fetchPublicHabits("/habits");
  }, [fetchPublicHabits]);


  const handleFilterSubmit = (e) => {
    e.preventDefault();


    const params = new URLSearchParams();
    if (category) {
      params.append("category", category);
    }
    if (searchTerm) {
      params.append("search", searchTerm);
    }

   
    fetchPublicHabits(`/habits?${params.toString()}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 my-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        Browse Public Habits
      </h1>

   
      <form
        onSubmit={handleFilterSubmit}
        className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-base-200 rounded-lg shadow"
      >
        <div className="form-control grow">
          <input
            type="text"
            placeholder="Search by habit title..."
            className="input input-bordered w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="form-control w-full md:w-64">
          <select
            className="select select-bordered"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Morning">Morning</option>
            <option value="Work">Work</option>
            <option value="Fitness">Fitness</option>
            <option value="Evening">Evening</option>
            <option value="Study">Study</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Filter
        </button>
      </form>

      {loading ? (
        <div className="text-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : habits.length === 0 ? (
        <p className="text-center text-lg">
          No habits found matching your criteria.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {habits.map((habit) => (
            <div key={habit._id} className="card bg-base-100 shadow-xl">
              {habit.image && (
                <figure className="h-48">
                  <img
                    src={habit.image}
                    alt={habit.title}
                    className="w-full h-full object-cover"
                  />
                </figure>
              )}
              <div className="card-body">
                <h3 className="card-title">{habit.title}</h3>
                <p>
                  {habit.description
                    ? habit.description.substring(0, 100) + "..."
                    : "No description."}
                </p>
                <div className="mt-4">
                  <div className="badge badge-outline">{habit.category}</div>
                  <p className="text-sm mt-2">
                    By: {habit.userName || "Anonymous"}
                  </p>
                </div>
                <div className="card-actions justify-end mt-4">
                  <Link
                    to={`/habit/${habit._id}`}
                    className="btn btn-primary btn-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowsePublicHabits;
