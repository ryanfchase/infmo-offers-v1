import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Oops!</h1>
      <p className="text-lg text-gray-600 mb-4">
        Sorry, an unexpected error has occurred.
      </p>
      <p className="text-lg text-gray-600 mb-4">
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to="/" className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700">
        Go Home
      </Link>
    </div>
  );
}