//Skrevet av Oscar og Daniel. Styling av komponentene er gjort av Turid og Andrea
//imports
import {
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence,
} from "firebase/auth";
import { useState } from "react";
import { autentisering } from "../../firebase/fireConfig";
import { useNavigate } from "react-router-dom";
//Hele funksjonen for å logge inn via firebase
function LoginFB() {
  const [epost, setEpost] = useState("");
  const [passord, setPassord] = useState("");
  const [error, setError] = useState("");
  const goto = useNavigate();

  //Metode fra firebase for å logge inn basert på input feltene, og lagre login session, for så å sette feltene tilbake til ingen verdi
  const loginFirebase = (e) => {
    e.preventDefault();
    setError("");
    setPersistence(autentisering, browserSessionPersistence);
    signInWithEmailAndPassword(autentisering, epost, passord)
      .then((UserCredential) => {
        console.log(UserCredential);
        goto("/");
      })
      .catch((err) => setError(err.message));
    setEpost("");
    setPassord("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-0 sm:p-12 flex justify-center">
      <div className="fixed border-x-5 box-border w-[1000px] container mx-[250px]">
        <div className="auth">
          {/* For å vise error melding */}
          {error && <div className="auth__error">{error}</div>}
          <div className="flex bg-white shadow-lg border justify-center rounded-[10px] px-12 my-12">
            <div className="w-full  lg:w-11/12 flex">
              <div>
                <div className="">
                  <h1 className="pt-4 p-[10px] my-16 mb-3 text-4xl text-center font-bold"></h1>
                  <p className="text-center mb-6"></p>
                  <img
                    className="w-[420px] h-[350px] rounded-[25px]"
                    src="https://cdn.dribbble.com/users/6554494/screenshots/14937796/media/678312aa763e54740bfb2cb7186a12bb.gif"
                    alt="HTML5 Icon"
                  />
                </div>
              </div>
              <div className="w-full lg:w-7/12 bg-white p-[20px] rounded-lg lg:rounded-l-none">
                <h3 className="pt-16 mb-2 text-4xl text-center font-bold">
                  Velkommen
                </h3>
                <p className="text-center">Logg inn</p>
                {/* Form som bruker loginFirebase (metode for å logge inn), submit blir gjort på button lengre nede */}
                <form
                  onSubmit={loginFirebase}
                  name="login_form"
                  className="px-8 pt-1 pb-2 mb-4 bg-white rounded"
                >
                  <div className="mb-4">
                    <label
                      className="block mb-10 text-sm font-bold text-gray-700"
                      htmlFor="email"
                    ></label>
                    {/* Input felt som bruker epost,setEpost useState for å oppdatere verdien */}
                    <input
                      className=" w-full rounded-b bg-[#eee] mx-0 my-2 px-[15px] py-3 border-[none]"
                      type="email"
                      value={epost}
                      id="email"
                      placeholder="Email"
                      required
                      onChange={(e) => setEpost(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="password"
                    ></label>
                    {/* Input felt som bruker passord, setPassord useState for å oppdatere verdien */}
                    <input
                      className=" w-full mb-6 rounded-b bg-[#eee] mx-0 my-2 px-[15px] py-3 border-[none]"
                      type="password"
                      value={passord}
                      id="password"
                      placeholder="Passord"
                      onChange={(e) => setPassord(e.target.value)}
                    />
                  </div>

                  <div className="mb-6 text-center">
                    {/* Knapp som kjører submit i formen over, og gjør slik at loginFirebase blir kjørt */}
                    <button
                      type="submit"
                      className="w-[200px] mb-4 bg-red-500 hover:bg-red-400 py-4 font-bold text-white rounded-lg focus:outline-none "
                    >
                      Logg inn
                    </button>
                  </div>
                  <hr className="mb-6 border-t" />
                  <div className="text-center">
                    <a
                      className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                      href="/Registrer"
                    >
                      Har du ikke bruker? Registrer deg her!
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginFB;
