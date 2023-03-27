const logoutUser = async (
  { authToken, userName, userID, isLoggedIn },
  dispatch
) => {
  try {
    const response = await fetch("http://localhost:3000/api/v1/logout", {
      method: "DELETE",
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
    dispatch({ type: "LOGOUT" });

  } catch (error) {
    // on fail
    console.log(
      "There was a problem with the logout operation: error: ",
      error
    );
  }
};

export default logoutUser;