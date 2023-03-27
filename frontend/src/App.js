import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Root from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import SignupForm from "./components/SignupForm";
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
        element: <SignupForm />,
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;
