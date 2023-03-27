import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AppStateContext } from "../state/AppStateContext";
import fetchOffers from "../api/fetchOffers";
import ClaimButton from "./ClaimButton";

const Offers = () => {
  const { offers, authToken, offersLoaded, claimedOffers, dispatch } =
    useContext(AppStateContext);
  useEffect(() => {
    if (!offersLoaded) {
      fetchOffers(authToken, dispatch);
    }
  }, [offersLoaded, claimedOffers, authToken, dispatch]);

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
              <p>
                <strong>Target Age Range: </strong>
                {offer.target_age_min} - {offer.target_age_max}
              </p>
              <p>
                <strong>Target Gender: </strong>
                {offer.target_gender}
              </p>
            </div>
          </div>
          {console.log("Offers.js--------------<offer>", JSON.stringify(offer))}
          <ClaimButton
            offer={offer}
            claimedOffers={claimedOffers}
            dispatch={dispatch}
            authToken={authToken}
          />
        </li>
      ))}
    </ul>
  );
};

export default Offers;
