import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../provider/AuthProvider";
import toast, { Toaster } from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';
import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
    const [passwordError, setPasswordError] = useState("");
  const { signIn, auth, Googleprovider, setUser } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location);

    const handleGoogleLogin = () => {
      signInWithPopup(auth, Googleprovider)
        .then((result) => {
          const user = result.user;
          // console.log(result);
          setUser(user);
          toast.success("Login with Google successful!");
          navigate(`${location.state ? location.state : "/"}`);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(`Error: ${errorCode} - ${errorMessage}`);
        });
    };

  const handleLogin = (e) => {
  e.preventDefault();
  const form = e.target;
  const email = form.email.value;
  const password = form.password.value;
  // console.log({ email, password });

  if (passwordError) {
        toast.error(passwordError);
        return;
      }

  signIn(email, password)
    .then((result) => {
      const user = result.user;
      // console.log(user);
      toast.success("Login successful!"); 
      navigate(`${location.state ? location.state : "/"}`);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(`Error: ${errorCode} - ${errorMessage}`); 
      setError(errorCode);
    });
};
 
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleForgotPassword = () => {
  const email = document.querySelector('input[name="email"]').value;
  navigate("/forgot-password", { state: { email } });
};

  return (
    <div className="flex justify-center min-h-screen items-center">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 border-2 shadow-2xl py-5">
        <h2 className="font-semibold text-2xl text-center">
          Login your account
        </h2>
        <form onSubmit={handleLogin} className="card-body">
          <fieldset className="fieldset">
            {/* Email */}
            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              className="input"
              placeholder="Email"
              required
            />
            {/* Password */}
            <label className="label">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"} 
                className="input w-full"
                placeholder="Password"
                required
                onChange={(e) => {
                  const value = e.target.value;
                  const hasUpperCase = /[A-Z]/.test(value);
                  const hasLowerCase = /[a-z]/.test(value);
                  const hasNumber = /\d/.test(value);
                  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
                  const hasMinLength = value.length >= 8;

                  if (!hasUpperCase) {
                    setPasswordError("Password must contain at least one uppercase letter");
                  } else if (!hasLowerCase) {
                    setPasswordError("Password must contain at least one lowercase letter");
                  } else if (!hasMinLength) {
                    setPasswordError("Password must be at least 6 characters long");
                  } else if (!hasNumber) {
                    setPasswordError("Password must contain at least one number");
                  } else if (!hasSpecialChar) {
                    setPasswordError("Password must contain at least one special character");  
                  } else {
                    setPasswordError("");
                  }
                }}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 z-10"
              >
                {showPassword ? (
                  <Eye />
                ) : (
                  <EyeOff />
                )}
              </button>
            </div>
            <div>
              <button onClick={handleForgotPassword} className="link link-hover hover:text-primary">
                Forgot password?
              </button>
            </div>

            {error && <p className="text-error p-t text-center text-xs">{error}</p>}
            {passwordError && (
                <p className="text-xs p-2 text-center text-error">{passwordError}</p>
              )}

            <button type="submit" className="btn btn-neutral  mt-8">
              Login
            </button>
            <p className="font-semibold text-center pt-3">
              Don’t Have An Account?{" "}
              <Link className="text-secondary" to="/register">
                Register
              </Link>
            </p>
          </fieldset>
        <button onClick={handleGoogleLogin} className="btn !bg-base-100 !text-accent  mt-3">
            <FcGoogle className="mr-2 text-2xl" />
         Login with Google
         </button>
         </form>
       
      </div>
      {/* <ToastContainer /> */}
        {/* <Toaster /> */}
    </div>
  );
};

export default Login;