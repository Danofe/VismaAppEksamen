import React from "react";

function Footer() {
  return (
    <div className=" absolute  bottom-0 w-full">
      <footer className="flex justify-center items-center h-14  text-white z-10 bg-gray-600">
        <span className="text-center text-sm">
          Laget av{" "}
          <a
            className="text-blue-500"
            target="_blank"
            href="https://www.usn.no/"
          >
            USN
          </a>{" "}
          studenter - © 2023 Gruppe 5 x Visma
        </span>
      </footer>
    </div>
  );
}

export default Footer;
