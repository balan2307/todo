import { createContext, useState ,useEffect } from "react";
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(Cookies.get("loggedInUser")!=undefined ? true : false);


  useEffect(()=>{
    login()

  },[])

  function login() {


    // const user=Cookies.get("loggedInUser")

    // console.log("cookie ",user)
    // if(user!=undefined) {
    //   console.log("mark true")
      setIsLoggedIn(true);
    //   console.log("mark login")

    // }
    // else setIsLoggedIn(false)
  }

  function logout() {


    console.log("logout ")
    Cookies.remove('loggedInUser');
    setIsLoggedIn(false);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
