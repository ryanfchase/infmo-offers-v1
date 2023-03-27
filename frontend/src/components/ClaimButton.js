import claimOffer from "../api/claimOffer";

const ClaimButton = ({ claimedOffers, offer, authToken, dispatch }) => {
  console.log("ClaimButton: ", JSON.stringify(claimedOffers));
  return (
    <div className="my-2">
      {claimedOffers &&
      (claimedOffers.length > 0) &&
        claimedOffers.map((claimed) => claimed.id).includes(offer.id) ? (
        <div>
          <div class="inline-block bg-gray-300 text-gray-500 font-bold py-2 px-4 rounded-md opacity-50 cursor-not-allowed">
            Claimed
          </div>
        </div>
      ) : (
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md"
          onClick={() => {
            alert(`Claimed Offer Success! Title: ${offer.description}`);
            claimOffer(authToken, offer, dispatch);
          }}
        >
          Claim
        </button>
      )}
    </div>
  );
};

export default ClaimButton;
