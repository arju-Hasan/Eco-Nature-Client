import React, { useEffect, useState } from "react";

const TextRotator = () => {
  const texts = ["Dashboard", "E-Tuition-BD", "Dashboard", "E-Tuition-BD"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 2000); // 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-rotate">
      <span className="fade-text">{texts[index]}</span>
    </span>
  );
};

export default TextRotator;
