import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { AppStateContext } from "../state/AppStateContext";
import { useNavigate } from "react-router-dom";
const OffserPage = () => {
  const { isLoggedIn, user, offers, claimedOffers } = useContext(AppStateContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(!isLoggedIn) navigate('/login');
  })

  return (
    <>
      <div>
        <div className="bg-indigo-800 py-3 px-6 flex justify-center items-center rounded-t-lg">
          {/* image goes here */}
          <h2 className="text-white text-2xl font-bold">
            Welcome, {user.firstName}!
          </h2>
        </div>
        <div className="bg-white shadow-md p-6 mb-6 rounded-b-lg">
          <ul>
            <li>
              <strong>Today's Available Offers:</strong> {offers?.length}{" "}
            </li>
            <li>
              <strong>Number of Offers Claimed:</strong> {claimedOffers?.length}
            </li>
            <br />
            <li>
              {" "}
              Age: <strong> {user.age} </strong>
            </li>
            <li>
              {" "}
              Days until birthday: <strong> {user.daysUntilBirthdate} </strong>
            </li>
          </ul>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default OffserPage;
