import React from 'react'
import { useState } from "react";
import { autentisering } from "../../firebase/fireConfig";
import { updatePassword, getAuth, EmailAuthCredential, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { useUserContext } from '../../context/userContext';

function EndrePass() {
  
    const [passord,setPassord] = useState("");
    const [nyttPassord,setNyttPassord] = useState("");
    const [bekreftPassord, setBekreftPassord] = useState("");
    const [error, setError] = useState("");
    const [melding, setMelding] = useState("");
    const [success, setSuccess] = useState(false);
    const user = useUserContext();
    const auth = getAuth();
    
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
          const credential = EmailAuthProvider.credential(
            user.user.email,
            passord
        ); 
          reauthenticateWithCredential(credential).then(() =>{
            console.log("auth funker"+credential)
          }) ;
          updatePassword(user.user, nyttPassord)
           .then(() => {
              //console.log(user.user);
              setSuccess(true);
              console.log("Passordet har blitt endret")
            })
            .catch((error) => {
              console.log("En feil har skjedd")
            }); 
          
        }
        console.log("sen logg")
        console.log(user.user.email)
        setPassord("");
        setNyttPassord("");
        setBekreftPassord("");
        
      };

  return (
    <div className="h-screen w-screen ">
        <form 
            onSubmit={byttPassord}
            name="registration_form"
            className="px-8 pt-6 pb-8 mb-4 bg-white rounded">

            <div className="flex justify-center items-center">
                <h1 className="text-2xl font-bold mb-8">Bytt passord</h1>
                <div className="mb-4">

                <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="password"
                    ></label>
                    <input
                      className=" w-full rounded-b bg-[#eee] mx-0 my-2 px-[15px] py-3 border-[none]"
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
                    <input
                      className=" w-full rounded-b bg-[#eee] mx-0 my-2 px-[15px] py-3 border-[none]"
                      id="password"
                      type="password"
                      placeholder="Nytt passord"
                      value={nyttPassord}
                      required
                      onChange={(e) => setNyttPassord(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="password"
                    ></label>
                    <input
                      className=" w-full rounded-b bg-[#eee] mx-0 mb-3 my-2 px-[15px] py-3 border-[none]"
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
                      className="w-[200px] bg-red-500 hover:bg-red-400 py-4 font-bold text-white rounded-lg focus:outline-none "
                    >
                      Bytt passord
                    </button>
                    {success && (
                    <h1>Passordet har blitt endret!</h1>
                    )}
                </div>
            </form>
            
        </div>
  )
}

export default EndrePass