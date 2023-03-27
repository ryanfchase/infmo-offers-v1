import { useForm } from "react-hook-form";
import FormEntry from "./FormEntry";
import { differenceInCalendarYears } from "date-fns";

const SignupFormV1 = () => {
  const signupUser = async ({
    userName,
    firstName,
    lastName,
    birthdate,
    gender,
    password,
  }) => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/signup", {
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
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      console.log("response from server: ", data);
    } catch (error) {
      console.log(
        "There was a problem with the signup operation: error: ",
        error
      );
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const genderSelections = [
    {
      name: "noselect",
      label: "Please select one",
    },
    {
      name: "female",
      label: "female",
    },
    {
      name: "male",
      label: "male",
    },
    {
      name: "nonbinary",
      label: "non-binary",
    },
    {
      name: "other",
      label: "prefer not to say",
    },
  ];
  const registerOptions = {
    userName: {
      required: "Username is required",
      minLength: {
        value: 4,
        message: "Username must be at least 4 characters long.",
      },
      maxLength: {
        value: 20,
        message: "Username must be at most 20 characters long.",
      },
      pattern: {
        value: /^[A-Za-z0-9_-]+$/i,
        message: "Only letters, numbers, hyphens, and underscore are allowed.",
      },
    },
    firstName: {
      required: "First name is required",
      maxLength: 60,
      pattern: {
        value: /^[A-Za-z]+$/i,
        message: "Only letters are allowed.",
      },
    },
    lastName: {
      required: "Last name is required",
      maxLength: 60,
      pattern: {
        value: /^[A-Za-z]+$/i,
        message: "Only letters are allowed.",
      },
    },
    birthdate: {
      valueAsDate: true,
      required: "Birthdate is required",
      validate: (v) =>
        differenceInCalendarYears(new Date(), v) >= 18 ||
        "You must be at least 18 years old to sign up.",
      map: (v) => v.toISOString(),
    },
    gender: {
      required: true,
      defaultValue: "",
      validate: (v) => {
        return (
          v !== "noselect" || "You must pick one of the available options."
        );
      },
    },
    password: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must be at least 8 characters long.",
      },
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
      },
    },
    passwordConfirmation: {
      required: "Password confirmation is required",
      validate: (v) => {
        const password = watch("password");
        return password === v || "Passwords do not match.";
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Sign Up</h1>

      <form onSubmit={handleSubmit(signupUser)}>
        <FormEntry
          register={register}
          label="Username"
          name="userName"
          options={registerOptions.userName}
          error={errors.userName}
        />
        <FormEntry
          register={register}
          label="First name"
          name="firstName"
          options={registerOptions.firstName}
          error={errors.firstName}
        />
        <FormEntry
          register={register}
          label="Last name"
          name="lastName"
          options={registerOptions.lastName}
          error={errors.lastName}
        />

        <FormEntry
          register={register}
          label="Birthdate"
          name="birthdate"
          type="date"
          options={registerOptions.birthdate}
          error={errors.birthdate}
        />

        <FormEntry
          register={register}
          label="Gender"
          name="gender"
          selections={genderSelections}
          options={registerOptions.gender}
          error={errors.gender}
        />

        <FormEntry
          register={register}
          label="Password"
          name="password"
          type="password"
          options={registerOptions.password}
          error={errors.password}
        />

        <FormEntry
          register={register}
          label="Password confirmation"
          name="passwordConfirmation"
          type="password"
          options={registerOptions.passwordConfirmation}
          error={errors.passwordConfirmation}
        />
        <div className="flex items-center justify-between">
          <input
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md btn-sm"
            type="submit"
          ></input>
        </div>
      </form>
    </div>
  );
};

export default SignupFormV1;
