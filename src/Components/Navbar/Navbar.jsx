import React from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const Navbar = () => {
  const { user, logOut, loading } = useAuth();
   console.log(user);
  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully");
      })
      .catch((error) => toast.error(error.message));
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/browse-public">Browse Public Habits</NavLink>
      </li>
      <li>
        <NavLink to="/add-habit">Add Habit</NavLink>
      </li>
      <li>
        <NavLink to="/my-habits">My Habits</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-lg px-4">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
            // className="menu menu-sm  dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52">
            className="menu  menu-sm  dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52">
            {navLinks}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl text-primary">
          HabitTracker
        </Link>
      </div>

      {/* <div className="navbar-center hidden lg:flex"> */}
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
              <div className="w-10 rounded-full">
              
                <img tabIndex={0} role="button" className="w-10 h-10 md:w-12 md:h-12 md:h-5 rounded-full"         
                          src={`${user ? user.photoURL : "https://i.ibb.co/68J0S2s/avater.png"}`}
                          alt="not found"
                        />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52"
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
