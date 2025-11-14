import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import userImg from "../../assets/userIcon.png";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const { user, logOut, loading } = useAuth();
   console.log(user, loading);
  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully");
      })
      .catch((error) => toast.error(error.message));
  };
  const [open, setOpen] = useState(false);
  const closeDropdown = () => {
  setOpen(false);
  document.activeElement?.blur(); 
};


  const navLinks = (
    <>
      <li>
        <NavLink to="/" onClick={closeDropdown}>Home</NavLink>
      </li>
      <li>
        <NavLink to="/browse-public" onClick={closeDropdown}>Browse Public Habits</NavLink>
      </li>
      <li>
        <NavLink to="/add-habit" onClick={closeDropdown}>Add Habit</NavLink>
      </li>
      <li>
        <NavLink to="/my-habits" onClick={closeDropdown}>My Habits</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard" onClick={closeDropdown}>Dashboard</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-lg px-4">
      <div className="navbar-start">
        <div className={`dropdown ${open ? "dropdown-open" : ""}`}>
          <label tabIndex={0}  onClick={() => setOpen(!open)} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 -m-2"
              fill="none" 
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
    
          <ul
            tabIndex={0}
            className="menu  menu-sm  dropdown-content mt-5 z-10 p-2 shadow bg-base-100 rounded-box w-52">
            {navLinks}
          </ul>
        </div>
       <Link to="/" className="btn btn-ghost text-xl text-[#14aa00] font-semibold">
        <span className="w-30 h-18 -ml-3 flex justify-center items-center rounded-full">
          <img src={logo} alt="Nature Logo" className="w-35 h-18 inline" />
          <h2 className="-ml-5">Nature</h2>
        </span>
        
      </Link>

      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>

      <div className="navbar-end">
        <ThemeToggle />

        {loading ? (
          <span className="loading loading-spinner loading-sm ml-4"></span>
        ) : user ? (
          <div className="dropdown dropdown-end ml-2">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 h-10 rounded-full">

                <img
                  tabIndex={0}
                  role="button"
                  className="w-10 h-10  object-cover rounded-full"
                  src={user?.photoURL && user.photoURL.length > 5 ? user.photoURL : userImg}
                  onError={(e) => (e.target.src = userImg)}
                  alt="profile"
                />
              
                
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="p-2">
                <p className="font-semibold">{user.displayName}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </li>
              <li>
                <button onClick={handleLogOut} className="btn btn-ghost btn-sm">
                  Log out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="ml-2">
            <Link to="/login" className="btn btn-ghost">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary ml-2">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
