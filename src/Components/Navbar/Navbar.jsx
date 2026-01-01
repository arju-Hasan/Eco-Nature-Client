import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import Container from "../../Layouts/Container";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const Navbar = () => {
  const { user, signOutUser, loading } = useContext(AuthContext);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const t = localStorage.getItem("theme") || "light";
    setTheme(t);
    document.documentElement.setAttribute("data-theme", t);
  }, []);

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/challenges"}>Challenges</NavLink>
      </li>
      <li>
        <NavLink to={"/eco-tips"}>Tips</NavLink>
      </li>
      <li>
        <NavLink to={"/events"}>Events</NavLink>
      </li>
      <li>
        <NavLink to={"/my-activities"}>My Activities</NavLink>
      </li>
      <li>
        <NavLink to={"/challenges-add"}>Add Challenges</NavLink>
      </li>
    </>
  );
  return (
    <div className="shadow-sm bg-white/20 backdrop-blur  sticky top-0 z-10">
      <Container>
        <nav>
          <div className="navbar ">
            <div className="navbar-start">
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost lg:hidden"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {" "}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />{" "}
                  </svg>
                </div>
                <ul
                  tabIndex="-1"
                  className={`menu ${
                    theme === "light" ? "" : "text-green-600"
                  } font-semibold menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow`}
                >
                  {links}
                </ul>
              </div>
              <Link
                to={"/"}
                className=" flex   items-center text-green-600 text-xl font-semibold"
              >
                <figure className="w-12 pr-1">
                  <img
                    src={"https://i.ibb.co.com/xPxTstf/logo.png"}
                    alt="Site Logo"
                  />
                </figure>
                Track
              </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
              <ul
                className={`menu gap-2 ${
                  theme === "light" ? "" : "text-green-600"
                }  font-semibold menu-horizontal px-1`}
              >
                {links}
              </ul>
            </div>
            <div className="navbar-end">
              {/* ================================================== */}
              <button
                className="text-2xl p-2 mr-1 rounded-full"
                onClick={switchTheme}
              >
                {theme === "light" ? <MdDarkMode /> : <MdLightMode />}
              </button>

              {/* ================================================== */}

              {loading ? (
                <span className="loading loading-ring loading-xl"></span>
              ) : user ? (
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className=" m-1">
                    <img
                      className="w-10 mx-auto rounded-full overflow-hidden border border-green-600"
                      src={
                        user?.photoURL ||
                        "https://i.ibb.co.com/350n9K6p/58289340.jpg"
                      }
                      alt="Avater"
                    />
                  </div>
                  <ul
                    tabIndex="-1"
                    className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm space-y-3 text-center"
                  >
                    <Link
                      to={"/profile"}
                      className="tooltip"
                      data-tip="Click to Profile"
                    >
                      <img
                        className="w-25 mx-auto rounded-full overflow-hidden border border-green-600"
                        src={
                          user?.photoURL ||
                          "https://i.ibb.co.com/350n9K6p/58289340.jpg"
                        }
                        alt="Avater"
                      />
                    </Link>

                    <h2 className="text-xl font-semebold">
                      {user?.displayName}
                    </h2>
                    <p className="text-black">{user?.email}</p>
                    <button
                      onClick={signOutUser}
                      className={
                        "btn bg-green-600 hover:bg-green-700 text-white"
                      }
                    >
                      Sign Out
                    </button>
                  </ul>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="btn text-white bg-green-600 hover:bg-green-700 border-none"
                >
                  Log in
                </Link>
              )}
            </div>
          </div>
        </nav>
      </Container>
    </div>
  );
};

export default Navbar;
