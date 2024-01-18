import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";

import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {

  // const navigate=useNavigate();


  const [isLoggedIn, setIsLoggedIn] = useState(
    Cookies.get("loggedInUser") != undefined ? true : false
  );
  const [loggedInUser, setLoggedInUser] = useState(Cookies.get("loggedInUser"));

  function login(email) {
    setIsLoggedIn(true);
    setLoggedInUser(email);
  }

  function logout() {
    console.log("logout ");
    Cookies.remove("loggedInUser");
    setLoggedInUser("");
    setIsLoggedIn(false);
    // navigate("/auth");
  }

  function displayToast(type, message) {
    if (type == "success") {
      toast.success(message);
    } else if (type == "error") {
      toast.error(message);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        loggedInUser,
        setLoggedInUser,
        login,
        logout,
        displayToast,
      }}
    >
      <Toaster position="top-center"></Toaster>
      {children}
    </AuthContext.Provider>
  );
}
