const claimOffer = async (authToken, offer, dispatch) => {
  console.log("claimOfferAPI: ------------- offer", JSON.stringify(offer))
  try {
    const response = await fetch(`http://localhost:3000/api/v1/offers/${offer.id}/claim`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    console.log("response from server: ", data);
    // on success
    dispatch({
      type: "CLAIM_OFFER",
      payload: {
        offer: data.offer,
      }
    });
    return { status: "success" };
  }
  catch(errors) {
    // on fail
    console.log("There was a problem with the claimOffer operation: error: ", errors);
    // todo - set state to show error message
    // quick implementation - show alert
    alert("There was a problem with the claimOffer operation: error: " + errors);
    return { status: "fail" };
  }
}
export default claimOffer;