import { React } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const goto = useNavigate();

  const behandleInn = () => {
    goto("/Login");
  };

  const behandleinnRegistrer = () => {
    goto("/Registrer");
  };

  return <div></div>;
}

export default Login;
