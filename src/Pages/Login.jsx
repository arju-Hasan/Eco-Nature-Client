// import React from 'react';
import React, { useState } from 'react';
import Container from '../Layouts/Container';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { IoEyeOff } from 'react-icons/io5';
import { FaEye } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [show, setShow] = useState(false);
    const [errors, setErrors] = useState({});
    const { signInWithGoogle, setLoading, setUser, loginUser, loading } = useContext(AuthContext);
    const location = useLocation();
    const from = location.state || "/";
    const navigate = useNavigate();
    // console.log(from);



    //  All Validation Patterns
    const patterns = {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        uppercase: /[A-Z]/,
        lowercase: /[a-z]/,
        specialChar: /[^A-Za-z0-9]/,
        minLength: /^.{6,}$/,
    };

    // All Validation Function 
    const validateField = (name, value) => {
        let message = "";

        if (name === "email") {
            if (!value.trim()) message = "Email is required.";
            else if (!patterns.email.test(value))
                message = "Enter a valid email address.";
        } else if (name === "password") {
            if (!patterns.minLength.test(value))
                message = "Password must be at least 6 characters.";
            else if (!patterns.uppercase.test(value))
                message = "Must contain at least one uppercase letter.";
            else if (!patterns.lowercase.test(value))
                message = "Must contain at least one lowercase letter.";
            else if (!patterns.specialChar.test(value))
                message = "Must include at least one special character.";
        }

        setErrors((prev) => ({ ...prev, [name]: message }));
    };

    // Handle OnChange
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Validate immediately
        validateField(name, value);
    };







    const handleLogin = (e) => {
        e.preventDefault();

        // Inline validation for each field
        validateField("email", formData.email);
        validateField("password", formData.password);


        // Check if any error exists
        if (!formData.email || !formData.password || errors.email || errors.password)
            return;

        setLoading(true); // Start loading
        // console.log("Form Submitted:", formData);


        // firebase user Create functionalities
        const email = formData.email;
        const password = formData.password;

        loginUser(email, password)
            .then(res => {
                // console.log(res);
                setUser(res.user);
                navigate(from);
                setLoading(false);
                toast.success("Login Successfull!");
            })
            .catch((e) => {
                console.log(e);
                toast.error(e.message);
            })


    }



    // signin with google 

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then((result) => {
                // console.log("Data after create user in firebase", result.user);
                const user = result.user;
                const newUser = {
                    name: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    accessToken: user.accessToken,
                    registrationType: "google"

                }
                // Now create user in the database
                fetch(`http://localhost:3000/users`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log("Data after user submission: ", data);
                    })
                setLoading(false);
                setUser(newUser);
                toast.success("Login with Google Successfull!");
                navigate(from);

            })
            .catch((error) => {
                console.log(error);
            })

    }




    return (
        <div className=''>
            <Container>
                <div>
                    <div className="card mx-auto my-10 bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <Link to={"/"} className=" mx-auto text-[#82B532] text-xl font-semibold"><figure className='w-12 pr-1'><img src={"https://i.ibb.co.com/tpnX8gT8/site-logo2.png"} alt="Site Logo" /></figure></Link>
                            <h1 className="text-3xl font-bold text-center ">Login to EcoTrack</h1>
                            <form onSubmit={handleLogin}>

                                <fieldset className="fieldset">
                                    {/* Email */}
                                    <label className="label">Your Email</label>
                                    <input onChange={handleChange} value={formData.email} type="email" name='email' required className={`input input-bordered w-full ${errors.email ? "border-red-500" : ""}`} placeholder="yourname@example.com" />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                    )}
                                    {/* Password */}
                                    <label className="label">Password</label>
                                    <div className='relative'>
                                        <input onChange={handleChange} value={formData.password} type={show ? "text" : "password"} name='password' required className={`input input-bordered w-full ${errors.password ? "border-red-500" : ""}`} placeholder="Password (e.g. MyPass123!)" />
                                        <span onClick={() => setShow(!show)} className='absolute text-lg right-8 top-[11px] cursor-pointer z-20'>
                                            {show ? <FaEye /> : <IoEyeOff />}
                                        </span>
                                    </div>
                                    {errors.password && (
                                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                                    )}


                                    <div><Link to={"/forgot-password"} className="link link-hover hover:text-[#297B33]">Forgot password?</Link></div>

                                    <button
                                        type="submit"
                                        className="btn text-white bg-[#297B33] hover:bg-[#82B532] mt-4 w-full"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="loading loading-spinner"></span>
                                                Logging in...
                                            </>
                                        ) : (
                                            "Log in"
                                        )}
                                    </button>

                                </fieldset>
                            </form>
                            {/* Google */}
                            <button
                                onClick={handleGoogleSignIn}
                                className="btn bg-white text-black border-[#e5e5e5]">
                                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                Continue with Google
                            </button>
                            <p className='text-center'>Dont have an accout? <Link to={"/register"} className={"font-semebold text-[#297B33] hover:underline"}>Register</Link></p>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Login;