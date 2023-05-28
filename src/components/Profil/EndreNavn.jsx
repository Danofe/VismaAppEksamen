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
    <div className="min-h-screen  bg-gray-100 p-0  sm:p-12">
      <div className="relative top-14  left-0 right-0 text-center p-0  sm:p-10">
            <div className="box-border w-[350px] h-) container mx-[300px]">
        
        <div
            onSubmit={byttBrukernavn}
            name="registration_form"
            className="px-8 pt-6 pb-8 mt-10 mb-4 bg-white rounded">
              <div>
            <div className="flex justify-center items-center">
                <h1 className="text-2xl font-bold mb-8">Skriv et nytt brukernavn</h1>
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
                  
                  
                  <button
                      type="submit "
                      className="w-[150px]  py-3 mt-5  text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-red-500 hover:bg-red-400 hover:shadow-lg focus:outline-none"
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