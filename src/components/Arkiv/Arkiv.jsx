import { React, useState } from "react";
import dateFormat from "dateformat";
import { getDocs } from "firebase/firestore";
import { dbKalender } from "../../firebase/fireConfig";

function Arkiv() {
  const [arkiv, setArkiv] = useState(false);
  const [data, setData] = useState([]);

  let kalenderKø = [];

  const hentData = async () => {
    setArkiv(!arkiv);

    getDocs(dbKalender).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        kalenderKø.push({ ...doc.data() });
      });
      console.log(kalenderKø);
      setData(kalenderKø);
    });
  };

  return (
    <div className="group  pr-5 z-10">
      <button className="cursor-pointer " onClick={hentData}>
        <div className=" hover:bg-rose-600 p-2 rounded-lg hover:shadow-md hover:scale-105 duration-200">
          <svg
            className="  hover:bg-rose-600 hover:opacity-100 duration-500"
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
        className={`absolute bg-gray-600 bottom-52 right-16 hover:bg-rose-600 cursor-default transition-all duration-200
            ${arkiv ? " translate-x-0" : "opacity-0 translate-x-20"}`}
      >
        <div className=" w-64 h-[60vh] bg-gray-600  overflow-auto scrollbar-hide rounded-md shadow-md hover:shadow-lg duration-200 group">
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
                  <ul className="list-none text-base text-white duration-200 font-semibold">
                    <li>Subject: {item.Tittel}</li>
                    <li>Location: {item.Sted}</li>
                    <li>Mottaker: {item.Mottaker}</li>
                    <li>
                      {dateFormat(item.fra, "dddd, mmmm dS, yyyy, h:MM TT")}
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
