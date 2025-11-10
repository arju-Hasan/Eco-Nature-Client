import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate, useLocation } from "react-router";
import Loading from "../Component/Loader/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext); 
  const location = useLocation();
  // console.log(location);

  if (loading) {
    return <Loading />;
  }

  if (user && user.email) {
    return children; 
  }

  return <Navigate state={location.pathname} to="/auth/login" />; 
};

export default PrivateRoute;
