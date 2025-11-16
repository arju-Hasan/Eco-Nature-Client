import React from "react";
import Container from "../Layouts/Container";

const EcoTipCardSkeleton = () => {
  return (
    <Container>

        <div className="grid grid-cols-1  bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 animate-pulse">

      {/* Right Side: Text Content Skeleton */}
      <div className="p-6 flex flex-col justify-between bg-gray-50">
          {/* Card Header */}
          <div className="bg-[#297B33] px-4 py-2">
            <div className="h-5 w-full bg-gray-300 rounded"></div>
          </div>

          {/* Card Content */}
          <div className="p-4 space-y-3">
            <div className="h-4 w-full bg-gray-300 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
            <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
            <div className="h-4 w-3/5 bg-gray-300 rounded"></div>
            <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
            <div className="h-3 w-1/3 bg-gray-300 rounded"></div>
          </div>

          {/* Footer Button */}
          <div className="flex justify-center py-2">
            <div className="h-8 w-24 bg-gray-300 rounded-lg"></div>
          </div>
      </div>
    </div>










    </Container>
  );
};

export default EcoTipCardSkeleton;
