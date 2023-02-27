import { React, useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import axios from "axios";
import { Buffer } from "buffer";
import { Link } from "react-router-dom";
window.Buffer = window.Buffer || require("buffer").Buffer;

function Logout() {
  const { instance } = useMsal();

  const [brukerNavn, setBrukerNavn] = useState("");
  const [ProfilBilde, setProfilBilde] = useState("");

  useEffect(() => {
    const aktivbruker = instance.getActiveAccount();

    if (aktivbruker) {
      setBrukerNavn(aktivbruker.name);

      const ProfilBilde = async () => {
        const endpoint = "https://graph.microsoft.com/v1.0/me/photo/$value";

        const accessToken = await instance.acquireTokenSilent({
          scopes: ["https://graph.microsoft.com/.default"],
        });

        const res = await axios(endpoint, {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`,
          },
          responseType: "arraybuffer",
        });
        const bilde = Buffer.from(res.data, "binary").toString("base64");
        setProfilBilde("data:image/jpeg;base64, " + bilde);
      };
      ProfilBilde();
    }
  }, [instance]);

  const behandleUt = () => {
    instance.logout();
  };

  return (
    <div className="p-3 w-64 flex flex-col rounded-md bg-home-100 hover:shadow-lg duration-200 overflow-hidden hover:scale-105">
      <Link to="/Profil">
        <div className="flex xl:flex-row flex-col items-center font-medium tracking-wide text-white pb-2 mb-2 xl:border-b border-gray-200 border-opacity-75 duration-300 w-full">
          <img
            src={`${ProfilBilde}`}
            alt={`${brukerNavn}`}
            className="w-7 h-7 mr-2 rounded-full"
          />
          {brukerNavn}
        </div>
      </Link>
      <div className="flex items-center w-full">
        <div className=" text-sm py-1 px-2 leading-none tracking-wide bg-home-200 text-white font-semibold rounded-md">
          Admin
        </div>
        <button
          className="ml-auto text-sm bg-home-200 text-white font-bold py-1 px-3 rounded hover:shadow-md duration-200 hover:scale-110"
          onClick={behandleUt}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Logout;
// Alt er skrevet av: Daniel
