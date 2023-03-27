import React, { useEffect, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AppStateContext } from "../state/AppStateContext";
import loginUserWithToken from "../api/loginUserWithToken";
import logoutUser from "../api/logoutUser";

const Root = () => {
  const { authToken, user, isLoggedIn, dispatch } = useContext(AppStateContext);

  useEffect(() => {
    const localAuthToken = localStorage.getItem("authToken");
    if (localAuthToken && isLoggedIn === false) {
      loginUserWithToken(localAuthToken, dispatch);
    }
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="flex items-center justify-between p-4 bg-white shadow-sm">
        <Link
          to="/"
          className="text-lg font-semibold px-3 py-2 text-gray-800 hover:bg-gray-100 hover:text-gray-900 rounded-md"
        >
          OffersMobile(TM)
        </Link>
        {isLoggedIn ? (
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link
                  to="/offers"
                  className="px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-200"
                >
                  Welcome {user.firstName}!
                </Link>
              </li>
              <li>
                <button
                  className="px-3 py-2 text-sm font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-700"
                  onClick={() => {
                    logoutUser({authToken}, dispatch)
                  }}
                >
                  Log Out
                </button>
              </li>
            </ul>
          </nav>
        ) : (
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
                  to="/login"
                  className="px-3 py-2 text-sm font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-700"
                >
                  Sign In
                </Link>
              </li>
            </ul>
          </nav>
        )}
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
