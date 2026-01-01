import { useEffect, useState, useContext, useCallback } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router";
import Swal from "sweetalert2";
// import Loading from "./Loading";
import axios from "axios";
import Container from "../Layouts/Container";
import { FaCalendarAlt, FaMapMarkerAlt, FaUser, FaUsers } from "react-icons/fa";
import Loading from "./Loading";
// import Loading from '../Pages/Loading'


const MyActivities = () => {
  const { user } = useContext(AuthContext);

  // Hooks: top level
  const [challenges, setChallenges] = useState([]);
  const [myTips, setMyTips] = useState([]);
  const [loadingChallenges, setLoadingChallenges] = useState(true);
  const [loadingTips, setLoadingTips] = useState(true);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // -------------------- Challenges Fetch --------------------
  const fetchChallenges = useCallback(async () => {
    try {
      const res = await fetch("https://y-xi-drab.vercel.app/api/challenges");
      const data = await res.json();
      const userChallenges = data.filter(
        (c) => c.createdBy?.toLowerCase() === user.email?.toLowerCase()
      );
      setChallenges(userChallenges);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingChallenges(false);
    }
  }, [user?.email]);

  //  my events section =============================
useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("https://y-xi-drab.vercel.app/api/events");
        if (user?.email) {
          // Filter events where joinBy includes current user email
          const myEvents = res.data.filter((ev) =>
            Array.isArray(ev.joinBy) && ev.joinBy.includes(user.email)
          );
          setEvents(myEvents);
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);"'"
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [user]);

 

  useEffect(() => {
    if (user?.email) fetchChallenges();
  }, [user?.email, fetchChallenges]);

  // -------------------- My Tips Fetch --------------------
  useEffect(() => {
    if (!user?.email) return;

    const fetchMyActivity = async () => {
      try {
        setLoadingTips(true);
        const res = await axios.get("https://y-xi-drab.vercel.app/api/eco-tips");
        const filtered = res.data.filter((tip) =>
          tip.upvotedBy?.includes(user.email)
        );
        setMyTips(filtered);
        // console.log(filtered);
        // console.log(res);
      } catch (err) {
        console.error("Error fetching My Activity:", err);
      } finally {
        setLoadingTips(false);
      }
    };

    fetchMyActivity();
  }, [user?.email]);

  // -------------------- Delete Handler --------------------
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This challenge will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      buttonsStyling: false,
      customClass: {
        confirmButton:
          "bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl transition-colors mr-5",
        cancelButton:
          "bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-xl transition-colors",
        popup: "swal2-popup-custom",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(
            `https://y-xi-drab.vercel.app/api/challenges/${id}`,
            { method: "DELETE" }
          );
          const data = await res.json();

          if (data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Challenge has been deleted.",
              icon: "success",
              confirmButtonText: "OK",
              buttonsStyling: false,
              customClass: {
                confirmButton:
                  "bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl transition-colors",
              },
            });
            fetchChallenges(); // Refresh list
          }
        } catch (error) {
          console.error(error);
          Swal.fire({
            title: "Error",
            text: "Failed to delete challenge.",
            icon: "error",
            confirmButtonText: "OK",
            buttonsStyling: false,
            customClass: {
              confirmButton:
                "bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-xl transition-colors",
            },
          });
        }
      }
    });
  };

  if (!user) {
    return <p className="text-center mt-10">Login fast</p>;
  }
  if (loadingChallenges || loadingTips) return <Loading></Loading>;

 if (loading) return <Loading />;


  return (
    <div className="py-20">
      <Container>
        {/* my activity */}
      <div className="max-w-4xl mx-auto  space-y-4">
        <h2 className="text-2xl font-bold mb-6 text-green-600 text-center">
          My Challenges
        </h2>

        {challenges.length === 0 ? (
          <p className="text-center text-gray-500">No challenges found.</p>
        ) : (
          <div className="space-y-4">
            {challenges.map((challenge) => (
              <div
                key={challenge._id}
                className="flex justify-between border-1 border-green-100 hover:border-green-700 items-center p-4 bg-white shadow-xl shadow-green-200 rounded-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold">{challenge.title}</h3>
                  <p className="text-sm text-gray-600">
                    Category: {challenge.category}
                  </p>
                  <p className="text-sm text-gray-600">
                    Start: {challenge.startDate} | End: {challenge.endDate}
                  </p>
                  <p className="text-sm text-gray-600">
                    Created By: {challenge.createdBy}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Link
                    to={`/my-activities/${challenge._id}`}
                    className="btn bg-green-600 hover:bg-green-700 text-white"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(challenge._id)}
                    className="btn bg-red-600 hover:bg-red-700 text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

        {/* my events */}
    <div>
          <h2 className="text-2xl font-bold mt-16 mb-6 text-green-600 text-center"> My Events</h2>
           <div className="max-w-4xl mx-auto my-2  bg-white rounded-2xl shadow-lg border border-gray-200">
        {events.length === 0 ? (
          <p className="text-center text-gray-500">No events found.</p>
        ) : (
        <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event._id}
            className=" border-1 border-green-700 hover:border-1 p-4 rounded-xl shadow-md hover:shadow-xl shadow-black transition-all"
          >
            <h2 className="text-xl font-semibold text-green-700 mb-2">
              {event.title}
            </h2>
            <p className="text-gray-700 mb-3">{event.description}</p>

            <div className="flex flex-wrap gap-4 text-gray-700 mb-3">
              <p className="flex items-center gap-2">
                <FaCalendarAlt className="text-green-700" />
                {new Date(event.date).toLocaleString()}
              </p>
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-green-700" /> {event.location}
              </p>
              <p className="flex items-center gap-2">
                <FaUser className="text-green-700" /> {event.organizer}
              </p>
              <p className="flex items-center gap-2">
                <FaUsers className="text-green-700" />{" "}
                {event.currentParticipants} / {event.maxParticipants} participants
              </p>
            </div>
          </div>
        ))}
      </div>
        )};
      </div>
    </div>

        {/* my voting */}
      <h2 className="text-2xl font-bold mt-16 mb-6 text-green-600 text-center">
        My Upvoted Tips
      </h2>

    {myTips.length === 0 ? (
        <p className="text-center text-gray-500">
          tip upvote  not found
        </p>
      ) : (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {myTips.map((tip) => (
            <div
              key={tip._id}
              className="bg-white border-1 border-gray-200 rounded-lg shadow-xl shadow-green-200 p-4"
            >
              <div className="bg-green-600 px-4 py-2 rounded-tl-full rounded-br-full mb-4">
                <h2 className="text-white text-center font-semibold text-lg">{tip.title}</h2>
              </div>
              <p className="text-gray-700 mb-2">{tip.content}</p>
              <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                <span className="font-medium">Category:</span> {tip.category}
              </div>
              <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                <span className="font-medium">Author:</span> {tip.authorName}
              </div>
              <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                <span className="font-medium">Upvotes:</span><span className="bg-green-600 p-1 text-white rounded-md">{tip.upvotes}</span> 
              </div>
              <div className="text-sm text-gray-400">
                Posted on: {new Date(tip.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
      </Container>
    </div>
  );
};

export default MyActivities;
