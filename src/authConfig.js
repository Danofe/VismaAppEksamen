import { useContext, useEffect } from "react";
import { useAuthContext } from "./authContext";

//Hook for å få tak i authentication config dataen fra context.
export const useAuthConfigData = () => {
  const { authConfigData } = useAuthContext();
  return authConfigData;
};

//skrevet av Daniel
export const msalConfig = {
  auth: {
    clientId: "63ff6245-38e3-4eba-82ee-35504d8f0983",
    authority: "https://login.microsoftonline.com/common",
    redirectUri: "http://localhost:3000/",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: [
    "User.Read",
    "openid",
    "offline_access",
    "profile",
    "Calendars.ReadWrite",
    "Contacts.Read",
  ],
};

export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
  clientSecret: "fed17fb9-c62e-4944-a4ab-d7858e7d47f4",
  tenantId: "fac82b5d-ba5f-4225-aaa3-5348b463b4f3",
};

//skrevet av Sindre
//Funksjon for å sette authentication config data
export const setAuthConfigData = (authConfigData) => {
  msalConfig.auth.authority = authConfigData.tenantId
    ? `https://login.microsoftonline.com/${authConfigData.tenantId}`
    : "";
  graphConfig.clientSecret = authConfigData.clientSecret || "";
  graphConfig.tenantId = authConfigData.tenantId || "";
};

//Hook for å oppdatere authentication konfigurasjon NÅR context data endres.
export const useAuthConfig = () => {
  const { authConfigData } = useAuthContext();

  useEffect(() => {
    setAuthConfigData(authConfigData);
  }, [authConfigData]);

  return { msalConfig, loginRequest, graphConfig };
};
