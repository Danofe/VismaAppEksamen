import { autentisering } from "../../firebase/fireConfig";
import { updateProfile} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext";

function ByttNavn() {
  const [navn, setNavn] = useState("");
  const user = useUserContext();
  const goto = useNavigate();
  
    //console.log(user.user.displayName)


  const byttBrukernavn = (e) => {
    updateProfile(user.user, {
        displayName: navn
      }).then(() => {
        console.log("Fikset")
      }).catch((error) => {
        console.log("Funket ikke")
      });
  }

  return (
    <div className="h-screen w-screen ">
        <form 
            onSubmit={byttBrukernavn}
            name="registration_form"
            className="px-8 pt-6 pb-8 mb-4 bg-white rounded">

            <div className="flex justify-center items-center">
                <h1 className="text-2xl font-bold mb-8">Skriv et nytt brukernavn</h1>
                <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="password"
                    ></label>
                    <input
                      className=" w-full rounded-b bg-[#eee] mx-0 my-2 px-[15px] py-3 border-[none]"
                      id="password"
                      type="text"
                      placeholder="Brukernavn"
                      value={navn}
                      required
                      onChange={(e) => setNavn(e.target.value)}
                    />
                  </div>
                  <button
                      type="submit"
                      className="w-[200px] bg-red-500 hover:bg-red-400 py-4 font-bold text-white rounded-lg focus:outline-none "
                    >
                      Bytt navn
                    </button>
                    
                </div>
            </form>
            
        </div>
  );
}

export default ByttNavn;