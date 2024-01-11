import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Cookies.get("loggedInUser") != undefined ? true : false
  );
  const [loggedInUser, setLoggedInUser] = useState(Cookies.get("loggedInUser"));
  const [toastMessage, setToastMessage] = useState("");

  function login(email) {
    setIsLoggedIn(true);
    setLoggedInUser(email);
  }

  function logout() {
    console.log("logout ");
    Cookies.remove("loggedInUser");
    setLoggedInUser("");
    setIsLoggedIn(false);
  }

  const notify = (msg) => toast(msg);

  function displayToast(type ,message){

    if(type=="success"){

   
      toast.success(message)

    }
    else if(type=="error"){

      toast.error(message)

      


    }
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, loggedInUser, setLoggedInUser, login, logout ,displayToast}}
    >
      <Toaster position="top-center"></Toaster>
      {children}
    </AuthContext.Provider>
  );
}
