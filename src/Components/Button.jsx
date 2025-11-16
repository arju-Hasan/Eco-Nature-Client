import React from "react";

const Button = ({ children, onClick, type = "btn", loading = false, className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`btn bg-[#297B33] hover:bg-[#82B532] text-white ${loading ? "opacity-70 cursor-not-allowed" : ""} ${className}`}
    >
      {loading ? (
        <>
          <span className="loading loading-spinner loading-sm"></span>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
