import React from "react";
import { Link, Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="flex items-center justify-between p-4 bg-white shadow-sm">
        <Link to="/" className="text-lg font-semibold px-3 py-2 text-gray-800 hover:bg-gray-100 hover:text-gray-900 rounded-md">
          OffersMobile(TM)
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/signup"
                className="px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-200"
              >
                Sign Up
              </Link>
            </li>
            <li>
              <Link
                to="/signin"
                className="px-3 py-2 text-sm font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-700"
              >
                Sign In
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="flex grow items-center justify-center flex-1 px-6 py-6 md:px-4 md:py-4 lg:px-8 lg:py-8">
        <div className="max-w-md w-full">
          <Outlet />
        </div>
      </main>
      <footer className="flex items-center justify-center w-full h-12 bg-gray-200">
        <p className="text-gray-600">
          &copy; {new Date().getFullYear()} Infmo App
        </p>
      </footer>
    </div>
  );
};

export default Root;
