import React, { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../authContext";
import { dbConfig} from "../firebase/fireConfig";
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
    <form onSubmit={handleSubmit}>
      <div className="mb-5">
        <label htmlFor="name" className="font-bold mb-2 block text-white">
          Name:{" "}
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full p-2 border border-gray-400 rounded-lg"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="applicationId"
          className="font-bold mb-2 block text-white"
        >
          Application ID:{" "}
        </label>
        <input
          type="text"
          id="applicationId"
          value={applicationId}
          onChange={(event) => setApplicationId(event.target.value)}
          className="w-full p-2 border border-gray-400 rounded-lg"
        />
      </div>
      <div className="mb-5">
        <label htmlFor="tenantId" className="font-bold mb-2 block text-white">
          Tenant ID:{" "}
        </label>
        <input
          type="text"
          id="tenantId"
          value={tenantId}
          onChange={(event) => setTenantId(event.target.value)}
          className="w-full p-2 border border-gray-400 rounded-lg"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="clientSecret"
          className="font-bold mb-2 block text-white"
        >
          Client Secret:{" "}
        </label>
        <input
          type="password"
          id="clientSecret"
          value={clientSecret}
          onChange={(event) => setClientSecret(event.target.value)}
          className="w-full p-2 border border-gray-400 rounded-lg"
        />
      </div>
      <input
        type="submit"
        value="Verify"
        className="bg-home-200 hover:scale-105 hover:shadow-md duration-100 rounded-md focus:outline-none text-white font-bold py-2 px-8 cursor-pointer"
      />
      {errorMessage && <p className="text-red-500 mt-3">{errorMessage}</p>}
    </form>
  );
};

export default VerifyApplication;
