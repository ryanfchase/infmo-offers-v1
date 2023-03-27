import { useForm } from "react-hook-form";
import FormEntry from "./FormEntry";

const LoginForm = () => {
  const loginUser = async ({userName, password}) => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            user_name: userName,
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
        "There was a problem with the login operation: error: ",
        error
      );
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const registerOptions = {
    userName: {
      required: "Username is required",
    },
    password: {
      required: "Password is required",
    }

  }

  return (
      <div className="bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Log In</h1>

      <form onSubmit={handleSubmit(loginUser)}>
        <FormEntry
          register={register}
          label="Username"
          name="userName"
          options={registerOptions.userName}
          error={errors.userName}
        />

        <FormEntry
          register={register}
          label="Password"
          name="password"
          type="password"
          options={registerOptions.password}
          error={errors.password}
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

export default LoginForm;