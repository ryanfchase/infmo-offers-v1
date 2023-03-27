import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AppStateContext } from "../state/AppStateContext";
import fetchOffers from "../api/fetchOffers";

const Offers = () => {
  const { offers, authToken, isLoggedIn, user, offersLoaded, dispatch } =
    useContext(AppStateContext);
  console.log(AppStateContext);
  console.log(
    `offers: ${JSON.stringify(
      offers
    )}, authKey: ${authToken}, userLoggedIn: ${isLoggedIn}, user: ${JSON.stringify(
      user
    )}, offersLoaded?: ${offersLoaded}`
  );
  useEffect(() => {
    if (!offersLoaded) {
      fetchOffers(authToken, dispatch);
    }
  }, [offersLoaded, authToken, dispatch]);

  return (
    <ul className="space-y-4">
      {offers.map((offer, i) => (
        <li key={i} className="bg-white shadow-md rounded-lg p-6">
          <Link
            to={`/offers/${offer.id}`}
            className="text-2xl font-bold mb-2 hover:text-blue-500 hover:underline cursor-pointer"
          >
            {offer.description}
          </Link>
          <div className="flex flex-col justify-between">
            <div>
              <p><strong>Target Age Range: </strong>{offer.target_age_min} - {offer.target_age_max}</p>
              <p><strong>Target Gender: </strong>{offer.target_gender}</p>
            </div>
          </div>
          <div class="my-2">
          <Link
            to={`/offers/${offer.id}`}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md"
          >
            Claim
          </Link>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Offers;
// <li key={offer.id} className="bg-white rounded-lg shadow-lg p-8">
//   <h2 className="text-2xl font-bold text-gray-800 mb-4">{offer.title}</h2>
//   <p className="text-gray-600 mb-4">{offer.description}</p>
//   <Link to={`/offers/${offer.id}`} className="text-blue-500 hover:text-blue-600">
//     View Offer
//   </Link>
// </li>
