import { React } from "react";
import { useIsAuthenticated } from "@azure/msal-react";
import Login from "./Login";
import Logout from "./LoginEft";

function LoginButton() {
  const bruker = useIsAuthenticated();

  return <div className="">{bruker ? <Logout /> : <Login />}</div>;
}

export default LoginButton;
// Alt er skrevet av: Daniel
