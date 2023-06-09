const logoutUser = async (
  authToken,
  dispatch
) => {
  try {
    const response = await fetch("http://localhost:3000/api/v1/logout", {
      method: "DELETE",
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
    dispatch({ type: "LOGOUT" });
    return { status: "success" };
  } catch (error) {
    // on fail
    console.log(
      "There was a problem with the logout operation: error: ",
      error
    );
    // todo - set state to show error message
    // quick implementation - show alert
    alert("There was a problem with the logout operation: error: " + error);
    return { status: "fail" };
  }
};

export default logoutUser;
