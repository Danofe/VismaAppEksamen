import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { msalConfig } from "./authConfig";

const csa = new PublicClientApplication(msalConfig);

csa.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS) {
    csa.setActiveAccount(event.payload.account);
  }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App msalInstance={csa} />
  </React.StrictMode>
);
// Alt er skrevet av: Daniel
