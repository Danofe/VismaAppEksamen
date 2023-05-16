import { React, useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import axios from "axios";
import { Buffer } from "buffer";

window.Buffer = window.Buffer || require("buffer").Buffer;

function Profil() {
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

  return (
    <div className=" pt-28">
      <div className="flex justify-center items-center h-full">
        <div className="flex flex-col items-center bg-home-100 w-3/5 rounded-md shadow-md">
          <div className="text-4xl font-bold text-white pt-10"></div>
          <div className="text-xl font-bold p-5 text-white">
            Navn: {brukerNavn}
          </div>
          <div className="w-full px-4 flex justify-center">
            <div className="absolute -m-44">
              <img
                src={`${ProfilBilde}`}
                alt={`${brukerNavn}`}
                className="shadow-md rounded-full h-auto w-32"
              />
            </div>
          </div>
        </div>
      </div>
      ;
    </div>
  );
}

export default Profil;
// Alt er skrevet av: Daniel
