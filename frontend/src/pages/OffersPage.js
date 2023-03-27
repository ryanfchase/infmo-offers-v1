import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AppStateContext } from "../state/AppStateContext";
const OffserPage = () => {
  const { user, offers, claimedOffers } = useContext(AppStateContext);
  return (
    <>
      <div>
        <div className="bg-indigo-500 py-3 px-6 flex justify-center items-center rounded-t-lg">
          {/* image goes here */}
          <h2 className="text-white text-2xl font-bold">
            Welcome, {user.firstName}!
          </h2>
        </div>
        <div className="bg-white shadow-md p-6 mb-6 rounded-b-lg">
          <ul>
            <li>
              <strong>Number of Available Offers:</strong> {offers.length}{" "}
            </li>
            <li>
              <strong>Number of Offers Claimed:</strong> {claimedOffers.length}
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
