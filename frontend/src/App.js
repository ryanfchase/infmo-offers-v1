import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Root, { loader as rootLoader } from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import "./index.css";
import { AppStateProvider } from "./state/AppStateContext";
import loginUserWithToken from "./api/loginUserWithToken";

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
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
    ],
  },
]);

function App() {
  return (
    <AppStateProvider>
      <RouterProvider router={router} />
    </AppStateProvider>
  );
}

export default App;
