// AddChallenges.jsx
import React, { useContext, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
// import Loading from "./Loading";


const AddChallenges = () => {
  const { user, loading } = useContext(AuthContext);
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
      createdBy: user.email,
  });

  const [errors, setErrors] = useState({});

  const categories = [
    "Energy Conservation",
    "Water Conservation",
    "Sustainable Transport",
    "Green Living",
    "Waste Reduction",
  ];

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
    if (!formData.createdBy) newErrors.createdBy = "Created by is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  const payload = {
    ...formData,
    createdBy: user.email, // Ensure correct user
  };

  try {
    const res = await fetch("/api/challenges", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log("Insert Response:", data);

    Swal.fire({
      title: "Challenge Added!",
      text: "Your challenge has been successfully created.",
      icon: "success",
      confirmButtonText: "OK",
      buttonsStyling: false,
      customClass: {
        confirmButton:
          "bg-[#297B33] hover:bg-[#82B532] text-white py-2 px-4 rounded-xl transition-colors",
      },
    });

    // Reset Form AFTER success
    setFormData({
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
      createdBy: user.email,
    });

    navigate("/my-activities");
  } catch (error) {
    console.error("Error:", error);
  }
};

return (
  <div className="py-20">
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl text-center font-bold mb-6 text-green-600">Add New Challenge</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Row 1: Title */}
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>

        {/* Row 2: Start Date + End Date */}
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

        {/* Row 3: Image URL + Created By */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              placeholder="Image URL"
              defaultValue={formData.imageUrl}
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
              placeholder="Created By"
              value={user.email}
              // value={formData.createdBy}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
            {errors.createdBy && <p className="text-red-500 text-sm">{errors.createdBy}</p>}
          </div>
        </div>

        {/* Row 4: Target + Duration */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Target</label>
            <input
              type="text"
              name="target"
              placeholder="Target"
              value={formData.target}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
            {errors.target && <p className="text-red-500 text-sm">{errors.target}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Duration (days)</label>
            <input
              type="number"
              name="duration"
              placeholder="Duration"
              value={formData.duration}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
            {errors.duration && <p className="text-red-500 text-sm">{errors.duration}</p>}
          </div>
        </div>

        {/* Row 5: Impact Metric + Category */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Impact Metric</label>
            <input
              type="text"
              name="impactMetric"
              placeholder="Impact Metric"
              value={formData.impactMetric}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
            {errors.impactMetric && <p className="text-red-500 text-sm">{errors.impactMetric}</p>}
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
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
          </div>
        </div>

        {/* Row 6: Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center"
        >
          <FaPlus className="mr-2" /> Add Challenge
        </button>
      </form>
    </div>
  </div>
);
};

export default AddChallenges;
