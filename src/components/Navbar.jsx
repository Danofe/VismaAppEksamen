import React from "react";
import LoginButton from "./Login/csLogin";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css"
      />
      <div className="flex items-center flex-shrink-0 text-white mr-2 absolute hover:scale-110 duration-300"></div>
      <div className="sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[250px] overflow-y-auto text-center bg-gray-600">
        <Link to="/">
          <div className="flex-shrink-0 text-white ml-3 p-6 mr-7 hover:scale-110 duration-300">
            <div className="font-semibold text-xl tracking-tight">
              <div className="type-logo text-4xl tracking-normal font-bold hover:tracking-wide duration-200"></div>
            </div>
          </div>
        </Link>

        <Link to="/Profil">
          <div className="p-2.5 mt-[40px] flex items-center hover:scale-105 rounded-md px-4 duration-300 cursor-pointer hover:bg-rose-600 text-white">
            <i className="bi-person-fill" />

            <span className="text-[15px]  ml-4 text-gray-200 font-bold">
              Profil
            </span>
          </div>
        </Link>

        <Link to="/Kalender">
          <div className="p-2.5 mt-5 flex items-center hover:scale-105 rounded-md px-4 duration-300 cursor-pointer hover:bg-rose-600 text-white">
            <i className="bi-calendar2-date-fill" />
            <span className="text-[15px] ml-4 text-gray-200 font-bold">
              Kalender
            </span>
          </div>
        </Link>

        <Link to="/verify-application">
          <div className="p-2.5  mt-5 flex items-center hover:scale-105 rounded-md px-4 duration-300 cursor-pointer hover:bg-rose-600 text-white">
            <i className="bi-shield-lock-fill" />
            <span className="text-[15px] ml-4 text-gray-200 font-bold">
              Autentisering
            </span>
          </div>
        </Link>

        <nav className=" mt-5 pr-[90px]">
          <div className="absolute bottom-20 left-0   ">
            <div className="text-sm "></div>
            <div>
              <LoginButton></LoginButton>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
