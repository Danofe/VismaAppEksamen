//Skrevet av Daniel
import {
  onAuthStateChanged,
  browserSessionPersistence,
  setPersistence,
} from "firebase/auth";
import { createContext, useContext } from "react";
import { autentisering } from "../firebase/fireConfig";
import { useEffect, useState } from "react";

//lager user context
const UserContext = createContext();

//hook for å aksessere user contexten
export function UserProvider({ children }) {
  const [user, setUser] = useState();

  //Setter session persistence til browser session
  setPersistence(autentisering, browserSessionPersistence);

  //Sjekker om bruker er logget inn
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(autentisering, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unSubscribe();
  }, []);

  //Skaffer user context for children komponentene
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}

//Hook for å aksessere user contexten
export function useUserContext() {
  return useContext(UserContext);
}
