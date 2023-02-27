import React from "react";
import LoginButton from "./Login/csLogin";
import { Link } from "react-router-dom";
import Arkiv from "./Arkiv/Arkiv";

function Navbar() {
  return (
    <nav className="flex items-center justify-between flex-wrap p-6 pl-16 pr-16">
      <div className="flex items-center flex-shrink-0 text-white mr-6 absolute hover:scale-110 duration-300">
        <span className="font-semibold text-xl tracking-tight">
          <Link to="/">
            <span className="type-logo text-4xl tracking-normal font-bold hover:tracking-wide duration-200 "></span>
          </Link>
        </span>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow "></div>
        <div>
          <Arkiv />
        </div>
        <div>
          <LoginButton></LoginButton>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
// Alt er skrevet av: Daniel
