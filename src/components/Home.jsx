//Skrevet av Daniel Styling av Daniel
import React from "react";
import "../index.css";
import { Link } from "react-router-dom";
import "remixicon/fonts/remixicon.css";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-0 sm:p-12">
      <div className=" flex justify-center items-center xl:pt-50 lg:pt-40 md:pt-30">
        <div className="flex flex-wrap gap-52">
          <Link to="/Kalender">
            <div className=" h-80 w-96 bg-red-600 hover:bg-red-500 opacity-70 rounded-xl  border-gray-500 cursor-pointer hover:scale-110 duration-300 hover:shadow-lg overflow-hidden group">
              <div className="flex justify-center pt-10 opacity-50 hover:opacity-100 duration-700 hover:pt-2 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="240"
                  height="240"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    d="M17 3h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1h2v2h6V1h2v2zm3 8H4v8h16v-8zm-5-6H9v2H7V5H4v4h16V5h-3v2h-2V5zm-9 8h2v2H6v-2zm5 0h2v2h-2v-2zm5 0h2v2h-2v-2z"
                    fill="rgba(255,255,255,1)"
                  />
                </svg>
              </div>
              <div>
                <span className="flex justify-center text-white text-4xl font-bold opacity-0 group-hover:opacity-100 duration-1000 group-hover:type-kalender"></span>
              </div>
            </div>
          </Link>
          <Link to="/verify-application">
            <div className=" h-80 w-96 bg-red-600 hover:bg-red-500 opacity-70 rounded-xl  border-gray-500 cursor-pointer hover:scale-110 duration-300 hover:shadow-lg  overflow-hidden group">
              <div className="flex justify-center pt-10 opacity-50 hover:opacity-100 duration-700 hover:pt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="240"
                  height="240"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    d="M2 3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H2.992A.993.993 0 0 1 2 20.007V3.993zM4 5v14h16V5H4zm2 2h6v6H6V7zm2 2v2h2V9H8zm-2 6h12v2H6v-2zm8-8h4v2h-4V7zm0 4h4v2h-4v-2z"
                    fill="rgba(255,255,255,1)"
                  />
                </svg>
              </div>
              <div className="flex justify-center opacity-0 group-hover:opacity-100 duration-1000">
                <span className=" text-white text-4xl font-bold group-hover:type-profil"></span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
