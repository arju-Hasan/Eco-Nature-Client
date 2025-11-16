import React from 'react';
import { Link } from 'react-router';

const ForgotPassword = () => {
    const handleChange = (e) => {
        e.preventDefault();
        // console.log(e.target.email.value)
    }


    return (
        <div className='card mx-auto my-10 bg-base-100 w-full max-w-sm shrink-0 shadow-2xl'>
        <div className='card-body'>
            <Link to={"/"} className=" mx-auto text-[#82B532] text-xl font-semibold"><figure className='w-12 pr-1'><img src={"https://i.ibb.co.com/tpnX8gT8/site-logo2.png"} alt="Site Logo" /></figure></Link>
            <h1 className="text-3xl font-bold text-center ">Forgot Password</h1>
            <p className='text-center'>Enter your email address and we'll send you a reset link</p>
            {/* Email */}
            <form onSubmit={handleChange}>
                <fieldset className="fieldset">
                    <label className="label">Your Email</label>
                    <input type="email" name='email' required className={`input input-bordered w-full`} placeholder="yourname@example.com" />


                    <button className="btn  text-white bg-[#297B33] hover:bg-[#82B532] mt-4">Send Reset Link</button>
                </fieldset>
                <Link to={"/login"} className={"flex justify-center font-semebold text-center text-[#297B33] hover:underline"}> Back to Login</Link>
            </form>
        </div>
        </div>
    );
};

export default ForgotPassword;