import React, { useState, useEffect } from "react";
import axios from "axios";
import { useMsal } from "@azure/msal-react";
import { addDoc } from "firebase/firestore";
import { dbcol } from "../firebase/fireConfig";

function Kalender() {
  const { instance, accounts } = useMsal();
  const [formData, setFormData] = useState({
    title: "",
    startTime: "",
    endTime: "",
    location: "",
    application: "",
    recipient: "",
  });
  const [success, setSuccess] = useState(false);
  const [applications, setApplications] = useState([]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    addDoc(dbcol, {
      title: formData.title,
      startTime: formData.startTime,
      endTime: formData.endTime,
      location: formData.location,
      application: formData.application,
      recipient: formData.recipient,
    });

    const accessToken = await instance.acquireTokenSilent({
      account: accounts[0],
      scopes: ["https://graph.microsoft.com/.default"],
    });

    try {
      const response = await axios.post(
        `https://graph.microsoft.com/v1.0/me/events`,
        {
          subject: formData.title,
          start: {
            dateTime: formData.startTime,
            timeZone: "UTC",
          },
          end: {
            dateTime: formData.endTime,
            timeZone: "UTC",
          },
          location: {
            displayName: formData.location,
          },
          attendees: formData.attendees.map((attendee) => ({
            emailAddress: {
              address: attendee.email, //formData.recipient ??
            },
            type: "required",
          })),
          body: {
            contentType: "HTML",
            content: formData.description,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getApplications = async () => {
      const accessToken = await instance.acquireTokenSilent({
        account: accounts[0],
        scopes: ["https://graph.microsoft.com/.default"],
      });

      try {
        const response = await axios.get(
          "https://graph.microsoft.com/v1.0/applications?$filter=signInAudience eq 'AzureADandPersonalMicrosoftAccount'",
          {
            headers: {
              Authorization: `Bearer ${accessToken.accessToken}`,
            },
          }
        );

        setApplications(response.data.value);
      } catch (error) {
        console.error(error);
      }
    };

    getApplications();
  }, []);

  return (
    <div
      className="w-2/5 mx-auto mt-neg-400 mb-20 p-10 bg-home-100 shadow-md relative rounded-md z-10"
      style={{ top: "-145px", eft: "10%" }}
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="title" className="font-bold mb-2 block text-white">
            Tittel:{" "}
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-5">
          <label className="font-bold mb-2 block text-white">
            Start Møte:{" "}
          </label>
          <input
            type={"datetime-local"}
            id="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="w-full p-2 border border-gray-400 rounded-lg"
          />
        </div>
        <div className="mb-5">
          <label className="font-bold mb-2 block text-white">
            Slutt møte:{" "}
          </label>
          <input
            type={"datetime-local"}
            id="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className="w-full p-2 border border-gray-400 rounded-lg"
          />
        </div>
        <div className="mb-5">
          <label className="font-bold mb-2 block text-white">Sted: </label>
          <input
            type="text"
            id="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border border-gray-400 rounded-lg"
          />
        </div>
        <div className="mb-5">
          <label className="font-bold mb-2 block text-white">
            Verifisert applikasjon:{" "}
          </label>
          <select
            id="application"
            value={formData.application}
            onChange={handleChange}
            className="w-full p-2 border border-gray-400 rounded-lg"
          >
            <option value="">Velg en applikasjon</option>
            {applications.map((app) => (
              <option key={app.appId} value={app.appId}>
                {app.displayName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-5">
          <label className="font-bold mb-2 block text-white">Mottaker: </label>
          <input
            type="email"
            id="recipient"
            value={formData.recipient}
            onChange={handleChange}
            className="w-full p-2 border border-gray-400 rounded-lg"
            autoComplete="off"
          />
        </div>
        <input
          type="submit"
          value="Send Møteinnkalling"
          className="bg-home-200 hover:scale-105 hover:shadow-md duration-100 rounded-md focus:outline-none text-white font-bold py-2 px-8 cursor-pointer"
        />
      </form>
      {success && (
        <div className="absolute bottom-0 right-0 p-9">
          <div className="bg-green-500 text-white p-3">
            <p className="text-sm">Success! Møteinnkallingen din ble sendt.</p>
            <i className="fas fa-check fa-2x text-green-300"></i>
          </div>
        </div>
      )}
    </div>
  );
}

export default Kalender;
