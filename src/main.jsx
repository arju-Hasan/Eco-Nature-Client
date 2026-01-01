import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./Routes/router";
import { RouterProvider } from "react-router/dom";
import AuthProvider from "./Context/AuthProvider";

// useEffect(() => {
//   const savedTheme = localStorage.getItem("theme") || "light";
//   document.documentElement.setAttribute("data-theme", savedTheme);
// }, []);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
