//
//
//
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { FaCalendarAlt, FaMapMarkerAlt, FaUser, FaUsers } from "react-icons/fa";
// import Loading from "../../Pages/Loading";
//
// const EventDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//
//   const [event, setEvent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     userLocation: "",
//   });
//   const [joining, setJoining] = useState(false); // Button loading state
//
//
//
//   // Fetch event details
//   useEffect(() => {
//     const fetchEvent = async () => {
//       try {
//         const res = await axios.get(`https://y-xi-drab.vercel.app/api/events/${id}`);
//         setEvent(res.data);
//       } catch (error) {
//         console.error(error);
//         toast.error("Failed to load event details");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchEvent();
//   }, [id]);
//
//   // Open modal
//   const handleJoinClick = () => {
//     if (event.currentParticipants >= event.maxParticipants) {
//       toast.error("Event is full!");
//     } else {
//       setShowModal(true);
//     }
//   };
//
//   // Form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setJoining(true);
//
//       await axios.post("https://y-xi-drab.vercel.app/api/joined-events", {
//         participantName: formData.name,
//         participantEmail: formData.email,
//         participantLocation: formData.userLocation,
//         challengeId: id,
//       });
//
//       // Update participant count in frontend
//       setEvent((prev) => ({
//         ...prev,
//         currentParticipants: prev.currentParticipants + 1,
//       }));
//
//       const joinTime = new Date().toLocaleString();
//       toast.success(`You joined the event at ${joinTime}`);
//       setShowModal(false);
//       setFormData({ name: "", email: "", userLocation: "" });
//     } catch (error) {
//       console.error(error.response?.data || error.message);
//       toast.error(error.response?.data?.message || "Failed to join the event");
//     } finally {
//       setJoining(false);
//     }
//   };
//
//   if (loading) return <Loading />;
//   if (!event) return <p className="flex justify-center mt-10">Event not found</p>;
//
//   return (
//     <div className="max-w-3xl my-10 mx-auto p-6 mt-8 bg-white rounded-2xl shadow-lg border border-gray-200">
//       {/* Event Details */}
//       <h1 className="text-2xl font-semibold text-[#297B33] mb-4">{event.title}</h1>
//       <p className="text-gray-700 mb-4">{event.description}</p>
//
//       <div className="space-y-2 text-gray-700 mb-6">
//         <p className="flex items-center gap-2">
//           <FaCalendarAlt className="text-[#297B33]" />
//           {new Date(event.date).toLocaleString()}
//         </p>
//         <p className="flex items-center gap-2">
//           <FaMapMarkerAlt className="text-[#297B33]" /> {event.location}
//         </p>
//         <p className="flex items-center gap-2">
//           <FaUser className="text-[#297B33]" /> {event.organizer}
//         </p>
//         <p className="flex items-center gap-2">
//           <FaUsers className="text-[#297B33]" /> {event.currentParticipants} / {event.maxParticipants} participants
//         </p>
//       </div>
//
//       {/* Buttons */}
//       <div className="flex gap-4">
//         <button
//           onClick={() => navigate(-1)}
//           className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300"
//         >
//           ← Back
//         </button>
//         <button
//           onClick={handleJoinClick}
//           disabled={event.currentParticipants >= event.maxParticipants}
//           className={`px-4 py-2 rounded-full text-white transition-all ${
//             event.currentParticipants >= event.maxParticipants
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-green-700 hover:bg-green-500"
//           }`}
//         >
//           {event.currentParticipants >= event.maxParticipants ? "Full" : "Join Event"}
//         </button>
//       </div>
//
//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
//           <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
//             <button
//               onClick={() => setShowModal(false)}
//               className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-lg"
//             >
//               ✕
//             </button>
//             <h3 className="text-xl font-semibold text-[#297B33] mb-4">
//               Join Event — {event.title}
//             </h3>
//
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Name</label>
//                 <input
//                   type="text"
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   required
//                   className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-[#297B33]"
//                 />
//               </div>
//
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Email</label>
//                 <input
//                   type="email"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                   required
//                   className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-[#297B33]"
//                 />
//               </div>
//
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Location</label>
//                 <input
//                   type="text"
//                   value={formData.userLocation}
//                   onChange={(e) => setFormData({ ...formData, userLocation: e.target.value })}
//                   required
//                   className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-[#297B33]"
//                 />
//               </div>
//
//               <div className="pt-4 flex justify-end">
//                 <button
//                   type="submit"
//                   disabled={joining}
//                   className="bg-green-500 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-full transition-all"
//                 >
//                   {joining ? "Joining..." : "Confirm Join"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
//
// export default EventDetails;

import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { FaCalendarAlt, FaMapMarkerAlt, FaUser, FaUsers } from "react-icons/fa";
import Loading from "../../Pages/Loading";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(AuthContext);
  // console.log(user);
  const [formData, setFormData] = useState();

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.displayName || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "user.email",
  //   userLocation: "",
  // });

  const [joining, setJoining] = useState(false);

  // Fetch event details
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(
          `https://y-xi-drab.vercel.app/api/events/${id}`
        );
        setEvent(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load event details");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  // SweetAlert Confirm Before Join
  const handleJoinClick = () => {
    if (event.currentParticipants >= event.maxParticipants) {
      toast.error("Event is full!");
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to join this event?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Join",
      cancelButtonText: "Cancel",
      buttonsStyling: false,
      customClass: {
        confirmButton:
          "bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl mr-3",
        cancelButton:
          "bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-xl",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setShowModal(true);
      }
    });
  };

  // Submit Join Modal Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setJoining(true);

      //  patch request to update joinBy array
      await axios.patch(`https://y-xi-drab.vercel.app/api/events/${id}/join`, {
        name: formData.name,
        email: formData.email,
        location: formData.userLocation,
      });

      // Update UI instantly
      setEvent((prev) => ({
        ...prev,
        currentParticipants: prev.currentParticipants + 1,
        joinBy: prev.joinBy
          ? [...prev.joinBy, formData.email]
          : [formData.email],
      }));

      toast.success("Successfully joined the event!");
      setShowModal(false);
      setFormData({ name: "", email: "", userLocation: "" });
    } catch (error) {
      console.error(error.response?.data || error);
      toast.error(error.response?.data?.message || "Failed to join the event");
    } finally {
      setJoining(false);
    }
  };

  if (loading) return <Loading />;
  if (!event)
    return <p className="flex justify-center mt-10">Event not found</p>;

  return (
    <div className="max-w-3xl my-10 bg-green-200 text-black mx-auto p-6 mt-8 rounded-2xl shadow-lg border border-green-400">
      {/* Event Details */}
      <h1 className="text-2xl font-semibold text-[#297B33] mb-4">
        {event.title}
      </h1>
      <p className=" mb-4">{event.description}</p>

      <div className="space-y-2  mb-6">
        <p className="flex items-center gap-2">
          <FaCalendarAlt className="text-[#297B33]" />
          {new Date(event.date).toLocaleString()}
        </p>
        <p className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-[#297B33]" /> {event.location}
        </p>
        <p className="flex items-center gap-2">
          <FaUser className="text-[#297B33]" /> {event.organizer}
        </p>
        <p className="flex items-center gap-2">
          <FaUsers className="text-[#297B33]" /> {event.currentParticipants} /{" "}
          {event.maxParticipants} participants
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300"
        >
          ← Back
        </button>

        <button
          onClick={handleJoinClick}
          disabled={event.currentParticipants >= event.maxParticipants}
          className={`px-4 py-2 rounded-full text-white transition-all ${
            event.currentParticipants >= event.maxParticipants
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-700 hover:bg-green-500"
          }`}
        >
          {event.currentParticipants >= event.maxParticipants
            ? "Full"
            : "Join Event"}
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-lg"
            >
              ✕
            </button>
            <h3 className="text-xl font-semibold text-[#297B33] mb-4">
              Join Event — {event.title}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium ">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-[#297B33]"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium ">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-[#297B33]"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium ">Location</label>
                <input
                  type="text"
                  value={formData.userLocation}
                  onChange={(e) =>
                    setFormData({ ...formData, userLocation: e.target.value })
                  }
                  required
                  className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-[#297B33]"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={joining}
                  className="bg-green-500 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-full transition-all"
                >
                  {joining ? "Joining..." : "Confirm Join"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
