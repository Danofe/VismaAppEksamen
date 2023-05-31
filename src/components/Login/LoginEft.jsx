import { React } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { autentisering } from "../../firebase/fireConfig";

function Logout() {
  const goto = useNavigate();

  const behandleUt = () => {
    signOut(autentisering)
      .then(() => {
        console.log("Sign-out successful.");
        goto("/Login");
      })
      .catch((error) => {
        error("An error happened.");
      });
  };

  return (
    <div>
      <button
        className="ml-auto text-xl bg-gray-600 text-white font-bold py-1 px-3 rounded hover:shadow-md hover:bg-rose-600 duration-200 hover:scale-110"
        onClick={behandleUt}
      >
        Logg ut
      </button>
    </div>
  );
}

export default Logout;
