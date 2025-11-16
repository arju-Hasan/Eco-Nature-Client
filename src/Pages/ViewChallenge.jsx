import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import useChallenges from "../Hooks/useChallenges";
import useParticipants from "../Hooks/useParticipants";
import Loading from "./Loading";
import Container from "../Layouts/Container";
import { toast } from "react-toastify";
import ParticipantCard from "../Components/ParticipantCard";
import Swal from "sweetalert2";


const ViewChallenge = () => {
  const { participants } = useParticipants();
  const { id } = useParams();
  const { challenges, loading, error } = useChallenges();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localChallenge, setLocalChallenge] = useState(null);

  // Initialize localChallenge when challenges are loaded
  useEffect(() => {
    if (!loading && challenges.length > 0) {
      const found = challenges.find((c) => c._id === id);
      setLocalChallenge(found);
    }
  }, [challenges, id, loading]);

  // Dynamic date-time string
  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toLocaleString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Initial form data (Added userId, status, progress)
  const [formData, setFormData] = useState({
    participantName: "",
    participantEmail: "",
    imageUrl: "",
    location: "",
    joinDate: getCurrentDateTime(),
    notes: "",
    status: "Not Started",
    progress: 0,
  });

  if (loading) return <Loading />;
  if (error)
    return (
      <p className="text-center mt-10 text-red-500">Error: {error.message}</p>
    );
  if (!localChallenge)
    return <p className="text-center mt-10">Challenge not found.</p>;

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission with SweetAlert2 confirmation
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show confirmation popup
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to join this challenge?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Join! ",
      cancelButtonText: " Cancel",
      buttonsStyling: false,
      customClass: {
        confirmButton:
          "bg-[#297B33] hover:bg-[#82B532] text-white py-2 px-4 rounded-xl transition-colors",
        cancelButton:
          "bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-xl transition-colors",
      },
    });

    if (!result.isConfirmed) return; // Exit if cancelled

    // Submit participant data
    try {
      const participantRes = await fetch(
        "http://localhost:3000/api/participants",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            challengeId: localChallenge._id,
          }),
        }
      );

      if (participantRes.status === 400) {
        const data = await participantRes.json();
        toast.error(data.message || "You already joined this challenge!");
        return;
      }

      if (participantRes.ok) {
        // Update participants count locally
        setLocalChallenge((prev) => ({
          ...prev,
          participants: (prev.participants || 0) + 1,
        }));

        setIsModalOpen(false);

        // Reset form
        setFormData({
          participantName: "",
          participantEmail: "",
          imageUrl: "",
          location: "",
          joinDate: getCurrentDateTime(),
          notes: "",
          status: "Not Started",
          progress: 0,
        });

        // Success alert
        Swal.fire({
          title: "Joined!",
          text: "You have successfully joined this challenge.",
          icon: "success",
          confirmButtonText: "OK",
          buttonsStyling: false,
          customClass: {
            confirmButton:
              "bg-[#297B33] hover:bg-[#82B532] text-white py-2 px-4 rounded-xl transition-colors",
          },
        });
      } else {
        toast.error("Failed to join. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div>
      <Container>
        {/* Challenge Card */}
        <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-md overflow-hidden w-full mx-auto border border-gray-100 my-10">
          {/* Left: Image */}
          <div className="md:w-1/2 w-full">
            <img
              src={localChallenge.imageUrl}
              alt={localChallenge.title}
              className="w-full h-64 md:h-full object-cover"
            />
          </div>

          {/* Right: Info */}
          <div className="md:w-1/2 w-full p-6 flex flex-col justify-between bg-gray-50">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {localChallenge.title}
            </h2>

            <div className="text-start space-y-2 text-gray-700 text-sm">
              <p>
                <span className="font-medium text-gray-900">Category:</span>{" "}
                {localChallenge.category}
              </p>
              <p>
                <span className="font-medium text-gray-900">Duration:</span>{" "}
                {localChallenge.duration} days
              </p>
              <p>
                <span className="font-medium text-gray-900">Participants:</span>{" "}
                {localChallenge.participants}
              </p>
              <p>
                <span className="font-medium text-gray-900">Created By:</span>{" "}
                {localChallenge.createdBy}
              </p>
              <p>
                <span className="font-medium text-gray-900">Start Date:</span>{" "}
                {localChallenge.startDate}
              </p>
              <p>
                <span className="font-medium text-gray-900">End Date:</span>{" "}
                {localChallenge.endDate}
              </p>
              <p>
                <span className="font-medium text-gray-900">Target:</span>{" "}
                {localChallenge.target}
              </p>
              <p>
                <span className="font-medium text-gray-900">Impact Metric:</span>{" "}
                {localChallenge.impactMetric}
              </p>
              <p>
                <span className="font-medium text-gray-900">Description:</span>{" "}
                {localChallenge.description}
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-6 text-center bg-[#297B33] hover:bg-[#82B532] text-white py-2 rounded-xl transition-colors duration-300 w-full font-medium"
            >
              Join Challenge
            </button>
          </div>
        </div>

        {/* Join Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/70 bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl w-11/12 md:w-2/5 p-6 shadow-xl relative overflow-y-auto">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>

              <h3 className="text-xl font-semibold text-gray-800 mb-5 text-center">
                Join {localChallenge.title}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-1/2">
                    <label className="block text-gray-700 text-sm mb-1">
                      Participant Name
                    </label>
                    <input
                      type="text"
                      name="participantName"
                      value={formData.participantName}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-green-200"
                    />
                  </div>

                  <div className="w-1/2">
                    <label className="block text-gray-700 text-sm mb-1">Email</label>
                    <input
                      type="email"
                      name="participantEmail"
                      value={formData.participantEmail}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-green-200"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-1/2">
                    <label className="block text-gray-700 text-sm mb-1">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-green-200"
                    />
                  </div>

                  <div className="w-1/2">
                    <label className="block text-gray-700 text-sm mb-1">Join Date</label>
                    <input
                      type="text"
                      name="joinDate"
                      value={formData.joinDate}
                      readOnly
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm mb-1">Image URL</label>
                  <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-green-200"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm mb-1">Description / Notes</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-green-200"
                    rows="3"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#297B33] hover:bg-[#82B532] text-white py-2 rounded-xl font-medium transition-all"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Participants List */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#297B33]">
            Joined Participants in This Challenge
          </h2>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            See who has joined and is actively contributing to making a difference in this challenge.
          </p>
        </div>

        <div className="grid justify-center grid-cols-1 lg:grid-cols-2 gap-6 py-10">
          {participants.map((participant) => (
            <ParticipantCard key={participant._id} participant={participant} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ViewChallenge;
