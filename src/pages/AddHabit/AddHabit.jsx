import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

const AddHabit = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const habitData = {
      ...data,
      userName: user.displayName,
      userEmail: user.email,
    };

    axios
      .post("/habits", habitData)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("New Habit Added Successfully!");
          reset();
        } else {
          toast.error("Failed to add habit.");
        }
      })
      .catch((error) => {
        console.error(error);

        if (error.response?.status === 403) {
          toast.error("Token email does not match user email.");
        } else {
          toast.error("An error occurred.");
        }
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-base-100 shadow-xl rounded-lg my-10">
      <h1 className="text-3xl font-bold text-center text-primary mb-6">
        Add Your New Habit
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Habit Title*</span>
          </label>
          <input
            type="text"
            {...register("title", { required: true })}
            placeholder="e.g., Read 10 pages of a book"
            className="input input-bordered w-full"
          />
          {errors.title && (
            <span className="text-red-600 mt-1 text-xs">Title is required</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Category*</span>
          </label>
          <select
            {...register("category", { required: true })}
            className="select select-bordered w-full"
            defaultValue=""
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="Morning">Morning</option>
            <option value="Work">Work</option>
            <option value="Fitness">Fitness</option>
            <option value="Evening">Evening</option>
            <option value="Study">Study</option>
          </select>
          {errors.category && (
            <span className="text-red-600 mt-1 text-xs">
              Category is required
            </span>
          )}
        </div>
        <div className="form-control">
          <label className="label w-full">
            <span className="label-text">Description</span>
          </label>
          <textarea
            {...register("description")}
            placeholder="Short description of your habit..."
            className="textarea textarea-bordered h-24"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Reminder Time</span>
            </label>
            <input
              type="time"
              {...register("reminderTime")}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Image URL (Optional)</span>
            </label>
            <input
              type="text"
              {...register("image")}
              placeholder="Image URL from ImgBB or other sources"
              className="input input-bordered w-full"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">User Name</span>
            </label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="input input-bordered w-full bg-base-200"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">User Email</span>
            </label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full bg-base-200"
            />
          </div>
        </div>
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary btn-lg">
            Add Habit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddHabit;
