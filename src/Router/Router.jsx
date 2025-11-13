import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Error404 from "../Components/Error/Error";
import { Suspense } from "react";
import Home from "../Pages/Home";
import Loader from "../Components/Loader/Loading";
import Login from "../Components/Auth/Login";
import Register from "../Components/Auth/Register";
import Challenges from "../Pages/Challenges";
import Tips from "../Pages/Tips";
import ChallangeDetails from "../Pages/ChallangeDetails";
import PrivateRoute from "../provider/PrivateRoute";



const withSuspense = (Component) => (
  <Suspense fallback={
    <div className="w-screen h-screen flex justify-center items-center">
      <Loader />
    </div>
  }>
    <Component />
  </Suspense>
);


export const router = createBrowserRouter([
 {
    path: "/",
    Component: Root,
    children: [
      {
        index: "/",
        element: withSuspense(Home),
      },
      {
        path: "/home",
        element: withSuspense(Home),
      },
      {
        path: "/auth/login",
        element: withSuspense(Login)
      },
      {
        path: "/register",
        element: withSuspense(Register)
      },
      {
        path: '/challenges',
        element: withSuspense(Challenges)
      },
      {
        path:"/Tips",
        element: withSuspense(Tips)
      },
        {
        path: "/challange/:id",
        element: (
          <PrivateRoute>
            {withSuspense(ChallangeDetails)}
          </PrivateRoute>
        ),
      },
      
      
      // {
      //   path: "/dashboard",
      //   element: (
      //     <PrivateRoute>
      //       {withSuspense(Dashboard)}
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: "/challange/:id",
      //   element: (
      //     <PrivateRoute>
      //       {withSuspense(SkillDetails)}
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: "/skills/*",
      //   element: withSuspense(Error),
      // },
    ],
  },
  {
    path: "*",
    element: withSuspense(Error404),
  },
 
]);