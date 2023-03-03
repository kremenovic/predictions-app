import React from "react";
import leagues from "../../utils/leagues";
const Leagues = () => {
  return (
    <ul>
      {leagues.map((league) => {
        const { id, text, path } = league;
        return (
          <li
            key={id}
            className="flex cursor-pointer pb-4 last:pb-0 hover:translate-x-1 transition-all duration-300"
            onClick={() => console.log(id)}
          >
            <img src={path} alt={text} className="w-6 mr-2" />
            {text}
          </li>
        );
      })}
    </ul>
  );
};

export default Leagues;
