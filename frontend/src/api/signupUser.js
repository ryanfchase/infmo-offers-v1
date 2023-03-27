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
    console.log("response from server: ", data);
    console.log("headers: ", ...response.headers)
    console.log("auth headers: ", response.headers.get("Authorization"));

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
          gender: data.user.gender
        }
      },
    })
  } catch (error) {
    // signup failed
    // ...
    console.log(
      "There was a problem with the signup operation: error: ",
      error
    );
  }
};

export default signupUser;