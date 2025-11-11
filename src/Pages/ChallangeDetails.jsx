import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase/firebase.config"; 
import { AuthContext } from "../provider/AuthProvider";


const ChallengeDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joined, setJoined] = useState(false);

  // Fetch challenge data
  useEffect(() => {
    const fetchChallenge = async () => {
      setLoading(true);
      const docRef = doc(db, "challenges", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setChallenge(data);
        // Check if user already joined
        if (user && data.joinedUsers?.includes(user.uid)) {
          setJoined(true);
        }
      }
      setLoading(false);
    };

    fetchChallenge();
  }, [id, user]);

  // Handle Join Now
  const handleJoin = async () => {
    if (!user) return alert("Please login first!");
    if (!joined) {
      const docRef = doc(db, "challenges", id);
      await updateDoc(docRef, {
        participants: (challenge.participants || 0) + 1,
        joinedUsers: arrayUnion(user.uid),
      });
      setChallenge((prev) => ({
        ...prev,
        participants: (prev.participants || 0) + 1,
        joinedUsers: [...(prev.joinedUsers || []), user.uid],
      }));
      setJoined(true);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!challenge) return <p className="text-center mt-10 text-red-500">Challenge not found!</p>;

  return (
    <div className="max-w-5xl mx-auto my-10 p-6 bg-white rounded-xl shadow-lg">
      <img
        src={challenge.imageUrl}
        alt={challenge.title}
        className="w-full h-96 object-cover rounded-lg mb-6"
      />

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">{challenge.title}</h1>
        <p className="text-sm text-green-700 bg-green-200 rounded-full px-3 py-1 inline-block">
          {challenge.category}
        </p>
      </div>

      <p className="text-gray-700 mb-6">{challenge.description}</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-800 mb-6">
        <div>
          <span className="font-semibold">Duration:</span> {challenge.duration} days
        </div>
        <div>
          <span className="font-semibold">Participants:</span> {challenge.participants}
        </div>
        <div>
          <span className="font-semibold">Impact Metric:</span> {challenge.impactMetric}
        </div>
        <div>
          <span className="font-semibold">Target:</span> {challenge.target}
        </div>
        <div>
          <span className="font-semibold">Start Date:</span> {challenge.startDate}
        </div>
        <div>
          <span className="font-semibold">End Date:</span> {challenge.endDate}
        </div>
        <div>
          <span className="font-semibold">Created By:</span> {challenge.createdBy}
        </div>
      </div>

      <button
        onClick={handleJoin}
        className={`px-6 py-3 rounded-lg text-white font-semibold transition-colors ${
          joined ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
        }`}
        disabled={joined}
      >
        {joined ? "Joined" : "Join Now"}
      </button>
    </div>
  );
};

export default ChallengeDetails;


