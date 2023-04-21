import React from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { FaBars } from "react-icons/fa";
import Logo from "../../assets/logo.svg";
import { useDispatch } from "react-redux";
import { showMobileNav } from "../../features/user/userSlice";
import NavigationLinks from "./NavigationLinks";

import DarkMode from "./DarkMode";
import Logout from "./Logout";
const Header = () => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const toggle = () => {
    dispatch(showMobileNav());
  };
  return (
    <header className="flex items-center justify-between py-7 px-6 dark-bg">
      <div className="flex items-center">
        <Link className="flex items-center">
          <img src={Logo} alt="Logo" className="h-8" />
          <h3 className="ml-3 text-white font-bold text-2xl">
            {!isMobile ? "MatchMate.io" : null}
          </h3>
        </Link>
      </div>
      {!isMobile ? (
        <NavigationLinks />
      ) : (
        <button type="button" onClick={toggle}>
          <FaBars className="mr-8 text-3xl hamburger-icon" />
        </button>
      )}
      <div className="flex items-center">
        <Logout />
        <DarkMode />
      </div>
    </header>
  );
};

export default Header;
