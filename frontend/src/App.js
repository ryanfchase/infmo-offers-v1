import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Root from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import Offers from "./components/Offers";
import OffersPage from "./pages/OffersPage";
// import OfferDetail from "./components/OfferDetail";
import "./index.css";
import { AppStateProvider } from "./state/AppStateContext";

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
      {
        path: "/offers",
        element: <OffersPage />,
        children: [
          {
            path: "/offers",
            element: <Offers />,
          },
          // {
          // TODO - future implementation
          //   path: "/offers/:id",
          //   element: <OfferDetail />
          // }
        ],
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
