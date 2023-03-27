import { useForm } from "react-hook-form";
import { differenceInCalendarYears } from "date-fns";

const SignupFormV1 = () => {
  const signupUser = ({
    userName,
    firstName,
    lastName,
    birthdate,
    gender,
    password,
  }) => {
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
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

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
      map: (v) => v.toISOString()
    },
    gender: {
      validate: (v) => v !== "noselect" || "Please choose one",
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
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(signupUser)}>
      <label className="form-label">Username</label>
      <input
        id="user-name"
        {...register("userName", registerOptions.userName)}
      />
      <div className="invalid-feedback">{errors.userName?.message}</div>
      <label className="form-label">First name</label>
      <input
        id="first-name"
        {...register("firstName", registerOptions.firstName)}
      />
      <div className="invalid-feedback">{errors.firstName?.message}</div>
      <label className="form-label">Last name</label>
      <input
        id="last-name"
        {...register("lastName", registerOptions.lastName)}
      />
      <div className="invalid-feedback">{errors.lastName?.message}</div>
      <label className="form-label">Date of Birth</label>
      <input
        id="birthdate"
        type="date"
        {...register("birthdate", registerOptions.birthdate)}
      />
      <div className="invalid-feedback">{errors.birthdate?.message}</div>
      <label className="form-label">Gender</label>
      <select {...register("gender", registerOptions.gender)}>
        <option value="noselect">select one</option>
        <option value="female">female</option>
        <option value="male">male</option>
        <option value="other">nonbinary</option>
        <option value="nopref">prefer not to say</option>
      </select>
      <div className="invalid-feedback">{errors.gender?.message}</div>

      <label className="form-label">Password</label>
      <input
        id="password"
        type="password"
        {...register("password", registerOptions.password)}
      />
      <div className="invalid-feedback">{errors.password?.message}</div>
      <label className="form-label">Password Confirm</label>
      <input
        id="password-confirmation"
        type="password"
        {...register(
          "passwordConfirmation",
          registerOptions.passwordConfirmation
        )}
      />
      <div className="invalid-feedback">
        {errors.passwordConfirmation?.message}
      </div>
      <input type="submit" />
    </form>
  );
};

export default SignupFormV1;
