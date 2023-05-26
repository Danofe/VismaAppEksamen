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

  return (
    <>
      <div className="flex">
        <div className="m-2">
          <button
            className="bg-home-100 hover:shadow-md focus:outline-none text-white font-bold py-2 px-8 rounded duration-200 ease-in-out hover:scale-110"
            onClick={behandleInn}
          >
            Login
          </button>
        </div>
        <div className="m-2">
          <button
            className="bg-home-100 hover:shadow-md focus:outline-none text-white font-bold py-2 px-8 rounded duration-200 ease-in-out hover:scale-110"
            onClick={behandleinnRegistrer}
          >
            Registrer
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
// Alt er skrevet av: Daniel
