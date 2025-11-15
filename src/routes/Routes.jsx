import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AddHabit from "../pages/AddChallange/AddChallange";
import PrivateRoute from "./PrivateRoute";
import MyHabits from "../pages/MyHabits/MyHabits";
import BrowseChallange from "../pages/BrowseChallange/BrowseChallange";
import HabitDetails from "../pages/HabitDetails/HabitDetails";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Dashboard from "../pages/Dashboard/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/add-challenges",
        element: (
          <PrivateRoute>
            <AddHabit />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-challenges",
        element: (
          <PrivateRoute>
            <MyHabits />
          </PrivateRoute>
        ),
      },
      {
        path: "/all-challenges",
        element: <BrowseChallange />,
      },
      {
        path: "/challenge/:id",
        element: (
          <PrivateRoute>
            <HabitDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
