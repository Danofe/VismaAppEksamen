import { React, useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext";

function Logout() {
  const [brukerNavn, setBrukerNavn] = useState("");
  const [ProfilBilde, setProfilBilde] = useState("");
  const auth = getAuth();

  const user = useUserContext();

  const goto = useNavigate();

  useEffect(() => {
    setInterval(() => {
      if (user !== null) {
        setBrukerNavn(user.user.email);
        setProfilBilde(user.user.photoURL);
      }
      console.log(user);
    }, 100);
  }, [user]);

  const behandleUt = () => {
    signOut(auth)
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

    </div>
  );
}

export default Logout;
// Alt er skrevet av: Daniel
