import React from "react";
import { useState } from "react";
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { useUserContext } from "../../context/userContext";

function EndrePass() {
  const [passord, setPassord] = useState("");
  const [nyttPassord, setNyttPassord] = useState("");
  const [bekreftPassord, setBekreftPassord] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const user = useUserContext();

  const passordValidering = () => {
    let gyldig = true;
    if (nyttPassord !== "" && bekreftPassord !== "") {
      if (nyttPassord !== bekreftPassord) {
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
      const credential = EmailAuthProvider.credential(user.user.email, passord);
      reauthenticateWithCredential(credential).then(() => {
        console.log("auth funker" + credential);
      });
      updatePassword(user.user, nyttPassord)
        .then(() => {
          setSuccess(true);
          console.log("Brukeren har blitt logget inn");
        })
        .catch((error) => {
          console.log("Brukeren ble ikke logget inn");
        });
    }
    console.log(user.user.email);
    setPassord("");
    setNyttPassord("");
    setBekreftPassord("");
  };

  return (
    <div className="min-h-screen  bg-gray-100 p-0  sm:p-12 flex justify-center">
      <div className="relative top-14  left-0 right-0 text-center p-0  sm:p-10">
        {error && <div className="auth__error">{error}</div>}
        <div className=" box-border w-[300px] container mx-[300px]">
          <div
            name="registration_form"
            className=" px-8 pt-6 pb-8 mb-4 bg-white rounded"
          >
            <div>
              <div className="flex justify-center items-center">
                <h1 className="text-2xl font-bold mb-8">Bytt passord</h1>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="password"
                  ></label>
                </div>
              </div>

              <div>
                <input
                  className=" w- rounded-b bg-[#eee] mx-0 my-2 px-[15px] py-3 border-[none]"
                  id="password"
                  type="password"
                  placeholder="Passord"
                  value={passord}
                  required
                  onChange={(e) => setPassord(e.target.value)}
                />
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="password"
                ></label>
              </div>

              <input
                className=" w- rounded-b bg-[#eee] mx-0 my-2 px-[15px] py-3 border-[none]"
                id="password"
                type="password"
                placeholder="Nytt passord"
                value={nyttPassord}
                required
                onChange={(e) => setNyttPassord(e.target.value)}
              />

              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="password"
                ></label>
                <input
                  className=" w- rounded-b bg-[#eee] mx-0 mb-3 my-2 px-[15px] py-3 border-[none]"
                  id="password"
                  type="password"
                  placeholder="Bekreft nytt passord"
                  value={bekreftPassord}
                  required
                  onChange={(e) => setBekreftPassord(e.target.value)}
                />
              </div>

              <button
                type="submit"
                onClick={byttPassord}
                className="w-[150px]  py-3 mt-3  text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-red-500 hover:bg-red-400 hover:shadow-lg focus:outline-none"
              >
                Bytt passord
              </button>

              {success && <h1>Passordet har blitt endret!</h1>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EndrePass;
