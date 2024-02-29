import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { unwrapResult } from "@reduxjs/toolkit";
import toastMessage from "../utils/toastMessage";
import { logInThunk } from "../Redux/thunk/asyncThunk";

const LoginFrom = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLogInLoading } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState({ email: "", password: "" });

  const changing = (event) => {
    setUserData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logInThunk(userData))
      .then(unwrapResult)
      .then((success) => { 
        if (success?.payload !== undefined || success?.payload !== null) {
          navigate("/");
          return toastMessage.successMessage("Welcome back ");
        }
      })
      .catch((err) => {
        // handle result here
        return toastMessage.ErrorMessage(err);
      });
  };

  return (
    <div className="w-full flex  flex-col items-center">
      <div className="sm:w-420 flex-center flex-col pb-[10px]">
        <img src="/assets/images/logo.svg" alt="logo" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Log in to Your Account
        </h2>

        <p className="text-light-3 small-medium md:base-regular mt-2">
          Welcome back ! Please enter your details
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex-center-center-col gap-6">
        <div className="w-full  sm:w-3/5 flex flex-col items-center space-y-2">
          <label className="w-full text-start">Email</label>
          <input
            onChange={(e) => changing(e)}
            type="text"
            name="email"
            className="input-HSD-style tracking-[.1em]"
          />
        </div>

        <div className="w-full  sm:w-3/5 flex flex-col items-center space-y-2">
          <label className="w-full text-start">Password</label>
          <input
            onChange={(e) => changing(e)}
            type="password"
            name="password"
            className="input-HSD-style tracking-[.15em]"
          />
        </div>

        <button
          type="submit"
          className="button_primary w-[250px] h-[40px] flex justify-center items-center"
        >
          {isLogInLoading ? (
            <div className="flex-center gap-2">
              <Loader /> Loading...
            </div>
          ) : (
            "Log in"
          )}
        </button>

        <p className="text-small-regular text-light-2 text-center mt-2">
          create a new account?
          <Link
            to="/sign-up"
            className="text-primary-500 text-small-semibold ml-1"
          >
            sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginFrom;
