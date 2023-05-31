//Skrevet av Daniel
import { React } from "react";
import { useUserContext } from "./userContext";

import { Navigate } from "react-router-dom";

//PrivateRoute som sjekker om bruker er logget inn
//vis bruker er logget inn render children komponentene
export const PrivateRoute = ({ children }) => {
  const { user } = useUserContext();

  if (user === null) {
    return <Navigate to="/Login" />;
  }
  return children;
};
