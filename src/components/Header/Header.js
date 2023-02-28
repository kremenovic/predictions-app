import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg";

import NavigationLinks from "./NavigationLinks";
import DarkMode from "./DarkMode";
const Header = () => {
  return (
    <header className="flex items-center justify-between py-7 px-6">
      <div className="flex items-center">
        <Link className="flex items-center">
          <img src={Logo} alt="Logo" className="h-8" />
          <h3 className="ml-3 text-white font-bold text-2xl">
            Sport Prediction App
          </h3>
        </Link>
      </div>
      <NavigationLinks />
      <div className="flex items-center">
        <DarkMode />
      </div>
    </header>
  );
};

export default Header;
