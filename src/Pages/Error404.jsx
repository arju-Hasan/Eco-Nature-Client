
import React from "react";
import { useNavigate } from "react-router";
import { ArrowLeftToLine, Ban, } from "lucide-react";

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center px-4">
      <Ban
        className="w-40 h-40 text-red-400 mb-6"
      />
      <h1 className="text-8xl font-extrabold text-red-400 mb-4 animate-pulse">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-600 mb-6">
        The page you are looking for does not exist or has been moved.
      </p>
      <button
        onClick={() => navigate("/")}
        className="btn bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-tl-3xl rounded-br-3xl transition-all flex items-center justify-center gap-2"
      >
        <ArrowLeftToLine className="w-5 h-5" /> Go Home
      </button>
    </div>
  );
};

export default Error404;
