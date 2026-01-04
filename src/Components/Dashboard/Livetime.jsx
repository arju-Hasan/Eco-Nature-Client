import { useEffect, useState } from "react";

export default function LiveTime() {
  const [t, setT] = useState("");

  useEffect(() => {
    const x = setInterval(() => setT(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(x);
  }, []);

  return <span>{t}</span>;
}