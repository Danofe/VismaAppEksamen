import { React, useState } from "react";
import axios from "axios";
import { useMsal } from "@azure/msal-react";
import dateFormat from "dateformat";

function Arkiv() {
  const [arkiv, setArkiv] = useState(false);
  const [data, setData] = useState([]);

  const { instance } = useMsal();

  const hentData = async () => {
    setArkiv(!arkiv);

    const endpoint =
      "https://graph.microsoft.com/v1.0/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location";

    const accessToken = await instance.acquireTokenSilent({
      scopes: ["https://graph.microsoft.com/.default"],
    });

    const req = await axios
      .get(endpoint, {
        headers: {
          Authorization: `Bearer ${accessToken.accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data.value === undefined) {
          setData([]);
        } else {
          setData(res.data.value);
        }
      });
  };

  return (
    <div className="group pr-5 z-10">
      <button className="cursor-pointer " onClick={hentData}>
        <div className=" bg-home-100 p-2 rounded-lg hover:shadow-md hover:scale-105 duration-200">
          <svg
            className="opacity-50 hover:opacity-100 duration-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="32"
            height="32"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M3 10H2V4.003C2 3.449 2.455 3 2.992 3h18.016A.99.99 0 0 1 22 4.003V10h-1v10.001a.996.996 0 0 1-.993.999H3.993A.996.996 0 0 1 3 20.001V10zm16 0H5v9h14v-9zM4 5v3h16V5H4zm5 7h6v2H9v-2z"
              fill="rgba(255,255,255,1)"
            />
          </svg>
        </div>
      </button>

      <div
        className={`absolute bottom-52 right-16  cursor-default transition-all duration-200
            ${
              arkiv ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
            }`}
      >
        <div className="bg-home-100/50 w-64 h-[60vh] overflow-auto scrollbar-hide rounded-md shadow-md hover:shadow-lg duration-200 group">
          {data.length === 0 && (
            <p className=" text-white flex justify-center">
              Du har ingen Møter
            </p>
          )}
          <>
            {data.map((item) => (
              <div
                key={item.id}
                className="flex flex-col pt-2 pb-5 border-b border-white/50 m-2"
              >
                <div className="flex pl-1 ">
                  <ul className="list-none text-base text-white opacity-70 hover:opacity-100 duration-200 font-semibold">
                    <li>Subject: {item.subject}</li>
                    <li>Location: {item.location.displayName}</li>
                    <li>
                      {dateFormat(
                        item.start.dateTime,
                        "dddd, mmmm dS, yyyy, h:MM TT"
                      )}
                    </li>
                    <li>
                      {dateFormat(
                        item.end.dateTime,
                        "dddd, mmmm dS, yyyy, h:MM TT"
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </>
        </div>
      </div>
    </div>
  );
}

export default Arkiv;
//Alt er skrevet av Daniel
