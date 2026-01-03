import React, { useContext, useEffect, useState } from "react";
import { MdOutlineLogout } from "react-icons/md";
import { Link, NavLink, Outlet } from "react-router";
import logoImg from "../../assets/logo.png";
import {
  FaChalkboardTeacher,
  FaGraduationCap,
  FaMotorcycle,
  FaTasks,
  FaUsers,
} from "react-icons/fa";
import { RiEBikeFill } from "react-icons/ri";
import { SiGoogletasks } from "react-icons/si";
import { SquareArrowLeft } from "lucide-react";
// import useAxiosSecure from "../Hooks/useAxiosSecure";
// import useAuth from "../Hooks/useAuth";
import { GiHamburgerMenu, GiTeacher } from "react-icons/gi";
import Swal from "sweetalert2";
import {
  FaCodePullRequest,
  FaMoneyCheckDollar,
  FaSignsPost,
} from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { IoHome } from "react-icons/io5";
import { PiStudentBold } from "react-icons/pi";
import uition from "../../assets/logo.png";
import { AuthContext } from "../../Context/AuthContext";

const DashboardLayout = () => {
  const { user, signOutUser, loading } = useContext(AuthContext);
  //   const { role } = useRole();
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null); //db user data
  //   const axiosSecure = useAxiosSecure();

  //   useEffect(() => {
  //     if (user?.email) {
  //     //   axiosSecure
  //         .get(`/users/${user.email}`)
  //         .then((res) => setUserData(res.data))
  //         .catch((err) => console.log(err));
  //     }
  //   }, [user?.email]);
  // console.log("DB user data", userData);

  // Checkbox change detect
  useEffect(() => {
    const drawer = document.getElementById("my-drawer-4");

    const handleChange = () => {
      setIsOpen(drawer.checked);
    };

    drawer.addEventListener("change", handleChange);

    return () => drawer.removeEventListener("change", handleChange);
  }, []);

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Logout Right Now",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        signOutUser().then();
        Swal.fire({
          title: "Logout!!!",
          text: "Logout Successful",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="drawer lg:drawer-open max-w-7xl mx-auto ">
      <input
        id="my-drawer-4"
        type="checkbox"
        className="drawer-toggle"
        defaultChecked
      />
      <div className="drawer-content flex flex-col min-h-screen">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-200">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost text-green-600"
          >
            {isOpen ? (
              <SquareArrowLeft />
            ) : (
              <GiHamburgerMenu className="text-2xl" />
            )}
          </label>
          <div className="px-4 text-2xl font-bold">
            <span className="text-2xl font-bold">Eco Tracking Dashboard</span>
          </div>
        </nav>

        {/* Page content here */}
        <main className="flex-grow">
          <Outlet />
        </main>
        {/* <Footer /> */}
      </div>
      <h2>alsjdklaklshkjaKL</h2>
      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-0 is-drawer-open:w-54">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <Link
                className="is-drawer-close:hidden bg-base-300 text-2xl font-semibold text-green-600 is-drawer-close:tooltip-right mb-5"
                to="/"
              >
                <img className="w-10 h-10 " src={logoImg} alt="" /> Track
              </Link>
            </li>

            {/* all user */}

            <div className="m-3 space-y-2 font-semibold">
              {
                <li className="">
                  <NavLink
                    className={({ isActive }) =>
                      `is-drawer-close:hidden is-drawer-close:tooltip-right ${
                        isActive ? "bg-secondary text-white font-bold" : ""
                      }`
                    }
                    data-tip="Assigned Deliveries"
                    to="/"
                    end
                  >
                    <IoHome />
                    <span className="is-drawer-close:hidden">Home</span>
                  </NavLink>
                </li>
              }
              {/* user only links */}
              {
                <>
                  {/* <h2></h2> */}
                  <li className="">
                    <NavLink
                      className={({ isActive }) =>
                        `is-drawer-close:hidden is-drawer-close:tooltip-right ${
                          isActive ? "bg-green-600 text-white font-bold" : ""
                        }`
                      }
                      data-tip="Assigned Deliveries"
                      to="/dashboard"
                      end
                    >
                      <FaTasks />
                      <span className="is-drawer-close:hidden">Dashboard</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        `is-drawer-close:hidden is-drawer-close:tooltip-right ${
                          isActive ? "bg-secondary text-white font-bold" : ""
                        }`
                      }
                      data-tip="Completed Deliveries"
                      to="/dashboard/sPosted"
                    >
                      <SiGoogletasks />
                      <span className="is-drawer-close:hidden">
                        Posted Request
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        `is-drawer-close:hidden is-drawer-close:tooltip-right ${
                          isActive ? "bg-secondary text-white font-bold" : ""
                        }`
                      }
                      data-tip="Completed Deliveries"
                      to="/dashboard/userprofile"
                    >
                      <CgProfile />
                      <span className="is-drawer-close:hidden">
                        Update profile
                      </span>
                    </NavLink>
                  </li>
                </>
              }

              {/* List item */}
              <li>
                <button
                  onClick={handleLogOut}
                  className={`is-drawer-close:hidden is-drawer-close:tooltip-right  "bg-secondary font-bold"
                                    `}
                  data-tip="Settings"
                >
                  {/* Settings icon */}
                  <MdOutlineLogout />
                  <span className="is-drawer-close:hidden">LogOut</span>
                </button>
              </li>
            </div>
            {/* <div>
              <Link className="is-drawer-close:hidden" to="/">
                <img src={uition} alt="Logo" />
              </Link>
            </div> */}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default DashboardLayout;

// import React, { useContext, useEffect, useState } from "react";
// import { MdOutlineLogout } from "react-icons/md";
// import { Link, NavLink, Outlet } from "react-router";
// import logoImg from "../../assets/logo.png";
// import { FaTasks } from "react-icons/fa";
// import { SiGoogletasks } from "react-icons/si";
// import { CgProfile } from "react-icons/cg";
// import { IoHome } from "react-icons/io5";
// import Swal from "sweetalert2";
// import { AuthContext } from "../../Context/AuthContext";

// const DashboardLayout = () => {
//   const { signOutUser } = useContext(AuthContext);

//   const handleLogOut = () => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "Logout Right Now",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, Logout!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         signOutUser().then();
//         Swal.fire({
//           title: "Logout!!!",
//           text: "Logout Successful",
//           icon: "success",
//         });
//       }
//     });
//   };

//   return (
//     <div className="drawer lg:drawer-open max-w-7xl mx-auto">
//       {/* Main content */}
//       <div className="drawer-content flex flex-col min-h-screen">
//         {/* Page content */}
//         <main className="flex-grow">
//           <Outlet />
//         </main>

//         {/* Mobile bottom navbar */}
//         <nav className="navbar w-full bg-base-200 fixed bottom-0 z-50 lg:hidden justify-around border-t border-gray-300">
//           <NavLink
//             to="/"
//             className="btn btn-ghost tooltip tooltip-top"
//             data-tip="Home"
//           >
//             <IoHome className="text-xl" />
//           </NavLink>
//           <NavLink
//             to="/dashboard"
//             className="btn btn-ghost tooltip tooltip-top"
//             data-tip="Dashboard"
//           >
//             <FaTasks className="text-xl" />
//           </NavLink>
//           <NavLink
//             to="/dashboard/sPosted"
//             className="btn btn-ghost tooltip tooltip-top"
//             data-tip="Posted Request"
//           >
//             <SiGoogletasks className="text-xl" />
//           </NavLink>
//           <NavLink
//             to="/dashboard/userprofile"
//             className="btn btn-ghost tooltip tooltip-top"
//             data-tip="Profile"
//           >
//             <CgProfile className="text-xl" />
//           </NavLink>
//           <button
//             onClick={handleLogOut}
//             className="btn btn-ghost tooltip tooltip-top"
//             data-tip="Logout"
//           >
//             <MdOutlineLogout className="text-xl" />
//           </button>
//         </nav>
//       </div>

//       {/* Sidebar (Desktop only) */}
//       <div className="drawer-side hidden lg:flex">
//         <div className="flex min-h-full flex-col items-start bg-base-200 w-56">
//           <ul className="menu w-full grow p-3">
//             <li className="mb-5">
//               <Link className="text-2xl font-bold text-green-600" to="/">
//                 <img className="w-10 h-10 inline" src={logoImg} alt="" /> Track
//               </Link>
//             </li>
//             <li>
//               <NavLink
//                 to="/"
//                 end
//                 className={({ isActive }) =>
//                   isActive ? "bg-secondary text-white font-bold" : ""
//                 }
//               >
//                 <IoHome /> Home
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/dashboard"
//                 end
//                 className={({ isActive }) =>
//                   isActive ? "bg-green-600 text-white font-bold" : ""
//                 }
//               >
//                 <FaTasks /> Dashboard
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/dashboard/sPosted"
//                 className={({ isActive }) =>
//                   isActive ? "bg-secondary text-white font-bold" : ""
//                 }
//               >
//                 <SiGoogletasks /> Posted Request
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/dashboard/userprofile"
//                 className={({ isActive }) =>
//                   isActive ? "bg-secondary text-white font-bold" : ""
//                 }
//               >
//                 <CgProfile /> Update Profile
//               </NavLink>
//             </li>
//             <li>
//               <button
//                 onClick={handleLogOut}
//                 className="bg-secondary text-white font-bold w-full mt-3"
//               >
//                 <MdOutlineLogout /> LogOut
//               </button>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;
