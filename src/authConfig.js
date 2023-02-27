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
};
//Alt er skrevet av Daniel
