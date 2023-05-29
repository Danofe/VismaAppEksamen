import Kalender from "./components/Kalender";
import VerifyApplication from "./components/VerifyApplication";
import Home from "./components/Home";
import Profil from "./components/Profil";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/LoginRegister/Registrer";
import LoginFB from "./components/LoginRegister/LoginFB";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage/LoginPage";
import { AuthProvider } from "./context/authContext";
import { UserProvider } from "./context/userContext";
import { useState } from "react";
import { PrivateRoute } from "./context/PrivateRoute";

import { useMsalAuthentication, useMsal } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import { loginRequest } from "./authConfig";
import EndrePass from "./components/Profil/EndrePass";
import ByttNavn from "./components/Profil/EndreNavn";

function App() {
  useMsalAuthentication(InteractionType.Redirect, loginRequest);

  const [Azure, setAzure] = useState("");

  function Render() {
    const { accounts } = useMsal();

    try {
      const username = accounts[0].username;
      console.log(username);
      setAzure(username);
    } catch (e) {
      console.log(e);
    }
  }

  if (Azure !== "")
    return (
      <AuthProvider>
        <UserProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/LoginPage" element={<LoginPage />} />
              <Route path="/Registrer" element={<Register />} />
              <Route path="/Login" element={<LoginFB />} />
              <Route path="/auth" element={""} />

              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />

              <Route
                path="/Kalender"
                element={
                  <PrivateRoute>
                    <Kalender />
                  </PrivateRoute>
                }
              />
              <Route
                path="/verify-application"
                element={
                  <PrivateRoute>
                    <VerifyApplication />
                  </PrivateRoute>
                }
              />
              <Route
                path="/Profil"
                element={
                  <PrivateRoute>
                    <Profil />
                  </PrivateRoute>
                }
              />
              <Route
                path="/EndrePassord"
                element={
                  <PrivateRoute>
                    <EndrePass />
                  </PrivateRoute>
                }
              />
              <Route
                path="/EndreBrukernavn"
                element={
                  <PrivateRoute>
                    <ByttNavn />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<h1>404</h1>} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </UserProvider>
      </AuthProvider>
    );
  else
    return (
      <>
        {Render()}
        <div>please wait...</div>{" "}
      </>
    );
}

export default App;
// Alt er skrevet av: Daniel
