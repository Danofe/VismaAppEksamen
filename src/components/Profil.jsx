import { React, useState, useEffect } from "react";
import { useUserContext } from "../context/userContext";
import { getAuth, updatePassword, updateProfile } from "firebase/auth";
import { autentisering } from "../firebase/fireConfig";

function Profil() {
  const [brukerNavn, setBrukerNavn] = useState("");
  const [ProfilBilde, setProfilBilde] = useState("");
  const [passord, setPassord] = useState("");
  const [bekreftPassord, setBekreft] = useState("");
  const user = useUserContext();
  const [error, setError] = useState("");
  const goto = useNavigate();
  
  useEffect(() => {
    if (user) {
      setBrukerNavn(user.user.email);
      setProfilBilde(user.user.photoURL);
    }
    console.log(user);
  }, []);

  const passordValidering = () => {
    let gyldig = true;
    if (passord !== "" && bekreftPassord !== "") {
      if (passord !== bekreftPassord) {
        gyldig = false;
        setError("Skriv inn like passord!");
      }
    }
    return gyldig;
  };
  const byttPassord = (e) => {
    e.preventDefault();
    setError("");
    if (passordValidering()) {
      updatePassword(autentisering.currentUser, passord)
        .then((res) => {
          console.log(res.user);
          goto("/Profil");
        })
        .catch((err) => setError(err.message));
    }
    setPassord("");
    setBekreftPassord("");
  };

  const byttBrukernavn = (e) => {
    updateProfile(autentisering.currentUser,({
      displayName: brukerNavn
    }
    ))
    .then(() => {
      console.log("Brukernavnet ditt har blitt byttet!")
    }).catch((error) => {
      console.log("En feil har skjedd, brukernavnet ble ikke byttet.")
    })
    setBrukerNavn("");
  }

  
  return (
    <div className="min-h-screen bg-gray-100 p-0 sm:p-12 ">
      <div className="p-8 bg-white mt-40">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="grid grid-cols-3 text-center order-last md:order-first mt-25 md:mt-0"></div>
          <div className="relative">
            <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-[-10px] -mt-24 flex items-center justify-center text-gray-600">
              <div className="absolute -m-44">
                <img
                  src={`${ProfilBilde}`}
                  className="shadow-md rounded-full h-auto w-40"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[150px] text-center border-b pb-12">
          <h1 className="text-4xl font-medium text-gray-700 "></h1>
          <img
            alt={`${brukerNavn}`}
            className="text-4xl font-medium text-gray-700"
          />
          <p className=" text-gray-600 md-4 mt-3">Bruker ID</p>
          <p>{`${brukerNavn}`}</p>
          <p className="mt-8 text-gray-500">Student / Mail</p>
          <p className="mt-2 text-gray-500">Universitetet i Sør-Øst Norge</p>
        </div> 
        <div className="mt-12 flex flex-col justify-center">
          <p className="text-gray-600 text-center ">Tilleggsinformasjon</p>
        </div>
      </div>
    </div>
  );
}

export default Profil;
