import Kalender from "./components/Kalender";
import VerifyApplication from "./components/VerifyApplication";
import Home from "./components/Home";
import Profil from "./components/Profil";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/LoginRegister/Registrer";
import LoginFB from "./components/LoginRegister/LoginFB";
import {
  MsalProvider,
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage/LoginPage";
import { AuthProvider } from "./authContext";
import { useAuthValue } from "./components/LoginRegister/brukerContext";
import { autentisering } from "./firebase/fireConfig";
import { onAuthStateChanged } from "firebase/auth";

function App({ msalInstance }) {

  useEffect(() => {
    onAuthStateChanged(autentisering, (user) => {
      setCurrentUser(user)
     })
  }, [])

  return (
    <MsalProvider instance={msalInstance}>
      <AuthProvider> {/* "wrapper" hele appen med AppContextProvider */}
      <FirebaseAuth value={{currentUser}}>
        <BrowserRouter>
          <AuthenticatedTemplate>
            <Navbar />
            <Routes>
            <Route path="/Registrer" element={<Register/>}/>
              <Route path="/LoginFB" element={<LoginFB/>}/>
              <Route path="/auth" element={""} />
              <Route path="/" element={<Home />} />
              <Route path="/Kalender" element={<Kalender />} />
              <Route
                path="/verify-application"
                element={<VerifyApplication />}
              />
              <Route path="/Profil" element={<Profil />} />
              <Route path="*" element={<h1>404</h1>} />
            </Routes>
            <Footer />
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
            <Routes>
              <Route path="/" element={""} />
              <Route path="/Kalender" element={""} />
              <Route path="/Profil" element={""} />
              <Route path="/verify-application" element={""} />
              <Route path="*" element={<h1>404</h1>} />
              <Route path="/auth" element={""} />
            </Routes>
            <LoginPage />
          </UnauthenticatedTemplate>
        </BrowserRouter>
        </FirebaseAuth>
      </AuthProvider> {/* slutt på  AppContextProvider */}
    </MsalProvider>
  );
}

export default App;
// Alt er skrevet av: Daniel
