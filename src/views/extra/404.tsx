import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-600 mb-6">
        Sorry, the page you’re looking for doesn’t exist.
      </p>
      <Link
        to="/dashboard"
        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition"
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
