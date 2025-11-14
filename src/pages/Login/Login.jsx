import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import loginImage from "../../assets/loginImage.svg";

const Login = () => {
  const { signIn, googleSignIn } = useAuth();
  const axios = useAxios();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        toast.success("Login Successful!");
        navigate(from, { replace: true });
        console.log(result);
      })
      .catch((error) => toast.error(error.message));
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        const userInfo = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };

        axios
          .post("/users", userInfo)
          .then((dbData) => {
            toast.success("Login Successful!");
            navigate(from, { replace: true });
            console.log(dbData);
          })
          .catch((dbError) => toast.error("Failed to process Google Sign-in."));
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row shadow-2xl bg-base-100 rounded-xl">
        <div className="text-center lg:text-left w-full lg:w-1/2 p-8">
          <img
            src={loginImage}
            alt="Login"
            className="w-full max-w-md mx-auto"
          />
          <h1 className="text-5xl font-bold text-primary mt-6">
            Welcome Back!
          </h1>
          <p className="py-6">
            Continue your journey of building better habits. We are glad to see
            you again.
          </p>
        </div>
        <div className="card w-full lg:w-1/2">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <h1 className="text-3xl font-bold text-center text-primary mb-4">
              Login Now!
            </h1>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="email"
                className="input input-bordered w-full"
              />
              {errors.email && (
                <span className="text-red-600 mt-1 text-xs">
                  Email is required
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password", { required: true })}
                placeholder="password"
                className="input input-bordered w-full"
              />
              {errors.password && (
                <span className="text-red-600 mt-1 text-xs">
                  Password is required
                </span>
              )}
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
          <div className="divider px-8">OR</div>
          <div className="px-8 text-center">
            <button
              onClick={handleGoogleSignIn}
              className="btn btn-outline btn-primary w-full mb-4"
            >
              Continue with Google
            </button>
          </div>
          <p className="text-center mb-4">
            New to Habit Tracker?{" "}
            <Link to="/register" className="link link-primary">
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
