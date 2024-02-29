import { useState, useEffect, useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toastMessage from "../utils/toastMessage";
import { unwrapResult } from '@reduxjs/toolkit'

import Loader from "../components/Loader";
import { signUpThunk } from "../Redux/thunk/asyncThunk";



const SignUpForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading } = useSelector(
    (state) => state.auth
  );



  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

 
  const { password, email, name } = formData;

  const [confirmPass, setConfirmPass] = useState("");

  const changing = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
    if (confirmPass !== password || password === "" || confirmPass === "") {
      return toastMessage.ErrorMessage("Passwords not matched");
    }
    const userData = {
      password,
      email,
      name,
    };
    dispatch(signUpThunk(userData))
    .then(unwrapResult)
    .then((success) => {
      if (success.payload !== undefined || success.payload !== null) {
        navigate('/')
        return toastMessage.successMessage("Welcome back ")
      }
    })
    .catch((err) => {
      // handle result here
      return toastMessage.ErrorMessage(err)
    })
  }
  return (
    <div className="w-full flex  flex-col items-center">
      <div className="sm:w-420 flex-center flex-col pb-[10px]">
        <img src="/assets/images/logo.svg" alt="logo" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use snapgram, Please enter your details
        </p>
      </div>
      <form className="flex-center-center-col gap-6">
        <div className="w-full sm:w-3/5 flex flex-col items-center space-y-2">
          <label className="w-full text-start">Name</label>
          <input
            onChange={(e) => changing(e)}
            value={name}
            type="text"
            name="name"
            className=" input-HSD-style tracking-[.1em]"
          />
        </div>
        <div className="w-full  sm:w-3/5 flex flex-col items-center space-y-2">
          <label className="w-full text-start">Email</label>
          <input
            onChange={(e) => changing(e)}
            type="email"
            name="email"
            className=" input-HSD-style tracking-[.1em]"
          />
        </div>
        <div className="w-full  sm:w-3/5 flex flex-col items-center space-y-2">
          <label className="w-full text-start">Password</label>
          <input
            onChange={(e) => changing(e)}
            type="password"
            name="password"
            className=" input-HSD-style tracking-[.1em]"
          />
        </div>
        <div className="w-full  sm:w-3/5 flex flex-col items-center space-y-2">
          <label className="w-full text-start">Confirm Password</label>
          <input
            onChange={(e) => {
              setConfirmPass(e.target.value);
            }}
            type="password"
            name="confirm-password"
            className=" input-HSD-style tracking-[.1em]"
          />
        </div>
        <button
          onClick={(e) => {
            handleSubmit(e);
          }}
          type="submit"
          className="button_primary w-[250px] h-[40px] flex justify-center items-center"
        >
          {isLoading ? (
            <div className="flex-center gap-2">
              <Loader /> Loading...
            </div>
          ) : (
            "Sign Up"
          )}
        </button>
        <p className="text-small-regular text-light-2 text-center mt-2">
          Already have an account?
          <Link
            to="/log-in"
            className="text-primary-500 text-small-semibold ml-1"
          >
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
