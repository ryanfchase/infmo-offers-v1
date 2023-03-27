import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AppStateContext } from "../state/AppStateContext";

const HomePage = () => {
  const { isLoggedIn, dispatch } = useContext(AppStateContext);
  return (
    <div className="flex flex-col items-start space-y-8">
      <h2 className="text-3xl font-bold text-gray-900">Welcome to Infmo App</h2>
      <p className="text-lg text-gray-500">
        Infmo App is a platform that lets you take advantage of offers available
        to you!
      </p>
      <div className="flex justify-center lg:justify-start">
        <Link
          to={isLoggedIn ? "/offers" : "/login"}
          className="px-4 py-2 text-lg font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          See Offers
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
