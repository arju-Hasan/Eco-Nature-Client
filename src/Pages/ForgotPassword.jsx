import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router";
import { AuthContext } from '../Context/AuthContext';
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-hot-toast";

const ForgotPassword = () => {
  const [error, setError] = useState("");
  const { auth } = useContext(AuthContext);


  const location = useLocation();
  const prefilledEmail = location.state?.email || ""; 

  const handleReset = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Password reset email sent!");
        window.open("https://mail.google.com/mail", "_blank");
      })
      .catch((error) => {
        setError(error.code);
        toast.error(`${error.code}: ${error.message}`);
      });
  };

    return (
        <div className='card mx-auto my-10 bg-base-100 w-full max-w-sm shrink-0 shadow-2xl'>
        <div className='card-body'>
            <Link to={"/"} className=" mx-auto text-green-600 text-xl font-semibold"><figure className='w-12 pr-1'><img src={"https://i.ibb.co.com/xPxTstf/logo.png"} alt="Site Logo" /></figure></Link>
            <h1 className="text-3xl font-bold text-center ">Forgot Password</h1>
            <p className='text-center'>Enter your email address and we'll send you a reset link</p>
            {/* Email */}
            <form onSubmit={handleReset}>
                <fieldset className="fieldset">
                     <label className="label">Email</label>
                    <input
                    name="email"
                    type="email"
                    className="input"
                    placeholder="Email"
                    defaultValue={prefilledEmail} 
                    required
                    />
                  {error && <p className="text-red-400 text-xs">{error}</p>}
                    <button className="btn  text-white bg-green-600 hover:bg-green-700 mt-4">Send Reset Link</button>
                </fieldset>
                <Link to={"/login"} className={"flex justify-center font-semebold text-center text-green-600 hover:underline"}> Back to Login</Link>
            </form>
        </div>
        </div>
    );
};

export default ForgotPassword;