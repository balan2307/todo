import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../Store/AuthProvider";
import { useContext } from "react";
import Cookies from "js-cookie";

const PrivateRoutes = () => {
  const auth = useContext(AuthContext);

  const isLoggedIn = auth.isLoggedIn;

  return isLoggedIn ? <Outlet /> : <Navigate to="/auth" />;
};

export default PrivateRoutes;
