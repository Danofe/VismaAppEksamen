import { React, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext";
import { autentisering } from "../../firebase/fireConfig";

function Logout() {
  const [brukerNavn, setBrukerNavn] = useState("");
  const [ProfilBilde, setProfilBilde] = useState("");

  const user = useUserContext();

  const goto = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      if (user !== null) {
        setBrukerNavn(user.user.email);
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
    <div className="p-3 w-64 flex flex-col rounded-md bg-home-100 hover:shadow-lg duration-200 overflow-hidden hover:scale-105">
      <Link to="/Profil">
        <div className="flex xl:flex-row flex-col items-center font-medium tracking-wide text-white pb-2 mb-2 xl:border-b border-gray-200 border-opacity-75 duration-300 w-full">
          <img
            src={`${ProfilBilde}`}
            alt={`${brukerNavn}`}
            className="w-7 h-7 mr-2 rounded-full"
          />
          {brukerNavn}
        </div>
      </Link>
      <div className="flex items-center w-full">
        <div className=" text-sm py-1 px-2 leading-none tracking-wide bg-home-200 text-white font-semibold rounded-md">
          Admin
        </div>
        <button
          className="ml-auto text-sm bg-home-200 text-white font-bold py-1 px-3 rounded hover:shadow-md duration-200 hover:scale-110"
          onClick={behandleUt}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Logout;
// Alt er skrevet av: Daniel
