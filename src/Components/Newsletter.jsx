// Newsletter.jsx
import React, { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "react-toastify";

const Newsletter = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      toast.error("Please fill in both fields!", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    // Post data to MongoDB database
    fetch("https://y-xi-drab.vercel.app/api/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          // If status code is not 2xx, show error toast
          toast.error(data.message || "Email already subscribed");
          return;
        } else {
          // Successful subscription
          toast.success(data.message || "Thank you for subscribing!");

          // Reset form and state
          setFormData({ name: "", email: "" });
          e.target.reset();
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Server error. Please try again later.");
      });
  };

  return (
    <section className="py-20" id="newsletter">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-green-600 mb-4">
          Subscribe to EcuTrack inbox Newsletter
        </h2>
        <p className="mb-8 max-w-2xl mx-auto">
          Get the latest sustainability challenges, eco-tips, and community
          updates delivered straight to your mail inbox EcoTips Newsletter.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col bg-black/30 sm:flex-row gap-3 justify-center items-center max-w-2xl mx-auto p-4 rounded-2xl shadow-md border border-green-100"
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full sm:flex-1 px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:border-green-600"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full sm:flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-600"
            required
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-300"
          >
            <Send size={18} />
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
