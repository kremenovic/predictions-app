import React from "react";
import { NavLink } from "react-router-dom";
import links from "../../utils/links";

const NavigationLinks = () => {
  let activeStyle = {
    textDecoration: "underline",
    color: "#E72641",
  };

  return (
    <nav className="flex items-center justify-left flex-1 ml-5">
      {links.map((link) => {
        const { text, path, id } = link;
        return (
          <NavLink
            to={path}
            className="mx-4 font-semibold tracking-wider hover:text-gray-600"
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
