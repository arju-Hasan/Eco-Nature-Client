import React from "react";
import { Link } from "react-router";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";


const Footer = () => {



    return (
        <footer className=" bg-[#1c2c44] text-white py-10">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Brand Section */}
                <div>
                    <div className="flex items-center mb-3">
                        <Link to={"/"} className=" flex  items-center text-green-600 text-xl font-semibold"><figure className='w-12 pr-1'><img src={"https://i.ibb.co.com/xPxTstf/logo.png"} alt="Site Logo" /></figure>Track</Link>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-100">
                        Eco Tracker helps you monitor your environmental impact through smart insights, daily habits, and sustainable challenges. It empowers you to reduce waste, a more eco-friendly lifestyle
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold text-green-600 mb-3">
                        Quick Links
                    </h3>
                    <ul className="space-y-2">
                        <li>
                            <Link to="/" className="hover:text-green-600">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/challenges" className="hover:text-green-600">
                                Challenges
                            </Link>
                        </li>

                        <li>
                            <Link to="/contact" className="hover:text-green-600">
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className="hover:text-green-600">
                                About Us
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Resources */}
                <div>
                    <h3 className="text-lg font-semibold text-green-600 mb-3">
                        Resources
                    </h3>
                    <ul className="space-y-2">
                        <li>
                            <Link to="/eco-tips" className="hover:text-green-600">
                                Eco Tips
                            </Link>
                        </li>
                        <li>
                            <Link to="/events" className="hover:text-green-600">
                                Events
                            </Link>
                        </li>
                        <li>
                            <Link to="/impact-tracker" className="hover:text-green-600">
                                Impact Tracker
                            </Link>
                        </li>
                        <li>
                            <Link to="/community" className="hover:text-green-600">
                                Community
                            </Link>
                        </li>

                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className="text-lg font-semibold text-green-600 mb-3">
                        Follow Us
                    </h3>
                    {/* Social Media */}
                    <div className="flex flex-col my-4">
                        <div className="flex space-x-4 text-xl">
                            <Link
                                to={"https://www.facebook.com/EcoTrack"}
                                target="_blank"
                                className="hover:text-green-600 transition-colors"
                                aria-label="Facebook"
                            >
                                <FaFacebookF className="text-5xl" />
                            </Link>
                            <Link
                                to={"https://twitter.com/EcoTrack"}
                                target="_blank"
                                className="hover:text-green-600 transition-colors"
                                aria-label="Twitter"
                            >
                                <FaXTwitter className="text-5xl" />
                            </Link>
                            <Link
                                to={"https://www.instagram.com/EcoTrack"}
                                target="_blank"
                                className="hover:text-green-600 transition-colors"
                                aria-label="Instagram"
                            >
                                <FaInstagram className="text-5xl" />
                            </Link>
                            <Link
                                to={"https://www.linkedin.com/company/EcoTrack"}
                                target="_blank"
                                className="hover:text-green-600 transition-colors"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedinIn className="text-5xl" />
                            </Link>
                            <Link
                                to={"https://www.youtube.com/@EcoTrack"}
                                target="_blank"
                                className="hover:text-green-600 transition-colors"
                                aria-label="YouTube"
                            >
                                <FaYoutube className="text-5xl" />
                            </Link>
                        </div>
                    </div>

                </div>
            </div>

            <div className=" mt-10 border-t-5 border-dotted border-green-600/30 pt-5 text-center text-sm text-gray-200">
                <p>
                    Copyright  © {new Date().getFullYear()} <span className="text-green-600">EcoTrack</span> -All right reserved.
                </p>
                <p>
                    Developed by —
                    <Link to={"https://github.com/arju-Hasan"} className="text-green-600">Arju Hasan</Link>
                </p>


            </div>
        </footer>
    );
};

export default Footer;
