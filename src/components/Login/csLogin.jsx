import { React, useState } from "react";
import Login from "./Login";
import Logout from "./LoginEft";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useUserContext } from "../../context/userContext";

function LoginButton() {
  const [login, setlogin] = useState(false);

  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setlogin(true);
    } else {
      setlogin(false);
    }
  });

  return <div className="">{login ? <Logout /> : <Login />}</div>;
}

export default LoginButton;
// Alt er skrevet av: Daniel
