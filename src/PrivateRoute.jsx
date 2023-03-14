import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const loginInfo = useSelector((state) => state.loginData);

  return loginInfo.email !== "" && loginInfo.password !== "" ? (
    <>{children}</>
  ) : (
    <Navigate to='/' />
  );
};
export default PrivateRoute;
