export const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_AZURE_TENANT_ID,
    authority: "https://login.microsoftonline.com/common",
    redirectUri: "https://visma.herokuapp.com/",
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
};
//Alt er skrevet av Daniel
