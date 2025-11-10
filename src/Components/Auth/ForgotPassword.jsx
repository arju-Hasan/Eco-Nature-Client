import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router";
import { AuthContext } from "../../provider/AuthProvider";
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
    <div className="flex justify-center min-h-screen items-center">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl py-5">
        <h2 className="font-semibold text-2xl text-center">
          Reset your password
        </h2>

        <form onSubmit={handleReset} className="card-body">
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

            <button type="submit" className="btn btn-neutral mt-4">
              Reset Password
            </button>

            <p className="font-semibold text-center pt-5">
              You know your password?{" "}
              <Link className="text-secondary" to="/auth/login">
                Login
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};


export default ForgotPassword;
