import React from "react";
import LoginButton from "./Login/csLogin";
import { Link } from "react-router-dom";
import Arkiv from "./Arkiv/Arkiv";

function Navbar() {

  const { instance } = useMsal();
 
  const [brukerNavn, setBrukerNavn] = useState("");
  const [ProfilBilde, setProfilBilde] = useState("");

  useEffect(() => {
      const aktivbruker = instance.getActiveAccount();

      if (aktivbruker) {
          setBrukerNavn(aktivbruker.name);

          const ProfilBilde = async () => {
              const endpoint = "https://graph.microsoft.com/v1.0/me/photo/$value";

              const accessToken = await instance.acquireTokenSilent({
                  scopes: ["https://graph.microsoft.com/.default"],
              });

              const res = await axios(endpoint, {
                  headers: {
                      Authorization: `Bearer ${accessToken.accessToken}`,
                  },
                  responseType: "arraybuffer",
              });
              const bilde = Buffer.from(res.data, "binary").toString("base64");
              setProfilBilde("data:image/jpeg;base64, " + bilde);
          };
          ProfilBilde();
      }
  }, [instance]);


  const behandleUt = () => {
      instance.logout();
  };

  return (
    <div>


    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css" />

    <div className="sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[250px] overflow-y-auto text-center bg-gray-600">

        <Link to="/Profil">
            <div className="p-2.5 mt-40 flex items-center hover:scale-105 rounded-md px-4 duration-300 cursor-pointer hover:bg-rose-600 text-white">
                <i className="bi-person-fill" />

                <span className="text-[15px]  ml-4 text-gray-200 font-bold">Arkiv?</span>
            </div></Link>

        <Link to="/Kalender">
            <div className="p-2.5 mt-5 flex items-center hover:scale-105 rounded-md px-4 duration-300 cursor-pointer hover:bg-rose-600 text-white">
                <i className="bi-calendar2-date-fill" />

                <span className="text-[15px] ml-4 text-gray-200 font-bold">Kalender</span>
            </div></Link>

        <Link to="/VerifyApplication">
            <div className="p-2.5 mt-5 flex items-center hover:scale-105 rounded-md px-4 duration-300 cursor-pointer hover:bg-rose-600 text-white">
                <i className="bi-shield-lock-fill" />
                <span className="text-[15px] ml-4 text-gray-200 font-bold">Autentisering</span>
            </div></Link>

        <div className="my-4 bg-gray-600 h-[1px]" />

        <Link to="/Profil">
            <div className="flex p-2.5 mt-10 px-3 xl:flex-row hover:scale-105 rounded-md hover:bg-rose-600 flex-col items-center font-medium tracking-wide text-white pb-2 mb-2 duration-300 w-full">
                <img
                    src={`${ProfilBilde}`}
                    alt={`${brukerNavn}`}
                    className="w-7 h-7 mr-2 rounded-full"
                />
                {brukerNavn}
            </div>
        </Link>

        <div className="p-2.5 mt-2 flex items-center hover:scale-105 rounded-md px-4 duration-300 cursor-pointer hover:bg-rose-600 text-white">
            <i className="bi bi-box-arrow-in-right" />
            <span className="text-[15px] ml-4 text-gray-200 font-bold" onClick={behandleUt}>Logg ut</span>
        </div>
    </div>

    <nav className="flex bg-gray-100 items-center justify-between flex-wrap p-6 pl-16 pr-16">
        <div className="flex items-center flex-shrink-0 text-white mr-6 absolute hover:scale-110 duration-300">
<span className="font-semibold text-xl tracking-tight">

    <span className="type-logo text-4xl tracking-normal font-bold hover:tracking-wide duration-200 ">
    </span>
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
</div>
  );
}

export default Navbar;

