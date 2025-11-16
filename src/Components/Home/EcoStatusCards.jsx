import React, { useEffect, useState } from "react";
import { FaLeaf, FaUsers, FaCloud } from "react-icons/fa";
import Container from "../../Layouts/Container";
import useChallenges from "../../Hooks/useChallenges";

const EcoStatusCards = () => {
  const { challenges, loading, error } = useChallenges();

  const [stats, setStats] = useState({
    activeChallenges: 0,
    totalParticipants: 0,
    co2Saved: 0,
  });

  useEffect(() => {
    if (!loading && challenges.length > 0) {
      const today = new Date();

      // Active Challenges: ongoing today
      const activeChallenges = challenges.filter(
        (ch) =>
          new Date(ch.startDate) <= today && new Date(ch.endDate) >= today
      ).length;

      // Total Participants: sum of participants field
      const totalParticipants = challenges.reduce(
        (sum, ch) => sum + (Number(ch.participants) || 0),
        0
      );

      // Total CO2 Saved: sum of impactMetric field
      const co2Saved = challenges.reduce(
        (sum, ch) => sum + (Number(ch.impactMetric) || 0),
        0
      );

      setStats({ activeChallenges, totalParticipants, co2Saved });
    }
  }, [challenges, loading]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error.message}</p>;

  return (
    <div className="py-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-6 bg-white rounded-2xl shadow text-center border border-gray-100">
            <div className="flex justify-center text-green-500 text-3xl mb-2">
              <FaLeaf />
            </div>
            <h2 className="text-4xl font-bold">{stats.activeChallenges}</h2>
            <p className="text-gray-500 mt-1">Active Challenges</p>
          </div>

          {/* Card 2 */}
          <div className="p-6 bg-white rounded-2xl shadow text-center border border-gray-100">
            <div className="flex justify-center text-green-500 text-3xl mb-2">
              <FaUsers />
            </div>
            <h2 className="text-3xl font-bold">{stats.totalParticipants}</h2>
            <p className="text-gray-500 mt-1">Total Participants</p>
          </div>

          {/* Card 3 */}
          <div className="p-6 bg-white rounded-2xl shadow text-center border border-gray-100">
            <div className="flex justify-center text-green-500 text-3xl mb-2">
              <FaCloud />
            </div>
            <h2 className="text-3xl font-bold">{stats.co2Saved} kg</h2>
            <p className="text-gray-500 mt-1">CO₂ Saved</p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default EcoStatusCards;
