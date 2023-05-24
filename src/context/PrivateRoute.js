import { React } from "react";
import { useUserContext } from "./userContext";

import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { user } = useUserContext();

  if (user === null) {
    return <Navigate to="/Loginpage" />;
  }
  return children;
};
