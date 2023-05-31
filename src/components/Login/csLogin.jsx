// Alt er skrevet av: Daniel
import { React, useState } from "react";
import Login from "./Login";
import Logout from "./LoginEft";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function LoginButton() {
  const [login, setlogin] = useState(false);

  const auth = getAuth();

  // Sjekker om bruker er logget inn eller ikke for å vise riktig knapp
  onAuthStateChanged(auth, (user) => {
    if (user !== null) {
      setlogin(true);
    } else {
      setlogin(false);
    }
  });
  // Returnerer knapp for å logge inn eller ut vis login er true eller false
  return <div className="">{login ? <Logout /> : <Login />}</div>;
}

export default LoginButton;
