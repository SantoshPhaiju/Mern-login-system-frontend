import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () =>{
    localStorage.removeItem("auth-token");
    localStorage.removeItem("data");
    navigate("/login");
  }
  return (
    <>
      <header className="navbar flex justify-between items-center bg-slate-50 p-3 shadow-lg shadow-gray-500/40">
        <h1 className="text-3xl text-indigo-700 font-ubuntu ml-5">Navbar</h1>
        <nav>
          <ul className="flex gap-8 mr-10 justify-center text-xl cursor-pointer font-normal text-purple-900 font-opensans">
            <li>
              <Link
                className={`hover:bg-slate-200 px-6 py-1 focus:bg-slate-200 ${
                  location.pathname === "/" ? "bg-slate-200" : ""
                }`}
                to="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className={`hover:bg-slate-200 px-6 py-1 focus:bg-slate-200 ${
                  location.pathname === "/about" ? "bg-slate-200" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                className={`hover:bg-slate-200 px-6 py-1 focus:bg-slate-200 ${
                  location.pathname === "/contact" ? "bg-slate-200" : ""
                }`}
                to="/contact"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <div className="btns flex gap-6 mr-8 justify-center">
          {!localStorage.getItem("auth-token") ? (
            <div className="buttons flex gap-4">
              <button>
                <Link
                  to="/login"
                  className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-gray-600/50 shadow-lg  hover:bg-blue-700 hover:shadow-lg hover:shadow-gray-600/50 focus:bg-blue-700 focus:shadow-lg focus:shadow-gray-600/50 focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-gray-600/50 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Login
                </Link>
              </button>
              <button>
                <Link
                  to="/register"
                  className="inline-block px-6 py-2.5 shadow-gray-600/50 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-lg hover:bg-red-700 hover:shadow-gray-600/50 hover:shadow-lg focus:bg-red-700 focus:shadow-gray-600/50 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-gray-600/50 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Register
                </Link>
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-4 focus:outline-none font-medium rounded uppercase leading-tight shadow-md text-xs w-full sm:w-auto px-6 py-2.5 text-center mx-2"
            >
              Logout
            </button>
          )}
        </div>
      </header>
    </>
  );
};

export default Navbar;
