import { createContext, useState, useEffect } from "react";
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(Cookies.get("loggedInUser") != undefined ? true : false);
  const [loggedInUser, setLoggedInUser] = useState(Cookies.get("loggedInUser"))


  // useEffect(() => {
  //   login()

  // }, [])

  function login(email) {

    setIsLoggedIn(true);
    setLoggedInUser(email);

  }

  function logout() {


    console.log("logout ")
    Cookies.remove('loggedInUser');
    setLoggedInUser("")
    setIsLoggedIn(false);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, loggedInUser,setLoggedInUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
