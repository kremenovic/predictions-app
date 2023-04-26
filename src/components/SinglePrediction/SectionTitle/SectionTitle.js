import React from "react";
import { FaCircle } from "react-icons/fa";

const SectionTitle = ({ data, title }) => {
  return (
    <div className="chartHead flex items-center justify-between">
      <div className="flex items-center">
        <img
          src={data?.[0].teams.home.logo}
          alt={data?.[0].teams.home.name}
          className="w-8"
        />
        <FaCircle className="home-color mr-1 text-xs" />
      </div>
      <h3 className="text-white">{title}</h3>
      <div className="flex items-center">
        <FaCircle className="away-color mr-1 text-xs" />
        <img
          src={data?.[0].teams.away.logo}
          alt={data?.[0].teams.away.name}
          className="w-8"
        />
      </div>
    </div>
  );
};

export default SectionTitle;
