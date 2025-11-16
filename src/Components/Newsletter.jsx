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
fetch('http://localhost:3000/api/subscribe', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
})
.then(async res => {
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
.catch(err => {
    console.error(err);
    toast.error("Server error. Please try again later.");
});



    };

    return (
        <section className="py-20 bg-green-50" id="newsletter">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-[#297B33] mb-4">
                    Subscribe to Our Newsletter
                </h2>
                <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
                    Get the latest sustainability challenges, eco-tips, and community updates delivered straight to your inbox.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-2xl mx-auto bg-white p-4 rounded-2xl shadow-md border border-green-100"
                >
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full sm:flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#297B33]"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full sm:flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#297B33]"
                        required
                    />
                    <button
                        type="submit"
                        className="flex items-center justify-center gap-2 bg-[#297B33] hover:bg-[#82B532] text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-300"
                    >
                        <Send size={18} />
                        Subscribe
                    </button>
                </form>

                <p className="text-xs text-gray-500 mt-4">
                    🌱 We respect your privacy. Unsubscribe anytime.
                </p>

            </div>
        </section>
    );
};

export default Newsletter;
