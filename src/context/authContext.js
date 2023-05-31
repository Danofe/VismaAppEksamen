//Skrevet av Sindre
import { createContext, useContext, useState } from "react";

//lager authentication context
const AuthContext = createContext();

//hook for å aksessere authentication contexten
export const useAuthContext = () => {
  return useContext(AuthContext);
};

//Authentication provider komponent for å lagre tenant ID, Client Secret og ApplikasjonsID
export const AuthProvider = ({ children }) => {
  const [tenantId, setTenantId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [applicationId, setApplicationId] = useState("");

  //Funksjon for å oppdatere authentication konfigurasjonen
  const updateAuthConfig = (newTenantId, newClientSecret, newApplicationId) => {
    setTenantId(newTenantId);
    setClientSecret(newClientSecret);
    setApplicationId(newApplicationId);
  };
  //Skaffer authentication context for children komponentene
  return (
    <AuthContext.Provider
      value={{
        tenantId,
        clientSecret,
        applicationId,
        updateAuthConfig,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
