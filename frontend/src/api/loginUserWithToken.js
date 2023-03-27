const loginUserWithToken = async (authToken, dispatch) => {
  try {
    const response = await fetch("http://localhost:3000/api/v1/login", {
      method: "GET",
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
    const payload = {
      authToken: authToken,
      user: {
        username: data.user.user_name,
        firstName: data.user.first_name,
        lastName: data.user.last_name,
        birthdate: data.user.birthdate,
        gender: data.user.gender,
      },
    };
    dispatch({
      type: "LOGIN",
      payload: payload,
    });

    return payload.user;

  } catch (error) {
    // on fail
    console.log("There was a problem with the login operation: error: ", error);

    // todo - set state to show error message
    // quick implementation - show alert
    alert("There was a problem with the login operation: error: " + error);
  }
};

export default loginUserWithToken;
