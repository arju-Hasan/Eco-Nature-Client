import React, { useContext, useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AuthContext } from "../Context/AuthContext";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import Loading from "./Loading";

const EditChallenge = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    duration: "",
    target: "",
    participants: 0,
    impactMetric: "",
    startDate: "",
    endDate: "",
    imageUrl: "",
    createdBy: user?.email,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  const categories = [
    "Energy Conservation",
    "Water Conservation",
    "Sustainable Transport",
    "Green Living",
    "Waste Reduction",
  ];

  // Fetch challenge data
  useEffect(() => {
    if (!id) return;
    const fetchChallenge = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/challenges`);
        const data = await res.json();
        const challenge = data.find((c) => c._id === id);
        if (challenge) setFormData({ ...challenge });
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Failed to load challenge data", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchChallenge();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.duration || isNaN(formData.duration))
      newErrors.duration = "Duration must be a number";
    if (!formData.target) newErrors.target = "Target is required";
    if (!formData.impactMetric) newErrors.impactMetric = "Impact metric required";
    if (!formData.startDate) newErrors.startDate = "Start date required";
    if (!formData.endDate) newErrors.endDate = "End date required";
    if (!formData.imageUrl) newErrors.imageUrl = "Image URL required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Update challenge
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await fetch(`http://localhost:3000/api/challenges/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.modifiedCount) {
        Swal.fire({
          title: "Updated!",
          text: "Challenge updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
          buttonsStyling: false,
          customClass: {
            confirmButton: "bg-[#297B33] hover:bg-[#82B532] text-white py-2 px-4 rounded-xl",
          },
        });
        navigate("/my-activities");
      } else {
        Swal.fire("Info", "No changes detected.", "info");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to update challenge.", "error");
    }
  };

  // Delete challenge with brand color modal & spacing
  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This challenge will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      buttonsStyling: false,
      customClass: {
        confirmButton: "bg-[#297B33] hover:bg-[#82B532] text-white py-2 px-4 rounded-xl mr-2",
        cancelButton: "bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-xl",
        popup: "swal2-popup-custom",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`http://localhost:3000/api/challenges/${id}`, {
            method: "DELETE",
          });
          const data = await res.json();
          if (data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Challenge has been deleted.",
              icon: "success",
              confirmButtonText: "OK",
              buttonsStyling: false,
              customClass: {
                confirmButton: "bg-[#297B33] hover:bg-[#82B532] text-white py-2 px-4 rounded-xl",
              },
            });
            navigate("/my-activities");
          }
        } catch (error) {
          console.error(error);
          Swal.fire("Error", "Failed to delete challenge.", "error");
        }
      }
    });
  };

  if (loading) return <Loading />;

  return (
    <div className="py-20">
      <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl text-center font-bold mb-6 text-[#297B33]">
          Edit Challenge
        </h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>

          {/* StartDate + EndDate */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}
            </div>
            <div>
              <label className="block font-medium mb-1">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate}</p>}
            </div>
          </div>

          {/* Image URL + Created By */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Image URL</label>
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
              {errors.imageUrl && <p className="text-red-500 text-sm">{errors.imageUrl}</p>}
            </div>
            <div>
              <label className="block font-medium mb-1">Created By</label>
              <input
                type="text"
                name="createdBy"
                value={user.email}
                disabled
                className="input w-full bg-gray-200"
              />
            </div>
          </div>

          {/* Target + Duration */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Target</label>
              <input
                type="text"
                name="target"
                value={formData.target}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Duration (days)</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* Impact Metric + Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Impact Metric</label>
              <input
                type="text"
                name="impactMetric"
                value={formData.impactMetric}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="textarea textarea-bordered w-full"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-4">
            <button
              type="submit"
              className="btn w-full md:w-1/2 bg-[#297B33] hover:bg-[#82B532] text-white flex items-center justify-center"
            >
              <FaEdit className="mr-2" /> Update
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="btn w-full md:w-1/2 bg-red-600 hover:bg-red-700 text-white flex items-center justify-center"
            >
              <FaTrash className="mr-2" /> Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditChallenge;
