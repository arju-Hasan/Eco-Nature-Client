import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Navigate, useLocation } from 'react-router';
import Loading from '../Pages/Loading';


const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation()
    // console.log(location);



    if(loading){
        return <Loading/>;
    }
    if(!user){
        return <Navigate to={"/login"} state={location.pathname}></Navigate>
    }
    return children;
};

export default PrivateRoute;