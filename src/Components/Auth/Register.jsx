import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../provider/AuthProvider";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";

const Register = () => {
  const { createUser, setUser, updateUser, auth, Googleprovider } = use(AuthContext);
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

     const handleGoogleLogin = () => {
        signInWithPopup(auth, Googleprovider)
          .then((result) => {
            const user = result.user;
            // console.log(result);
            setUser(user);
            toast.success("Login with Google successful!");
            navigate("/");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(`Error: ${errorCode} - ${errorMessage}`);
          });
      };

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    
    if (name.length < 5) {
      setNameError("Name should be more than 5 characters");
      return;
    } else {
      setNameError("");
    }

    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUser(auth.currentUser, { displayName: name, photoURL: photo })
          .then(() => {
            return auth.currentUser.reload();
          })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            toast.success("Registration successful!");
            navigate("/");
          })
          .catch((error) => {
            console.log(error);
            setUser(user);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(`Error: ${errorCode} - ${errorMessage}`);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center min-h-screen items-center">
      <div className="card w-full max-w-sm shrink-0 shadow-2xl shadow-gray-200 border-2 py-5">
        <h2 className="font-semibold text-2xl text-center">
          Register your account
        </h2>
        <form onSubmit={handleRegister} className="card-body">
          <fieldset className="fieldset">
            {/* Name */}
            <label className="label">Name</label>
            <input
              name="name"
              type="text"
              className="input"
              placeholder="Name"
              required
            />
            {nameError && <p className="text-xs text-error">{nameError}</p>}

            {/* Photo URL */}
            <label className="label">Photo URL</label>
            <input
              name="photo"
              type="text"
              className="input"
              placeholder="Photo URL"
              required
            />

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
                {showPassword ? <Eye /> : <EyeOff />}
              </button>             
            </div>
              {passwordError && (
                <p className="text-xs p-2 text-error">{passwordError}</p>
              )}

            <button type="submit" className="btn btn-neutral mt-5">
              Register
            </button>

            <p className="font-semibold text-center pt-3">
              Already have an account?{" "}
              <Link className="text-secondary" to="/auth/login">
                Login
              </Link>
            </p>
          </fieldset>
          <button onClick={handleGoogleLogin} className="btn !bg-base-100 !text-accent   mt-3">
            <FcGoogle className="mr-2 text-2xl" />
            Login with Google
            </button>
        </form>        
      </div>
    </div>
  );
};

export default Register;
