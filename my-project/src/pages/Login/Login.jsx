import {
  LoaderCircle,
  LoaderPinwheelIcon,
  LocateFixedIcon,
} from "lucide-react";
import React from "react";

const Login = ({
  currentState,
  setCurrentState,
  handleFormSubmit,
  signin,
  setSignin,
  registerUser,
  setRegisterUser,
  userRegisterIsPending,
  loginIspending,
}) => {
  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex flex-col justify-center items-center w-full sm:max-w-96  m-auto gap-2  mt-20 mb-32 "
    >
      <div className="flex items-center justify-center gap-2">
        <p className="text-3xl">{currentState}</p>
        <hr className="bg-black w-8 h-[1.5px]" />
      </div>
      {currentState === "Login" ? (
        <>
          <input
            disabled={loginIspending}
            name="email"
            autoComplete="email"
            type="email"
            placeholder="email"
            className="border-2 w-full p-2"
            required
            value={signin.email}
            onChange={(e) => setSignin({ ...signin, email: e.target.value })}
          />
          <input
            disabled={loginIspending}
            name="password"
            autoComplete="new-password"
            type="password"
            placeholder="Password"
            className="border-2 w-full p-2"
            required
            value={signin.password}
            onChange={(e) => setSignin({ ...signin, password: e.target.value })}
          />
        </>
      ) : (
        <>
          <input
            disabled={userRegisterIsPending}
            name="name"
            autoComplete="name"
            type="text"
            placeholder="Name.."
            className="border-2 w-full p-2"
            required
            value={registerUser.name}
            onChange={(e) =>
              setRegisterUser({ ...registerUser, name: e.target.value })
            }
          />
          <input
            disabled={userRegisterIsPending}
            name="email"
            autoComplete="email"
            type="email"
            placeholder="email"
            className="border-2 w-full p-2"
            required
            value={registerUser.email}
            onChange={(e) =>
              setRegisterUser({ ...registerUser, email: e.target.value })
            }
          />
          <input
            disabled={userRegisterIsPending}
            name="password"
            autoComplete="new-password"
            type="password"
            placeholder="Password"
            className="border-2 w-full p-2"
            required
            value={registerUser.password}
            onChange={(e) =>
              setRegisterUser({ ...registerUser, password: e.target.value })
            }
          />
        </>
      )}

      <div className="flex flex-row items-center w-full justify-between">
        <p className="text-blue-700 text-sm hover:underline">
          Forgot your password?
        </p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="text-sm hover:text-gray-600"
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="text-sm hover:text-gray-600"
          >
            Login Here
          </p>
        )}
      </div>
      {userRegisterIsPending || loginIspending ? (
        <button className="bg-black text-white p-3 rounded-sm active:bg-slate-700 mt-6 w-40 flex justify-center">
          please wait... <LoaderCircle className="animate-spin ml-3" />
        </button>
      ) : (
        <button className="bg-black text-white p-3 rounded-sm active:bg-slate-700 mt-6 w-40">
          {currentState === "Login" ? "Login" : "Sign Up"}
        </button>
      )}
    </form>
  );
};

export default Login;