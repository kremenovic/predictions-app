import React from "react";
import { NavLink } from "react-router-dom";
import links from "../utils/links";

const NavigationLinks = () => {
  let activeStyle = {
    textDecoration: "underline",
  };

  return (
    <nav className="flex items-center justify-center flex-1">
      {links.map((link) => {
        const { text, path, id } = link;
        return (
          <NavLink
            to={path}
            className="mx-4 text-gray-800 dark:text-white hover:text-gray-600"
            key={id}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            {text}
          </NavLink>
        );
      })}
    </nav>
  );
};

export default NavigationLinks;
