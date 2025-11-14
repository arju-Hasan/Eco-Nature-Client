import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import registerImage from "../../assets/photo1.svg";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const axios = useAxios();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        console.log(result);
        updateUserProfile(data.name, data.photoURL)
          .then(() => {
            const userInfo = {
              name: data.name,
              email: data.email,
              photoURL: data.photoURL,
            };

            axios
              .post("/users", userInfo)
              .then((dbData) => {
                if (
                  dbData.data.insertedId ||
                  dbData.data.message === "User already exists"
                ) {
                  toast.success("Registration Successful!");
                  navigate("/");
                }
              })
              .catch((dbError) =>
                toast.error("Failed to save user to database.")
              );
          })
          .catch((error) => toast.error(error.message));
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse shadow-2xl bg-base-100 rounded-xl">
        <div className="card w-full lg:w-1/2">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <h1 className="text-3xl font-bold text-center text-primary mb-4">
              Create an Account!
            </h1>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Your Name"
                className="input input-bordered w-full"
              />
              {errors.name && (
                <span className="text-red-600 mt-1 text-xs">
                  Name is required
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                {...register("photoURL", { required: true })}
                placeholder="Photo URL"
                className="input input-bordered w-full"
              />
              {errors.photoURL && (
                <span className="text-red-600 mt-1 text-xs">
                  Photo URL is required
                </span>
              )}
            </div>
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
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern: /(?=.*[A-Z])(?=.*[a-z])/,
                })}
                placeholder="password"
                className="input input-bordered w-full"
              />
              <div className="text-red-600 mt-1 text-xs">
                {errors.password?.type === "required" && (
                  <span>Password is required</span>
                )}
                {errors.password?.type === "minLength" && (
                  <span>Password must be 6 characters</span>
                )}
                {errors.password?.type === "pattern" && (
                  <span>Must have one Uppercase and one Lowercase</span>
                )}
              </div>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
          </form>
          <p className="text-center mb-4">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary">
              Login here
            </Link>
          </p>
        </div>
        <div className="text-center lg:text-left w-full lg:w-1/2 p-8">
          <img
            src={registerImage}
            alt="Habit Building"
            className="w-full max-w-md mx-auto"
          />
          <h1 className="text-5xl font-bold text-primary mt-6">
            Start Your Journey!
          </h1>
          <p className="py-6">
            Track your habits, build consistency, and achieve your goals. Sign
            up to take the first step towards a more productive life.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
