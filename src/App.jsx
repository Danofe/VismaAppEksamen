//Skrevet av Daniel

//Importer komponenter og andre imports
import Kalender from "./components/Kalender";
import VerifyApplication from "./components/VerifyApplication";
import Home from "./components/Home";
import Profil from "./components/Profil";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/LoginRegister/Registrer";
import LoginFB from "./components/LoginRegister/LoginFB";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/authContext";
import { UserProvider } from "./context/userContext";
import { useState } from "react";
import { PrivateRoute } from "./context/PrivateRoute";

import { useMsalAuthentication, useMsal } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import { loginRequest } from "./authConfig";
import EndrePass from "./components/Profil/EndrePass";
import ByttNavn from "./components/Profil/EndreNavn";

//App funksjonen
function App() {
  //Azure login funksjon
  useMsalAuthentication(InteractionType.Redirect, loginRequest);

  //State hook for Azure brukernavn
  const [Azure, setAzure] = useState("");

  //Render funksjon for Azure brukernavn
  function Render() {
    //Henter brukernavn fra Azure
    const { accounts } = useMsal();
    try {
      const username = accounts[0].username;
      console.log(username);

      //Setter brukernavn i state hook
      setAzure(username);
    } catch (e) {
      console.log(e);
    }
  }

  //Kjører render funksjonen vis en account er logget inn i msal
  if (Azure !== "")
    return (
      //Provider for contexter
      <AuthProvider>
        <UserProvider>
          {/* Browser router for routing i appen */}
          <BrowserRouter>
            <Navbar />
            {/* Routes for routing i appen */}
            <Routes>
              {/* Route for login og register og en for auth for azure kobling/RedirectURI */}
              <Route path="/Registrer" element={<Register />} />
              <Route path="/Login" element={<LoginFB />} />
              <Route path="/auth" element={""} />

              {/* Private routes for alle andre sider slik at ikke logget inn bruker kan komme inn. bruker PrivateRoute*/}
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
        {/* Render funksjonen kjøres vis bruker ikke er logget inn / mens siden kobles mot redirect*/}
        {Render()}
        <div>please wait...</div>{" "}
      </>
    );
}

export default App;
// Alt er skrevet av: Daniel
