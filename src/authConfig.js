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
    clientId: "05f3d861-7a5c-4050-9160-c4aa4929579e",
    authority: "https://login.microsoftonline.com/29232608-3af2-4b48-bdd4-60a438bb5d2d",
    redirectUri: "http://localhost:3000/",
  },cache: {
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
    clientSecret: "d1489943-0f86-476a-8a06-679764bd25e6",
    tenantId: "29232608-3af2-4b48-bdd4-60a438bb5d2d",
    };

    //skrevet av Sindre
    //Funksjon for å sette authentication config data
    export const setAuthConfigData = (authConfigData) => {
    msalConfig.auth.authority = authConfigData.tenantId
    ?`https://login.microsoftonline.com/${authConfigData.tenantId}`
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