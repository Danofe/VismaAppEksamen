import Kalender from "./components/Kalender";
import Home from "./components/Home";
import Profil from "./components/Profil";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  MsalProvider,
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage/LoginPage";

function App({ msalInstance }) {
  return (
    <MsalProvider instance={msalInstance}>
      <BrowserRouter>
        <AuthenticatedTemplate>
          <Navbar />
          <Routes>
            <Route path="/auth" element={""} />
            <Route path="/" element={<Home />} />
            <Route path="/Kalender" element={<Kalender />} />
            <Route path="/Profil" element={<Profil />} />
            <Route path="*" element={<h1>404</h1>} />
          </Routes>
          <Footer />
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <Routes>
            <Route path="/auth" element={""} />
            <Route path="/" element={""} />
            <Route path="/Kalender" element={""} />
            <Route path="/Profil" element={""} />
            <Route path="/logout" element={""} />
            <Route path="*" element={<h1>404</h1>} />
          </Routes>
          <LoginPage />
        </UnauthenticatedTemplate>
      </BrowserRouter>
    </MsalProvider>
  );
}

export default App;
// Alt er skrevet av: Daniel
