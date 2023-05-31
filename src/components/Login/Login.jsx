import React from "react";
import { useNavigate } from "react-router";

function Login() {
  const goto = useNavigate();

  const behandlein = () => {
    goto("/Login");
  };

  return (
    <div>
      <div>
        <button
          className="ml-auto text-xl bg-gray-600 text-white font-bold py-1 px-3 rounded hover:shadow-md hover:bg-rose-600 duration-200 hover:scale-110"
          onClick={behandlein}
        >
          Logg inn
        </button>
      </div>
    </div>
  );
}

export default Login;
// Alt er skrevet av: Daniel
