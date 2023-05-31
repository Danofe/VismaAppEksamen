import { React, useState, useEffect } from "react";
import { useUserContext } from "../context/userContext";

function Profil() {
  const [brukerNavn, setBrukerNavn] = useState("");
  const [ProfilBilde, setProfilBilde] = useState("");
  const user = useUserContext();

  setTimeout(() => {
    if (user !== null) {
      if (user.user.displayName !== null) {
        setBrukerNavn(user.user.displayName);
        setProfilBilde(user.user.photoURL);
      } else {
        setBrukerNavn("Ingen brukernavn");
        setProfilBilde("");
      }
    }
  }, 100);

  return (
    <div className="min-h-screen bg-gray-100  p-0 sm:p-12 flex justify-center ">
      <div className=" bg-white mt-40 fixed border-x-5 box-border w-[900px] container mx-[250px]">
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
        <div className="mt-9 mb-9  justify-center">
          <div className="text-center">
            <a
              className="font-2xl inline-block  text-blue-500  hover:text-blue-800"
              href="/EndrePassord"
            >
              Endre passord
            </a>
            <div></div>
            <a
              className="font-2xl inline-block text-blue-500  hover:text-blue-800"
              href="/EndreBrukernavn"
            >
              Endre brukernavn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profil;
