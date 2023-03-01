import React from "react";
import { FaWindowClose } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { showMobileNav } from "../../features/user/userSlice";

import NavigationLinks from "./NavigationLinks";
const MobileNavigation = () => {
  const dispatch = useDispatch();
  const { isMobileNavOpen } = useSelector((store) => store.user);
  const toggle = () => {
    dispatch(showMobileNav());
  };
  return (
    <div
      className={
        isMobileNavOpen ? "mobile-navigation show-nav" : "mobile-navigation"
      }
    >
      <div className="content">
        <button className="close-btn" onClick={toggle}>
          <FaWindowClose />
        </button>
        <NavigationLinks />
      </div>
    </div>
  );
};

export default MobileNavigation;
