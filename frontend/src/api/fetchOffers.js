const fetchOffers = async (authToken, dispatch) => {
  try {
    const response = await fetch("http://localhost:3000/api/v1/offers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    console.log("response from server: ", data);
    // on success
    dispatch({
      type: "SET_OFFERS",
      payload: {
        offers: data.offers,
      }
    });
    return { status: "success" };
  }
  catch(errors) {
    // on fail
    console.log("There was a problem with the fetchOffers operation: error: ", errors);
    // todo - set state to show error message
    // quick implementation - show alert
    alert("There was a problem with the fetchOffers operation: error: " + errors);
    return { status: "fail" };
  }
};

export default fetchOffers;