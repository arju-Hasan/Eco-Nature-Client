import React from 'react';
import useChallenges from '../../Hooks/useChallenges';
import ActiveChallengesCard from './ActiveChallengesCard';
import { Link } from 'react-router';

const ActiveChallenges = () => {
    const { challenges } = useChallenges();

    // Get today's date
    const today = new Date();

        // Sort challenges by _id (recent first)
  const sortedChallenges = [...challenges].sort(
    (a, b) => b._id.localeCompare(a._id) // newest first
  );

    // Filter active challenges
    const activeChallenges = sortedChallenges.filter(challenge => {
        const start = new Date(challenge.startDate);
        const end = new Date(challenge.endDate);
        return today >= start && today <= end;
    });
    const firstFourActive = activeChallenges.slice(0, 4);

    // console.log("Active data: ",firstFourActive);

    return (
        <div>
            <section className="py-12 bg-gray-50 text-center">
                {/* Heading + Subheading */}
                <div className="mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#297B33]">
                        Active Challenges
                    </h2>
                    <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                        Join an ongoing challenge and take a step toward a greener future.
                        Track your impact, inspire others, and make sustainable habits stick!
                    </p>
                </div>

                {/* Challenge Cards */}
                <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 px-6 md:px-12">
                    {firstFourActive.map((challenge) => (
                        <ActiveChallengesCard key={challenge._id} challenge={challenge} />
                    ))}
                </div>

                {/* View All Button */}
                <div className="mt-10">
                    <Link to={`/challenges`} className=" text-white px-6 py-2 rounded-xl bg-[#297B33] hover:bg-[#82B532] transition-colors duration-300">
                        View All Challenges
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default ActiveChallenges;










