//Skrevet av Daniel
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { msalConfig } from "./authConfig";
import { MsalProvider } from "@azure/msal-react";

//Oppretter en PublicClientApplication med msalConfig
const csa = new PublicClientApplication(msalConfig);

//Setter active account til den brukeren som er logget inn
csa.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS) {
    csa.setActiveAccount(event.payload.account);
  }
});

//Render react appen med MsalProvider som wrapper
ReactDOM.render(
  <React.StrictMode>
    <MsalProvider instance={csa}>
      <App />
    </MsalProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
