import React, { useState, useEffect } from "react";
import axios from "axios";
import { useMsal } from "@azure/msal-react";
import { addDoc, getDoc } from "firebase/firestore";
import { dbKalender, dbConfig} from "../firebase/fireConfig";

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

    addDoc(dbKalender, {
      Tittel: formData.title,
      Fra: formData.startTime,
      Til: formData.endTime,
      Sted: formData.location,
      Mottaker: formData.recipient,
      Status: "venter",
      //Config: hente config
      //Bruker: hente bruker
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
      style={{__html: "\n  .-z-1 {\n    z-index: -1;\n  }\n\n  .origin-0 {\n    transform-origin: 0%;\n  }\n\n  input:focus ~ label,\n  input:not(:placeholder-shown) ~ label,\n  textarea:focus ~ label,\n  textarea:not(:placeholder-shown) ~ label,\n  select:focus ~ label,\n  select:not([value='']):valid ~ label {\n    /* @apply transform; scale-75; -translate-y-6; */\n    --tw-translate-x: 0;\n    --tw-translate-y: 0;\n    --tw-rotate: 0;\n    --tw-skew-x: 0;\n    --tw-skew-y: 0;\n    transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate))\n      skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n    --tw-scale-x: 0.75;\n    --tw-scale-y: 0.75;\n    --tw-translate-y: -1.5rem;\n  }\n\n  input:focus ~ label,\n  select:focus ~ label {\n    /* @apply text-black; left-0; */\n    --tw-text-opacity: 1;\n    color: rgba(0, 0, 0, var(--tw-text-opacity));\n    left: 0px;\n  }\n"}}>
    <div className="min-h-screen bg-gray-100 p-0 sm:p-12">

      <div className="mx-auto max-w-md px-6 py-12 bg-white border-0 shadow-lg sm:rounded-3xl">
        <h1 className="text-2xl font-bold mb-8">Opprett mÃ¸te</h1>


      <form onSubmit={handleSubmit}>

        <div className="relative z-0 w-full mb-5">
          <input type="text" id="title" name="name" placeholder=" " required value={formData.title}
                 onChange={handleChange}
                 className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"/>
          <label htmlFor="title"
                 className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">Tittel</label>
          <span className="text-sm text-red-600 hidden" id="error">Name is required</span>
        </div>

        <div className="relative z-0 w-full mb-5">
          <input type="email" id="recipient" name="email" placeholder=" " value={formData.recipient}
                 onChange={handleChange}
                 className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                 autoComplete="off"/>
          <label htmlFor="email"
                 className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">Mottaker</label>
          <span className="text-sm text-red-600 hidden"
                id="error">E-postadresse er påkrevd</span>
        </div>

        <div className="relative z-0 w-full mb-5">
          <input type="text" name="place" id="location" placeholder=" " required value={formData.location}
                 onChange={handleChange}
                 className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"/>
          <label htmlFor="name"
                 className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">Sted</label>
          <span className="text-sm text-red-600 hidden" id="error">Name is required</span>
        </div>


        <div className="relative z-0 w-full mb-5">
          <select name="select" id="application"
                  value={formData.application}
                  onChange={handleChange}
                  className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200">
            {applications.map((app) => (
                <option key={app.appId} value={app.appId}>
                  {app.displayName}
                </option>
            ))}
          </select>
          <label htmlFor="select"
                 className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">Velg
            applikasjon</label>
          <span className="text-sm text-red-600 hidden"
                id="error">Alternativet må velges</span>
        </div>

        <div className="flex flex-row space-x-4">
          <div className="relative z-0 w-full mb-5">
            <input type={"datetime-local"} id="startTime" name="date" placeholder=" " value={formData.startTime}
                   onChange={handleChange}
                   onClick="this.setAttribute('type', 'date');"
                   className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"/>
            <label htmlFor="date"
                   className="absolute duration-300 top-[-10px] -z-1 origin-0 text-gray-500">Start dato</label>
            <span className="text-sm text-red-600 hidden" id="error">start dato er påkrevd</span>
          </div>
        </div>

        <div className="relative z-0 w-full">
          <input type={"datetime-local"} name="time" placeholder=" " id="endTime"
                 value={formData.endTime}
                 onChange={handleChange}
                 onClick="this.setAttribute('type', 'time');"
                 className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"/>
          <label htmlFor="time"
                 className="absolute duration-300 top-[-10px] space-y-3 -z-1 origin-0 text-gray-500">Slutt dato</label>
          <span className="text-sm text-red-600 hidden" id="error">Slutt dato er påkrevd</span>
        </div>


        <div className="relative z-0 w-full mb-5">
          <input type="text" id="description" name="name" placeholder=" " required value={formData.endTime}
                 onChange={handleChange}
                 className="pt-3 pb-2 block w-full px-0 mt-0 space-y-3 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"/>
          <label htmlFor="name"
                 className="absolute duration-300 top-3 space-y-3 -z-1 origin-0 text-gray-500">Beskrivelse</label>
          <span className="text-sm text-red-600 hidden" id="error">Name is required</span>
        </div>


        <input id="button" type="submit"
          value="Legg til"
               className="w-[150px]  py-3 mt-3  text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-red-500 hover:bg-red-400 hover:shadow-lg focus:outline-none"
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
      </div>
      </div>
  );
}

export default Kalender;
