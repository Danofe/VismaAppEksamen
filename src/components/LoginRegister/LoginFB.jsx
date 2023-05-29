import {
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence,
} from "firebase/auth";
import { useState } from "react";
import { autentisering } from "../../firebase/fireConfig";
import { useNavigate } from "react-router-dom";

function LoginFB() {
  const [epost, setEpost] = useState("");
  const [passord, setPassord] = useState("");
  const [error, setError] = useState("");
  const goto = useNavigate();

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
    <div className="min-h-screen bg-gray-100 p-0  sm:p-12">
      <div className="flex-shrink-0 text-white ml-3 p-6 mr-7 hover:scale-110 duration-300">
        <div className="font-semibold text-xl tracking-tight">
          <div className="type-logo text-4xl tracking-normal font-bold hover:tracking-wide duration-200"></div>
        </div>
      </div>

      <div className="fixed border-x-5 box-border w-[1000px] container mx-[250px]">
        <div className="auth">
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
                      href="http://localhost:3000/Registrer"
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
