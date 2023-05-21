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
      <div className="p-13">
        <div className="p-8 bg-white mt-40">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="grid grid-cols-3 text-center order-last md:order-first mt-25 md:mt-0">
            </div>
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
            <p className=" text-gray-600 mt-3">Bruker ID</p>
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
