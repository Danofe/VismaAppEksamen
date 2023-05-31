import React, { useState, useEffect } from "react";
import axios from "axios";
import { addDoc, getDocs, query, where } from "firebase/firestore";
import dateFormat from "dateformat";
import { dbKalender, dbConfig, db } from "../firebase/fireConfig";
import { updateDoc, deleteDoc, doc, collection } from "firebase/firestore";

function Kalender() {
  const [formData, setFormData] = useState({
    title: "",
    startTime: "",
    endTime: "",
    location: "",
    attendees: "",
    recipient: "",
    beskrivelse: "",
  });
  const [success, setSuccess] = useState(false);

  //Setter opp useState for applications fra database
  const [applications, setApplications] = useState([]);

  //setUseState for valgt application fra database
  const [selectedApplication, setSelectedApplication] = useState(null);

  let app = [];
  //Setter opp useState for kalender
  const [data, setData] = useState([]);

  let kalenderKø = [];

  const kalenderventer = query(dbKalender, where("status", "==", "Venter"));

  useEffect(() => {
    getDocs(kalenderventer).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        kalenderKø.push({ ...doc.data(), id: doc.id });
      });
      console.log(kalenderKø);
      setData(kalenderKø);
    });
  }, []);

  //Henter alle applications fra database
  const getApplications = async () => {
    getDocs(dbConfig).then((snapshot) => {
      snapshot.docs.map((doc) => {
        app.push({ ...doc.data() });
      });
      setApplications(app);
    });
  };

  useEffect(() => {
    getApplications();
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const handleChange2 = (event) => {
    console.log(event.target.value);
    const valgtAppId = event.target.value;

    const valgtApp = applications.find((app) => app.Name === valgtAppId);
    if (!valgtApp) {
      console.error("fant ikke applikasjon");
      return;
    }

    setSelectedApplication(valgtApp);
    console.log(selectedApplication);
    console.log(selectedApplication.TenantID);
  };

  const handleChange3 = (event) => {
    const objectID = event.target.value;
    console.log(objectID);

    const dokumentRef = doc(collection(db, "Kalender"), objectID);

    console.log(dokumentRef);

    deleteDoc(dokumentRef)
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const handleChange4 = (event) => {
    const objectID = event.target.value;

    const dokument = doc(collection(db, "Kalender"), objectID);
    updateDoc(dokument, {
      Status: "ferdig",
    })
      .then(() => {
        console.log(objectID + "Har blitt gjort om til ferdig");
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedApplication) {
      console.error("ingen applikasjon er valgt");
      return;
    }

    addDoc(dbKalender, {
      Tittel: formData.title,
      Fra: formData.startTime,
      Til: formData.endTime,
      Sted: formData.location,
      attendees: formData.attendees,
      Mottaker: formData.recipient,
      Beskrivelse: formData.beskrivelse,
      Status: "venter",
      //Config: hente config
      //Bruker: hente bruker
    });

    const tokenResponse = await axios.post("/api/getToken", {
      tenantId: selectedApplication.TenantID,
      applicationId: selectedApplication.ApplicationID,
      clientSecret: selectedApplication.Clientsecret,
    });
    const accessToken = tokenResponse.data.token;

    try {
      const response = await axios.get(
        `https://graph.microsoft.com/v1.0/users/${formData.recipient}/events`,
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
          attendees: [
            {
              emailAddress: {
                address: formData.recipient,
              },
            },
          ],

          body: {
            contentType: "HTML",
            content: formData.beskrivelse,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.data.token}`,
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
    <div className="min-h-screen bg-gray-100 p-0 sm:p-1 flex justify-center ">
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n  .-z-1 {\n    z-index: -1;\n  }\n\n  .origin-0 {\n    transform-origin: 0%;\n  }\n\n  input:focus ~ label,\n  input:not(:placeholder-shown) ~ label,\n  textarea:focus ~ label,\n  textarea:not(:placeholder-shown) ~ label,\n  select:focus ~ label,\n  select:not([value='']):valid ~ label {\n    /* @apply transform; scale-75; -translate-y-6; */\n    --tw-translate-x: 0;\n    --tw-translate-y: 0;\n    --tw-rotate: 0;\n    --tw-skew-x: 0;\n    --tw-skew-y: 0;\n    transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate))\n      skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n    --tw-scale-x: 0.75;\n    --tw-scale-y: 0.75;\n    --tw-translate-y: -1.5rem;\n  }\n\n  input:focus ~ label,\n  select:focus ~ label {\n    /* @apply text-black; left-0; */\n    --tw-text-opacity: 1;\n    color: rgba(0, 0, 0, var(--tw-text-opacity));\n    left: 0px;\n  }\n",
        }}
      />

      <div className=" container w-[1100px] mt-10 px-12 py-12 bg-5ray-500  sm:rounded-3xl grid grid-cols-2 gap-10 fixed border-x-5 box-border mx-[250px]">
        <div className="col-span-1 flex flex-col bg-white border-2 sm:rounded-3xl shadow-lg p-4 ">
          <h2 className="mb-2 font-bold text-2xl  ">Opprett avtale</h2>
          <form onSubmit={handleSubmit}>
            <div className="relative z-0 w-full mb-5">
              <input
                type="text"
                id="title"
                name="name"
                placeholder=" "
                required
                value={formData.title}
                onChange={handleChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
              <label
                htmlFor="title"
                className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
              >
                Tittel
              </label>
              <span className="text-sm text-red-600 hidden" id="error">
                Tittel er påkrevd
              </span>
            </div>

            <div className="relative mt-5 z-0 w-full mb-5">
              <input
                type="email"
                id="recipient"
                name="email"
                placeholder=" "
                value={formData.recipient}
                onChange={handleChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                autoComplete="off"
              />
              <label
                htmlFor="email"
                className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
              >
                Mottaker
              </label>
              <span className="text-sm text-red-600 hidden" id="error">
                E-postadresse er påkrevd
              </span>
            </div>

            <div className="relative mt-5 z-0 w-full mb-5">
              <input
                type="text"
                name="place"
                id="location"
                placeholder=" "
                required
                value={formData.location}
                onChange={handleChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
              <label
                htmlFor="name"
                className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
              >
                Sted
              </label>
              <span className="text-sm text-red-600 hidden" id="error">
                Sted er påkrevd
              </span>
            </div>
            <div className="relative z-0 w-full mb-5">
              <select
                name="select"
                id="application"
                placeholder="Velg applikasjon"
                onClick={getApplications}
                onChange={handleChange2}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              >
                {applications.map((app) => (
                  <option key={app.appId} value={app.Name}>
                    {app.Name}
                  </option>
                ))}
              </select>
              <label
                htmlFor="select"
                className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
              >
                Velg applikasjon
              </label>
              <span className="text-sm text-red-600 hidden" id="error">
                Alternativet mÃ¥ velges
              </span>
            </div>

            <div className="flex mt-10 flex-row space-x-4">
              <div className="relative z-0 w-full mb-5">
                <input
                  type={"datetime-local"}
                  id="startTime"
                  name="date"
                  placeholder=" "
                  value={formData.startTime}
                  onChange={handleChange}
                  onClick="this.setAttribute('type', 'date');"
                  className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                />
                <label
                  htmlFor="date"
                  className="absolute duration-300 top-[-10px] -z-1 origin-0 text-gray-500"
                >
                  Start dato
                </label>
                <span className="text-sm text-red-600 hidden" id="error">
                  Start dato er påkrevd
                </span>
              </div>
            </div>

            <div className="relative mt-5 z-0 w-full">
              <input
                type={"datetime-local"}
                name="time"
                placeholder=" "
                id="endTime"
                value={formData.endTime}
                onChange={handleChange}
                onClick="this.setAttribute('type', 'time');"
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
              <label
                htmlFor="time"
                className="absolute duration-300 top-[-10px] space-y-3 -z-1 origin-0 text-gray-500"
              >
                Slutt dato
              </label>
              <span className="text-sm text-red-600 hidden" id="error">
                Slutt dato er påkrevd
              </span>
            </div>

            <div className="relative mt-5 z-0 w-full mb-5">
              <input
                type="text"
                name="beskrivelse"
                id="beskrivelse"
                placeholder=" "
                required
                value={formData.beskrivelse}
                onChange={handleChange}
                className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
              />
              <label
                htmlFor="name"
                className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
              >
                Beskrivelse
              </label>
            </div>

            <input
              id="button"
              type="submit"
              value="Legg til"
              className="w-[150px]  py-3 mt-3  text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-red-500 hover:bg-red-400 hover:shadow-lg focus:outline-none"
            />
          </form>
          {success && (
            <div className="absolute bottom-0 right-0 p-9">
              <div className="bg-green-500 text-white p-3">
                <p className="text-sm">
                  Suksess! Avtaleinnkallingen din ble sendt.
                </p>
                <i className="fas fa-check fa-2x text-green-300"></i>
              </div>
            </div>
          )}
        </div>

        <div className="col-span-1 flex flex-col bg-white border-2 sm:rounded-3xl shadow-lg p-4 w-[450px] overflow-auto">
          <h2 className="mb-2 font-bold text-2xl ">Avtale kø</h2>

          <div className=" h-[45vh]  overflow-auto scrollbar-hide rounded-xl shadow-md hover:shadow-lg duration-200 group">
            {data.length === 0 && (
              <p className=" text-black flex justify-center">
                Du har ingen Møter
              </p>
            )}
            <>
              {data.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col pt-2 pb-5 border-b border-black/50 m-2 "
                >
                  <div className="flex pl-1">
                    <ul className="list-none text-base text-black duration-200 font-semibold w-screen">
                      <li>Tittel: {item.Tittel}</li>
                      <li>Sted: {item.Sted}</li>
                      <li>Mottaker: {item.Mottaker}</li>
                      <li>
                        Fra:{" "}
                        {dateFormat(item.Fra, "dddd, mmmm dS, yyyy, h:MM TT")}
                      </li>
                      <li>
                        Til:{" "}
                        {dateFormat(item.Til, "dddd, mmmm dS, yyyy, h:MM TT")}
                      </li>
                      <li>Status: {item.Status}</li>
                      <div className="flex justify-between pt-3">
                        <div className="bg-red-500 rounded-md  text-white hover:scale-105 hover:bg-red-400 hover:shadow-lg focus:outline-none font-normal">
                          <button
                            className="p-1 pl-4 pr-4"
                            value={item.id}
                            onClick={handleChange4}
                          >
                            Send
                          </button>
                        </div>
                        <div className="bg-red-500 rounded-md text-white hover:scale-105 hover:bg-red-400 hover:shadow-lg focus:outline-none font-normal">
                          <button
                            className="p-1 pl-4 pr-4 "
                            value={item.id}
                            onClick={handleChange3}
                          >
                            Fjern
                          </button>
                        </div>
                      </div>
                    </ul>
                  </div>
                </div>
              ))}
            </>
          </div>
          <div className="flex justify-between">
            {success && (
              <div className="absolute bottom-0 right-0 p-9">
                <div className="bg-green-500 text-white p-3">
                  <p className="text-sm">Sukess! Avtale køen ble lagt til.</p>
                  <i className="fas fa-check fa-2x text-green-300"></i>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Kalender;
