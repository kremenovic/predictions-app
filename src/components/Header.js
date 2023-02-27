import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";

import NavigationLinks from "./NavigationLinks";
const Header = () => {
  return (
    <header className="flex items-center justify-between bg-stone-800 py-7 px-6">
      <div className="flex items-center">
        <Link className="flex items-center">
          <img src={Logo} alt="Logo" className="h-8" />
          <h3 className="ml-3 text-white font-bold">Sport Prediction App</h3>
        </Link>
      </div>
      <NavigationLinks />
      <div className="flex items-center cursor-pointer">
        <h5>dark mode</h5>
      </div>
    </header>
  );
};

export default Header;
