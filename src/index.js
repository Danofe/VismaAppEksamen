import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { msalConfig } from "./authConfig";
import { MsalProvider } from "@azure/msal-react";

const csa = new PublicClientApplication(msalConfig);

csa.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS) {
    csa.setActiveAccount(event.payload.account);
  }
});

ReactDOM.render(
  <React.StrictMode>
    <MsalProvider instance={csa}>
      <App />
    </MsalProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
