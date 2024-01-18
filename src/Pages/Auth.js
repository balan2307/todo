import React, { useEffect } from "react";
import Input from "../Components/Input";
import { useState, useReducer } from "react";
import WarningHeader from "../Components/WarningHeader";
import { AuthContext } from "../Store/AuthProvider";
import { useContext } from "react";

import { useNavigate } from "react-router-dom";
import { intializeDB, registerUser, loginUser } from "../utils/initDb";
import Cookies from "js-cookie";
import loginImage from "../login.jpg";

import formReducer from "../utils/AuthReducer";
import { initialState } from "../utils/AuthReducer";


function Auth() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const [isLoginPage, setLoginPage] = useState(true);

  const auth = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const { isEmailValid, isPasswordValid } = state;

    dispatch({
      type: "SET_VALIDITY",
      field: "isFormValid",
      value: isEmailValid && isPasswordValid,
    });
  }, [state.isEmailValid, state.isPasswordValid]);

  useEffect(() => {
    intializeDB();
  }, []);

  async function handleSubmit() {
    console.log("handle llogin ", state);

    if (isLoginPage) {
      let user = "";
      try {
        user = await loginUser(state.email);

        if (state.password == user.password) {
          console.log("login sucess");

          Cookies.set("loggedInUser", state.email, { expires: 1 * 1000 });

          auth.login(state.email);

          navigate("/");
        } else {
          auth.displayToast("error", "Invalid email id or password");
        }
      } catch (e) {
        auth.displayToast("error", "Invalid email id or password");

        console.log("error ", e);
      }
      // console.log("login ", user.password, state.password);
    } else {
      registerUser(state.email, state.password);
      console.log("register page");
      togglePage();
    }
  }

  function handleChange(field, value) {
    // console.log("check filed ",field,value)

    dispatch({ type: "SET_FIELD", field, value });

    switch (field) {
      case "email":
        dispatch({
          type: "SET_VALIDITY",
          field: "isEmailValid",
          value: /\S+@\S+\.\S+/.test(value),
        });
        break;
      case "password":
        dispatch({
          type: "SET_VALIDITY",
          field: "isPasswordValid",
          value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
            value
          ),
        });
        break;
    }

    // console.log("check ", state);
  }

  function handleBlur(field) {
    console.log("blur");

    dispatch({ type: "SET_BLUR", field });
  }

  function togglePage() {
    dispatch({ type: "RESET" });
    console.log("toggle page ");
    setLoginPage((prev) => !prev);
  }

  return (
    <div
      className=" w-[100%] h-[100vh] border
    flex justify-center items-start bg-[#ececf4]"
    >
      <div className="mt-16 flex  justify-center">
        <img src={loginImage} className="hidden md:flex w-[25%]"></img>

        <div
          className="  bg-[white] p-10 flex flex-col 
      gap-4 "
        >
          <p className="font-bold text-center text-2xl">
            {isLoginPage ? "Login" : "Signup"}
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className=" p-4 flex flex-col gap-4"
          >
            <Input
              setInput={handleChange}
              setBlur={handleBlur}
              type="email"
              label="Email"
              value={state.email}
            ></Input>
            {state.email?.trim() == "" && state.touched.email && (
              <WarningHeader message="Email cannot be empty"></WarningHeader>
            )}
            {state.email?.trim() != "" &&
              !state.isEmailValid &&
              state.touched.email && (
                <WarningHeader message="Enter a valid email"></WarningHeader>
              )}

            <Input
              setInput={handleChange}
              setBlur={handleBlur}
              type="password"
              label="Password"
              value={state.password}
            ></Input>
            {state.password?.trim() == "" && state.touched.password && (
              <WarningHeader message="Password cannot be empty"></WarningHeader>
            )}
            {state.password?.trim() != "" &&
              !state.isPasswordValid &&
              state.touched.password && (
                <WarningHeader message="Enter a valid password"></WarningHeader>
              )}

            <div className="flex flex-col  gap-2 justify-center">
              <button
                className={`${
                  !state.isFormValid ? "btn-disabled" : ""
                } text-white bg-green-500 px-2 py-1 rounded-lg font-semibold 
           `}
                onClick={() => handleSubmit()}
              >
                {isLoginPage ? "Login" : "Register"}
              </button>

              <button
                onMouseDown={(e) => e.preventDefault()}
                onMouseUp={togglePage}
                className="text-white bg-blue-500 px-2 py-1 rounded-lg font-semibold"
              >
                {isLoginPage
                  ? "Dont have an account ?"
                  : "Already have an account ?"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Auth;
