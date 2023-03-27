import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Root from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import SignupFormV1 from "./components/SignupFormV1";
import "./index.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/signup",
        element: <SignupFormV1 />,
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;
