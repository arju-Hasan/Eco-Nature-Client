import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h1 className="text-9xl font-bold text-primary">404</h1>
      <p className="text-3xl font-semibold mt-4">Oops! Page Not Found.</p>
      <p className="text-lg mt-2 text-gray-500">
        {error.statusText ||
          error.message ||
          "The page you are looking for does not exist."}
      </p>
      <Link to="/" className="btn btn-primary mt-8">
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
