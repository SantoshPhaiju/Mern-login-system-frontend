import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <header className="navbar flex justify-between items-center bg-indigo-700/50 p-3 shadow-lg shadow-gray-500/40">
        <h1 className="text-3xl text-indigo-700 font-ubuntu ml-5">Navbar</h1>
        <nav>
            <ul className="flex gap-8 mr-10 text-xl cursor-pointer font-normal text-purple-900 font-opensans">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
