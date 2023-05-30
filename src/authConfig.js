import { useContext, useEffect } from "react";
import { useAuthContext } from "./context/authContext";

//Hook for å få tak i authentication config dataen fra context.
export const useAuthConfigData = () => {
  const { authConfigData } = useAuthContext();
  return authConfigData;
};

//skrevet av Daniel
export const msalConfig = {
  auth: {
    clientId: process.env.CLIENT_ID,
    authority: process.env.AUTHORITY_ID,
    redirectUri: process.env.REDIRECT_URI,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: [
    "User.Read",
    "User.Read.All",
    "People.Read.All",
    "Organization.Read.All",
    "Calendars.ReadWrite",
    "Calendars.ReadWrite.Shared",
    "Directory.ReadWrite.All",
    "Application.ReadWrite.All",
    "User.ReadWrite.All",
  ],
};

export const graphConfig = {
  graphMeEndpoint: process.env.GRAPH_ME_ID,
  clientSecret: process.env.CLIENT_SECRET,
  tenantId: process.env.TENANT_ID,
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
