import React from 'react';
import EcoTipCard from '../Eco-tip/EcoTipCard';
import { Link } from 'react-router';
import useEcoTips from '../../Hooks/useEcoTips';
import { ArrowBigRight } from 'lucide-react';
import Container from '../../Layouts/Container';

const RecentTips = () => {
    const {EcoTips} = useEcoTips();

      // Sort tips by createdAt (newest first)
  const recentTips = [...EcoTips].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 6);


    return (
        <div>
            <Container>
            <section className="py-12 bg-gray-50 text-center">
              
                <div className="mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-green-600 mb-4">
                        Recent Tips
                    </h2>
                    
                </div>

                {/* Challenge Cards */}
                <div className="grid  justify-center gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-6 md:px-12">
                    {recentTips.map((tip) => (
                        <EcoTipCard key={tip._id} tip={tip} />
                    ))}
                </div>

                {/* View All Button */}
                <div className="mt-10 mx-5 w-full flex justify-center">
                <Link to="/eco-tips" className="w-full flex justify-center">
                    <span className="flex items-center gap-3 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-white hover:text-green-600 hover:border-green-600 border transition-colors duration-300">
                    View All EcoTips <ArrowBigRight />
                    </span>
                </Link>
                </div>
            </section>
        </Container>
        </div>
    );
};

export default RecentTips;