import React, { use } from "react";
import { Link, NavLink } from "react-router";
import userIcon from "../../assets/img/userIcon.png";
import logo from "../../assets/img/logo.png";
import { AuthContext } from "../../provider/AuthProvider";
import MyContainer from "../../provider/MyContainer";
import { toast,  } from "react-hot-toast";



const Links = <>
    <NavLink to="/">Home</NavLink>
        <NavLink to="/challenges">Challenges</NavLink>
        <NavLink to="/Tips">Tips</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
</>


const Navbar = () => {
  const { user, logOut } = use(AuthContext);

  const handleLogOut = () => {
    // console.log("user trying to LogOut");
    logOut()
      .then(() => {
        toast.success("You Logged Out successfully");
      })
      .catch((error) => {
       toast.error(error)
      });
  };
  // console.log(user.photoURL, userIcon);
  return (
    <div className="bg-base-100">
    <MyContainer>
    <div className="navbar shadow-sm">
  <div className="navbar-start ">
    <div className="dropdown  z-20">
      <div tabIndex={0} role="button" className="btn btn-ghost rounded-md md:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content grid justify-center items-center gap-4 p-4 bg-gray-400 rounded-box z-1 mt-3 w-52 p-2 shadow ">
      {Links}
      {user ? <button onClick={handleLogOut} className="btn btn-primary px-10 hover:bg-secondary ">
            LogOut
          </button>: <Link to="/auth/login" className="btn btn-primary px-10 hover:bg-secondary ">
            Login
          </Link>}
      </ul>
    </div>
       <Link to='/'>
       <img  className="h-10 w-25 ml-4 md:ml-2 lg:ml-0 object-cover rounded-lg" src={logo} alt="this is a logo" />
       </Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal text-xl text-primary  px-1 gap-5  ">
    {Links}
    </ul>
  </div>
  <div className="navbar-end ">
     <div className="dropdown dropdown-hover z-20">
       <img tabIndex={0} role="button" className="w-10 h-10 md:w-12 md:h-12 md:ml-5 rounded-full"         
          src={`${user ? user.photoURL : userIcon}`}
          alt="not found"
        />
        
    </div>
    
       {user ? (
  <button
    onClick={handleLogOut}
    className="btn btn-primary hover:bg-secondary px-10 ml-4 hidden sm:hidden md:inline-flex lg:inline-flex"
  >
    LogOut
  </button>
) : (
  <Link
    to="/auth/login"
    className="btn btn-primary hover:bg-secondary px-10 ml-4 hidden sm:hidden md:inline-flex lg:inline-flex"
  >
    Login
  </Link>
)}

  </div>
</div>
</MyContainer>

    </div>
  );
};

export default Navbar;
