import { React, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
import { autentisering } from "../../firebase/fireConfig";

function Logout() {
  const [brukerNavn, setBrukerNavn] = useState("");
  const [ProfilBilde, setProfilBilde] = useState("");
  const auth = getAuth();

  const user = useUserContext();

  const goto = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      if (user !== null) {
        setBrukerNavn(user.user.displayName);
        setProfilBilde(user.user.photoURL);
      }
      console.log(user);
    }, 100);
  }, [user]);

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
