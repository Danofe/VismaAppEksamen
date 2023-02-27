import React, { useState } from "react";
import axios from "axios";
import { useMsal } from "@azure/msal-react";
import { addDoc } from "firebase/firestore";
import { dbcol } from "../firebase/fireConfig";

function Kalender() {
  const { instance } = useMsal();
  const [formData, setFormData] = useState({
    title: "",
    startTime: "",
    endTime: "",
    location: "",
  });

  const [success, setSuccess] = useState(false);

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
    });

    const accessToken = await instance.acquireTokenSilent({
      scopes: ["https://graph.microsoft.com/.default"],
    });

    try {
      const response = await axios.post(
        "https://graph.microsoft.com/v1.0/me/events",
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

  return (
    <div className="w-2/5 mx-auto mt-20 p-10 bg-home-100 shadow-md relative rounded-md">
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
            className="w-full p-2 border border-gray-400 rounded-lg"
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
        <input
          type="submit"
          value="Submit"
          className="bg-home-200 hover:scale-105 hover:shadow-md duration-100 rounded-md focus:outline-none text-white font-bold py-2 px-8 cursor-pointer"
        />
      </form>
      {success && (
        <div className="absolute bottom-0 right-0 p-9">
          <div className="bg-green-500 text-white p-3">
            <p class="text-sm">Success! Your data was sent.</p>
            <i class="fas fa-check fa-2x text-green-300"></i>
          </div>
        </div>
      )}
    </div>
  );
}

export default Kalender;
