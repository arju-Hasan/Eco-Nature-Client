import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

import useAxios from "../../hooks/useAxios";

const getNormalizedDate = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};
const calculateStreak = (completionHistory) => {
  if (!completionHistory || completionHistory.length === 0) return 0;
  const uniqueDates = new Set(
    completionHistory.map((entry) => getNormalizedDate(entry.date).getTime())
  );
  const sortedDates = Array.from(uniqueDates).sort((a, b) => b - a);
  let currentStreak = 0;
  const today = getNormalizedDate(new Date()).getTime();
  const yesterday = getNormalizedDate(
    new Date(today - 24 * 60 * 60 * 1000)
  ).getTime();
  if (sortedDates[0] === today || sortedDates[0] === yesterday) {
    currentStreak = 1;
  } else {
    return 0;
  }
  let currentDay = sortedDates[0];
  for (let i = 1; i < sortedDates.length; i++) {
    const nextDay = sortedDates[i];
    const expectedPreviousDay = getNormalizedDate(
      new Date(currentDay - 24 * 60 * 60 * 1000)
    ).getTime();
    if (nextDay === expectedPreviousDay) {
      currentStreak++;
      currentDay = nextDay;
    } else {
      break;
    }
  }
  return currentStreak;
};
const isCompletedToday = (completionHistory) => {
  if (!completionHistory || completionHistory.length === 0) return false;
  const today = getNormalizedDate(new Date()).getTime();
  return completionHistory.some(
    (entry) => getNormalizedDate(entry.date).getTime() === today
  );
};
const calculateProgress = (completionHistory) => {
  if (!completionHistory || completionHistory.length === 0) return 0;
  const today = new Date();
  const thirtyDaysAgo = new Date(new Date().setDate(today.getDate() - 30));
  const todayNormalized = getNormalizedDate(today).getTime();
  const thirtyDaysAgoNormalized = getNormalizedDate(thirtyDaysAgo).getTime();
  const uniqueDatesLast30Days = new Set(
    completionHistory
      .map((entry) => getNormalizedDate(entry.date).getTime())
      .filter(
        (date) => date >= thirtyDaysAgoNormalized && date <= todayNormalized
      )
  );
  const progress = (uniqueDatesLast30Days.size / 30) * 100;
  return Math.round(progress);
};

const HabitDetails = () => {
  const { id } = useParams();
  const { user, loading: authLoading } = useAuth();
  const axios = useAxios();
  const navigate = useNavigate();

  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchHabitDetails = useCallback(() => {
    setLoading(true);
    axios
      .get(`/habit/${id}`)
      .then((res) => {
        setHabit(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch habit details:", error);
        if (error.response?.status === 404) {
          setHabit(null);
        }
        setLoading(false);
      });
  }, [id, axios]);

  useEffect(() => {
    fetchHabitDetails();
  }, [fetchHabitDetails]);

  const handleMarkComplete = (id) => {
    axios.patch(`/habits/complete/${id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Great Job!",
          text: "You completed this habit for today.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });

        const updatedHabit = {
          ...habit,
          completionHistory: [...habit.completionHistory, { date: new Date() }],
        };
        setHabit(updatedHabit);
      } else if (res.data.message === "Habit already completed today.") {
        toast("You already completed this today!", { icon: "👏" });
      } else {
        toast.error("Could not mark as complete.");
      }
    });
  };

  if (loading || authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }
  if (!habit) {
    return (
      <div className="text-center my-20">
        <h1 className="text-3xl font-bold mb-4">Habit Not Found.</h1>
      </div>
    );
  }

  const streak = calculateStreak(habit.completionHistory);
  const progress = calculateProgress(habit.completionHistory);
  const completedToday = isCompletedToday(habit.completionHistory);

  return (
    <div className="max-w-4xl mx-auto p-4 my-10">
      <div className="card lg:card-side bg-base-100 shadow-2xl">
        {habit.image && (
          <figure className="lg:w-1/2">
            <img
              src={habit.image}
              alt={habit.title}
              className="w-full h-full object-cover"
            />
          </figure>
        )}
        <div className="card-body lg:w-1/2">
          <div className="badge badge-primary">{habit.category}</div>
          <h1 className="card-title text-4xl font-bold mt-2">{habit.title}</h1>
          <p className="py-4">
            {habit.description || "No description provided."}
          </p>
          <p className="text-sm text-gray-500">Created by: {habit.userName}</p>
          <hr className="my-4" />
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Current Streak:</h3>
            <div className="badge badge-lg badge-accent font-bold p-4">
              {streak} Days
            </div>
          </div>
          <div className="mt-4">
            <label className="label">
              <span className="label-text">Progress (Last 30 Days)</span>
              <span className="label-text-alt">{progress}%</span>
            </label>
            <progress
              className="progress progress-primary w-full"
              value={progress}
              max="100"
            ></progress>
          </div>
          <div className="card-actions justify-end mt-6">
            <button
              onClick={() => handleMarkComplete(habit._id)}
              className="btn btn-primary btn-lg w-full"
              disabled={completedToday}
            >
              {completedToday ? "Completed for Today" : "Mark as Complete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitDetails;
