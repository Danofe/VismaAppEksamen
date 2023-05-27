import {
  onAuthStateChanged,
  browserSessionPersistence,
  setPersistence,
} from "firebase/auth";
import { createContext, useContext } from "react";
import { autentisering } from "../firebase/fireConfig";
import { useEffect, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState();

  setPersistence(autentisering, browserSessionPersistence);

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

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
