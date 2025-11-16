import React from 'react';
import useChallenges from '../../Hooks/useChallenges';
import ActiveChallengesCard from './ActiveChallengesCard';
import { Link } from 'react-router';
import Container from '../../Layouts/Container';
import { ArrowBigRight } from 'lucide-react';

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
            <Container>
            <section className="pt-12 bg-gray-50 text-center">
                {/* Heading + Subheading */}
                <div className="mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-green-600 mb-4">
                        Active Challenges
                    </h2>
                    
                </div>

                {/* Challenge Cards */}
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-6 md:px-12">
                    {firstFourActive.map((challenge) => (
                        <ActiveChallengesCard key={challenge._id} challenge={challenge} />
                    ))}
                </div>

                {/* View All Button */}
                <div className="mt-10 mx-5 w-full flex justify-center">
                <Link to="/challenges" className="w-full flex justify-center">
                    <span className="flex items-center gap-3 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-white hover:text-green-600 hover:border-green-600 border transition-colors duration-300">
                    View All Challenges <ArrowBigRight />
                    </span>
                </Link>
                </div>
            </section>
            </Container>
        </div>
    );
};

export default ActiveChallenges;










