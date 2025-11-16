import React from 'react';
import { Link } from 'react-router';
import useEcoTips from '../../Hooks/useEcoTips';
import EcoTipCard from './EcoTipCard';
import EcoTipCardSkeleton from './EcoTipCardSkeleton';
import Container from '../../Layouts/Container';


const EcoTips = () => {
    const {EcoTips, loading, error} = useEcoTips();



  if (loading) {
    return (
        <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <EcoTipCardSkeleton key={n} />
        ))}
      </div>
        </Container>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }

    return (
        <div>
            <div>
            <section className="py-12 bg-gray-50 text-center">
                {/* Heading + Subheading */}
                <div className="mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#297B33]">
                        All EcoTips
                    </h2>
                    <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                        Stay Inspired with the Latest Eco-Friendly Tips
                    </p>
                </div>

                {/* Challenge Cards */}
                <div className="grid  justify-center gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-6 md:px-12">
                    {EcoTips.map((tip) => (
                        <EcoTipCard key={tip._id} tip={tip} />
                    ))}
                </div>
            </section>
        </div>
        </div>
    );
};

export default EcoTips;


