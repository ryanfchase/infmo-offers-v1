const signupUser = async (
  { username, firstName, lastName, birthdate, gender, password },
  dispatch
) => {
  try {
    const response = await fetch("http://localhost:3000/api/v1/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          user_name: username,
          first_name: firstName,
          last_name: lastName,
          birthdate: birthdate,
          gender: gender,
          password: password,
        },
      }),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    // signup successful
    dispatch({
      type: "LOGIN",
      payload: {
        authToken: response.headers.get("Authorization").split(" ")[1],
        user: {
          username: data.user.user_name,
          firstName: data.user.first_name,
          lastName: data.user.last_name,
          birthdate: data.user.birthdate,
          gender: data.user.gender,
        },
      },
    });
    return { status: "success" };
  } catch (error) {
    console.log(
      "There was a problem with the signup operation: error: ",
      error
    );
    // todo - set state to show error message
    // quick implementation - show alert
    alert("There was a problem with the signup operation: error: " + error);
    dispatch({ type: "LOGOUT" })
    return { status: "fail" };
  }
};

export default signupUser;
