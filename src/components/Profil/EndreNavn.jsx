import { updateProfile } from "firebase/auth";
import { useState } from "react";
import { useUserContext } from "../../context/userContext";

//Funksjon for å bytte navn, updateProfile er en firebase funksjon.
//diverse console logs for våres skyld, så vi kan se om det funker
//setSucess endrer på useStaten, og når sucess er true, vil melding om at navnet har blitt byttet dukke opp
function ByttNavn() {
  const [navn, setNavn] = useState("");
  const [success, setSucess] = useState(false);
  const user = useUserContext();

  const byttBrukernavn = (e) => {
    setNavn(e.target.value);
    updateProfile(user.user, {
      displayName: navn,
    })
      .then(() => {
        setSucess(true);
      })
      .catch(() => {
        console.log("Funket ikke");
      });
  };

  return (
    <div className="min-h-screen  bg-gray-100 p-0  sm:p-12 flex justify-center">
      <div className="relative top-14  left-0 right-0 text-center p-0  sm:p-10">
        <div className="box-border w-[350px] h-) container mx-[300px]">
          {/* Form for inputs og som kjører byttBrukernavn på submit, som er knappen under  */}
          <div
            onSubmit={byttBrukernavn}
            name="registration_form"
            className="px-8 pt-6 pb-8 mt-10 mb-4 bg-white rounded"
          >
            <div>
              <div className="flex justify-center items-center">
                <h1 className="text-2xl font-bold mb-8">
                  Skriv et nytt brukernavn
                </h1>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="password"
                  ></label>
                </div>
              </div>

              <div>
                <input
                  className=" w-full rounded-b bg-[#eee] mx-0 my-2 px-[15px] py-3 border-[none]"
                  id="password"
                  type="text"
                  placeholder="Brukernavn"
                  value={navn}
                  required
                  onChange={(e) => setNavn(e.target.value)}
                />
                {success && <h1>Brukernavn har blitt endret!</h1>}

                <button
                  type="submit "
                  onClick={byttBrukernavn}
                  className="w-[150px] py-3 mt-5 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-red-500 hover:bg-red-400 hover:shadow-lg focus:outline-none"
                >
                  Bytt navn
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ByttNavn;
