import React from "react";
import leagues from "../../utils/leagues";
const Leagues = () => {
  return (
    <section className="leagues w-full rounded p-5 dark-bg h-fit lg:w-3/12">
      <h1 className="mb-5 text-xl text-white ">Leagues</h1>
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
    </section>
  );
};

export default Leagues;
