import React, { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/authContext";
import { dbConfig } from "../firebase/fireConfig";
import { addDoc } from "firebase/firestore";
//Skrevet av Sindre
//State hooks for form inputs og en for error meldinger
const VerifyApplication = () => {
  const [name, setName] = useState("");
  const [applicationId, setApplicationId] = useState("");
  const [tenantId, setTenantId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const { updateAuthConfig } = useAuthContext();
  const [errorMessage, setErrorMessage] = useState("");

  //submit handler for formen
  const handleSubmit = async (e) => {
    e.preventDefault();
    addDoc(dbConfig, {
      Name: name,
      ApplicationID: applicationId,
      Clientsecret: clientSecret,
      TenantID: tenantId,
    });

    // sjekker om noen felter er tomme
    if (!name || !tenantId || !clientSecret || !applicationId) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    try {
      // Får tak i access token fra backend server
      const tokenResponse = await axios.post(
        "http://localhost:4000/api/getToken",
        {
          tenantId,
          applicationId,
          clientSecret,
        }
      );

      //Deretter, send token til /api/verify routen
      const response = await axios.post("http://localhost:4000/api/verify", {
        token: tokenResponse.data.token,
      });

      //Hvis verification er suksessful, så oppdaterer authentication konfigurasjonen seg.
      if (response.data.message === "Verification successful!") {
        updateAuthConfig(tenantId, clientSecret, applicationId);
      } else {
        console.error("Invalid tenantId, clientSecret, name, or applicationId");
        setErrorMessage(
          "Invalid name, tenant ID, client secret, or application ID."
        );
      }
    } catch (error) {
      console.error("Error verifying application:", error);
      setErrorMessage("Error verifying application.");
    }
  };

  return (
    <div>
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n  .-z-1 {\n    z-index: -1;\n  }\n\n  .origin-0 {\n    transform-origin: 0%;\n  }\n\n  input:focus ~ label,\n  input:not(:placeholder-shown) ~ label,\n  textarea:focus ~ label,\n  textarea:not(:placeholder-shown) ~ label,\n  select:focus ~ label,\n  select:not([value='']):valid ~ label {\n    /* @apply transform; scale-75; -translate-y-6; */\n    --tw-translate-x: 0;\n    --tw-translate-y: 0;\n    --tw-rotate: 0;\n    --tw-skew-x: 0;\n    --tw-skew-y: 0;\n    transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate))\n      skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n    --tw-scale-x: 0.75;\n    --tw-scale-y: 0.75;\n    --tw-translate-y: -1.5rem;\n  }\n\n  input:focus ~ label,\n  select:focus ~ label {\n    /* @apply text-black; left-0; */\n    --tw-text-opacity: 1;\n    color: rgba(0, 0, 0, var(--tw-text-opacity));\n    left: 0px;\n  }\n",
        }}
      />

      <div className="min-h-screen bg-gray-100 p-0 sm:p-12">
        <h1 className="py-3 text-black text-center font-bold text-4xl pt-8 bg-gray-100">
          Auntentisering
        </h1>

        <div className="mx-auto max-w-md px-6 py-12 bg-white border-0 shadow-lg sm:rounded-3xl">
          <h1 className="text-2xl font-bold mb-8">Autentiser bruker</h1>

          <form onSubmit={handleSubmit}>
            <div className="relative z-0 w-full mb-5">
              <input
                type="text"
                name="name"
                placeholder=" "
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
              <label
                htmlFor="name"
                className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
              >
                Brukernavn
              </label>
            </div>

            <div className="relative z-0 w-full mb-5">
              <input
                type="text"
                id="applicationId"
                placeholder=" "
                value={applicationId}
                onChange={(event) => setApplicationId(event.target.value)}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
              <label
                htmlFor="applicationId"
                className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
              >
                Application ID
              </label>
            </div>

            <div className="relative z-0 w-full mb-5">
              <input
                type="text"
                name="name"
                placeholder=" "
                required
                value={tenantId}
                onChange={(event) => setTenantId(event.target.value)}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
              <label
                htmlFor="tenantId"
                className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
              >
                Tenant ID
              </label>
            </div>

            <div className="relative z-0 w-full mb-5">
              <input
                type="password"
                name="name"
                id="clientSecret"
                placeholder=" "
                required
                value={clientSecret}
                onChange={(event) => setClientSecret(event.target.value)}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
              <label
                htmlFor="clientSecret"
                className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
              >
                Passord/Client Secret
              </label>
              <span className="text-sm text-red-600 hidden" id="error">
                Påkrevd
              </span>
            </div>

            <div className="flex ">
              <input
                id="button"
                type="submit"
                value="Legg til"
                className="w-[150px] py-3 mt-4 mr-2 mb-2 float-right text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-red-500 hover:bg-red-400 hover:shadow-lg focus:outline-none"
              />
              <p className="text-red-500 mt-3">{errorMessage}</p>

              <input
                id="button"
                type="submit"
                value="Test"
                className="w-[150px] py-3 mt-4 mr-2 mb-2 float-left text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-red-500 hover:bg-red-400 hover:shadow-lg focus:outline-none"
              />
              <p className="text-red-500 mt-3">{errorMessage}</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyApplication;
