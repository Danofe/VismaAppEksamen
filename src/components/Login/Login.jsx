import { React } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";
import axios from "axios";

function Login() {
  const { instance } = useMsal();

  const behandleInn = () => {
    instance.loginPopup({
      ...loginRequest,
    });
  };

  return (
    <>
      <div className="">
        <button
          className="bg-home-100 hover:shadow-md focus:outline-none text-white font-bold py-2 px-8 rounded duration-200 ease-in-out hover:scale-110"
          onClick={behandleInn}
        >
          Login
        </button>
      </div>
    </>
  );
}

export default Login;
// Alt er skrevet av: Daniel
