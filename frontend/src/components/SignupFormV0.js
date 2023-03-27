import React, { useState } from "react";

const SignupFormV0 = () => {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("userName", userName);

    /* DOESNT VALIDATE PASSWORD */

    fetch("http://localhost:3000/api/v1/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          user_name: userName,
          first_name: firstName,
          last_name: lastName,
          birthdate: birthdate,
          gender: gender,
          password: password,
        },
      }),
    });
  };

  return (
    <form onSubmit={handleSubmit} id="sign-up-form">
      <input
        type="text"
        id="my-user-name"
        name="userName"
        value={userName}
        placeholder="User Name"
        onChange={(event) => setUserName(event.target.value)}
      />
      <input
        type="text"
        id="my-first-name"
        name="firstName"
        placeholder="First Name"
        onChange={(event) => setFirstName(event.target.value)}
      />
      <input
        type="text"
        id="my-last-name"
        name="lastName"
        placeholder="Last Name"
        onChange={(event) => setLastName(event.target.value)}
      />
      <input
        type="date"
        id="my-birthdate"
        name="birthdate"
        placeholder="Birthdate"
        onChange={(event) => setBirthdate(event.target.value)}
      />
      <select id="my-gender" name="gender" onChange={(event) => setGender(event.target.value)}>
        <option value="">Choose a gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="nonbinary">Nonbinary</option>
        <option value="prefer not to say">Prefer not to say</option>
      </select>
      <input
        type="password"
        id="my-password"
        name="password"
        placeholder="Password"
        onChange={(event) => setPassword(event.target.value)}
      />
      <input
        type="password"
        id="my-password-confirm"
        name="passwordConfirmation"
        placeholder="Confirm Password"
        onChange={(event) => setPasswordConfirmation(event.target.value)}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupFormV0;