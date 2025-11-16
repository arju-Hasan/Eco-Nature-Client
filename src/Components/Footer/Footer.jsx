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
                        <Link to={"/"} className=" flex  items-center text-[#82B532] text-xl font-semibold"><figure className='w-12 pr-1'><img src={"https://i.ibb.co.com/tpnX8gT8/site-logo2.png"} alt="Site Logo" /></figure><span className='text-[#297B33]'>Eco</span>Track</Link>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-100">
                        Empowering eco-conscious individuals to live sustainably, take on
                        green challenges, and make measurable community impact.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold text-[#82B532] mb-3">
                        Quick Links
                    </h3>
                    <ul className="space-y-2">
                        <li>
                            <Link to="/" className="hover:text-[#82B532]">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/challenges" className="hover:text-[#82B532]">
                                Challenges
                            </Link>
                        </li>

                        <li>
                            <Link to="/contact" className="hover:text-[#82B532]">
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className="hover:text-[#82B532]">
                                About Us
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Resources */}
                <div>
                    <h3 className="text-lg font-semibold text-[#82B532] mb-3">
                        Resources
                    </h3>
                    <ul className="space-y-2">
                        <li>
                            <Link to="/eco-tips" className="hover:text-[#82B532]">
                                Eco Tips
                            </Link>
                        </li>
                        <li>
                            <Link to="/events" className="hover:text-[#82B532]">
                                Events
                            </Link>
                        </li>
                        <li>
                            <Link to="/impact-tracker" className="hover:text-[#82B532]">
                                Impact Tracker
                            </Link>
                        </li>
                        <li>
                            <Link to="/community" className="hover:text-[#82B532]">
                                Community
                            </Link>
                        </li>

                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className="text-lg font-semibold text-[#82B532] mb-3">
                        Follow Us
                    </h3>
                    {/* Social Media */}
                    <div className="flex flex-col my-4">
                        <div className="flex space-x-4 text-xl">
                            <Link
                                to={"https://www.facebook.com/EcoTrack"}
                                target="_blank"
                                className="hover:text-[#82B532] transition-colors"
                                aria-label="Facebook"
                            >
                                <FaFacebookF />
                            </Link>
                            <Link
                                to={"https://twitter.com/EcoTrack"}
                                target="_blank"
                                className="hover:text-[#82B532] transition-colors"
                                aria-label="Twitter"
                            >
                                <FaXTwitter />
                            </Link>
                            <Link
                                to={"https://www.instagram.com/EcoTrack"}
                                target="_blank"
                                className="hover:text-[#82B532] transition-colors"
                                aria-label="Instagram"
                            >
                                <FaInstagram />
                            </Link>
                            <Link
                                to={"https://www.linkedin.com/company/EcoTrack"}
                                target="_blank"
                                className="hover:text-[#82B532] transition-colors"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedinIn />
                            </Link>
                            <Link
                                to={"https://www.youtube.com/@EcoTrack"}
                                target="_blank"
                                className="hover:text-[#82B532] transition-colors"
                                aria-label="YouTube"
                            >
                                <FaYoutube />
                            </Link>
                        </div>
                    </div>

                </div>



            </div>

            <div className=" mt-10 border-t border-[#82B532]/30 pt-5 text-center text-sm text-gray-200">
                <p>
                    © {new Date().getFullYear()} <span className="text-[#82B532]">EcoTrack</span> —
                    Building a sustainable future together.
                </p>
                <p>
                    Developed by —
                    <Link to={"https://www.ayansujon.com/"} className="text-[#82B532]">Ayan Sujon</Link>
                </p>


            </div>
        </footer>
    );
};

export default Footer;
