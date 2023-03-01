import React from "react";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useDispatch } from "react-redux";
import { showMobileNav } from "../../features/user/userSlice";

import links from "../../utils/links";

const NavigationLinks = () => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  let activeStyle = {
    textDecoration: "underline",
    color: "#E72641",
  };

  const toggle = () => {
    dispatch(showMobileNav());
  };

  return (
    <nav
      className={
        !isMobile
          ? "flex items-center justify-left flex-1 ml-5"
          : "flex items-center flex-col justify-center"
      }
    >
      {links.map((link) => {
        const { text, path, id } = link;
        return (
          <NavLink
            to={path}
            className={
              !isMobile
                ? "mx-4 font-semibold tracking-wider hover:text-gray-600"
                : "mx-4 font-semibold tracking-wider hover:text-gray-600 text-2xl pb-2 last:pb-0"
            }
            key={id}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            onClick={toggle}
          >
            {text}
          </NavLink>
        );
      })}
    </nav>
  );
};

export default NavigationLinks;
