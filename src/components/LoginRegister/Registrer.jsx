//Skrevet av Oscar. Styling av komponentene er gjort av Turid og Andrea
import { autentisering } from "../../firebase/fireConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//Funksjonen for å registrere en ny bruker gjennom firebase
function Register() {
  const [epost, setEpost] = useState("");
  const [passord, setPassord] = useState("");
  const [bekreftPassord, setBekreftPassord] = useState("");
  const [error, setError] = useState("");

  const goto = useNavigate();
  //Metode for å sjekke at passord og bekreft passord har like verdier. Returner true eller false
  const passordValidering = () => {
    let gyldig = true;
    if (passord !== "" && bekreftPassord !== "") {
      if (passord !== bekreftPassord) {
        gyldig = false;
        setError("Skriv inn like passord!");
      }
    }
    return gyldig;
  };
  //Metode for å registrere via firebase
  const registrering = (e) => {
    e.preventDefault();
    setError("");
    if (passordValidering()) {
      createUserWithEmailAndPassword(autentisering, epost, passord)
        .then((res) => {
          goto("/login");
        })
        .catch((err) => setError(err.message));
    }
    //Setter verdiene tilbake til blank
    setEpost("");
    setPassord("");
    setBekreftPassord("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-0 sm:p-12">
      <div className="fixed border-x-5 box-border w-[1000px] container mx-[250px]">
        <div className="auth">
          {/* For å vise error melding */}
          {error && <div className="auth__error">{error}</div>}
          <div className="flex bg-white shadow-lg border justify-center rounded-[10px] px-2 my-12">
            <div className="w-full lg:w-11/12 flex">
              <div>
                <div className="">
                  <h1 className="pt-6 mb-3 text-2xl text-center font-bold">
                    Heisann!
                  </h1>
                  <p className="text-center mb-3">
                    Gira på å skape nye avtaler!?
                  </p>
                  <img
                    className="w-[420px] h-[450px] rounded-[25px]"
                    src="https://media.tenor.com/bIWKGrYb0FIAAAAC/crazy-dance-funny-dance.gif"
                    alt="HTML5 Icon"
                  />
                </div>
              </div>
              <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                <h3 className="pt-6 mb-3 text-3xl text-center font-bold">
                  Lag en bruker!
                </h3>
                <p className="text-center">Registrer deg her!</p>
                {/* Form med inputs, som submitter på knappen under, og bruker metoden registrering på submit */}
                <form
                  onSubmit={registrering}
                  name="registration_form"
                  className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                >
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="email"
                    ></label>
                    <input
                      className=" w-full rounded-b bg-[#eee] mx-0 my-2 px-[15px] py-3 border-[none]"
                      id="email"
                      type="email"
                      value={epost}
                      required
                      placeholder="Email"
                      onChange={(e) => setEpost(e.target.value)}
                    />
                  </div>

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
                      placeholder="Bekreft passord"
                      value={bekreftPassord}
                      required
                      onChange={(e) => setBekreftPassord(e.target.value)}
                    />
                  </div>

                  <div className="mb-6 text-center">
                    <button
                      type="submit"
                      className="w-[200px] bg-red-500 hover:bg-red-400 py-4 font-bold text-white rounded-lg focus:outline-none "
                    >
                      Registrer
                    </button>
                  </div>
                  <hr className="mb-6 border-t" />

                  <div className="text-center">
                    <a
                      className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                      href="/Login"
                    >
                      Har du allerede en bruker? Logg inn!
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

export default Register;
