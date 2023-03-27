const loginUser = async ({ username, password }, dispatch) => {
  try {
    const response = await fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          user_name: username,
          password: password,
        },
      }),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    console.log("response from server: ", data);
    // on success
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
          // todo - send eligible offers
        }
      },
    });
  } catch (error) {
    // on fail

    console.log("There was a problem with the login operation: error: ", error);
  }
};

export default loginUser;