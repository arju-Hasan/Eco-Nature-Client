import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root";
import Home from "../Layouts/Home";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import Error404 from "../Pages/Error404";
import Loading from "../Pages/Loading";
import ForgotPassword from "../Pages/ForgotPassword";
import Challenges from "../Components/Challenges/Challenges";
import MyActivities from "../Pages/MyActivities";
import AddChallenges from "../Components/Challenges/AddChallenges";
import PrivateRoute from "./PrivateRoute";
import EcoTips from "../Components/Eco-tip/EcoTips";
import Events from "../Components/Event/Events";
import EventDetails from "../Components/Event/EventDetails";
import ViewChallenge from "../Components/Challenges/ViewChallenge";
import EditChallenge from "../Components/Challenges/EditChallenge";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <Error404/>,
    hydrateFallbackElement: <Loading/>,
    children:[
        {
            index: true,
            element: <Home/>,
        },
        {
            path: '/eco-tips',
            element: <EcoTips/>,
        },
        {
            path: '/events',
            element: <Events/>,
        },
        {
            path: '/events/:id',
            element: <PrivateRoute><EventDetails/></PrivateRoute>,
        },
        {
            path: '/register',
            element: <Register/>
        },
        {
            path: '/login',
            element: <Login/>
        },
        {
            path: '/*',
            element: <Error404/>,
        },
        {
            path: '/forgot-password',
            element: <ForgotPassword/>,
        },
        {
            path: '/challenges',
            element: <Challenges/>,
        },
        {
            path: '/challenges-add',
            element: <PrivateRoute><AddChallenges/></PrivateRoute>,
        },
        {
            path: '/challenges/:id',
            element: <PrivateRoute><ViewChallenge/></PrivateRoute>,
        },
        {
            path: '/my-activities',
            element: <PrivateRoute><MyActivities/></PrivateRoute>,
            // element: <MyActivities/>,
        },
        {
            path: '/my-activities/:id',
            element: <PrivateRoute><EditChallenge/></PrivateRoute>,
        },

    ]
  },
]);
export default router;