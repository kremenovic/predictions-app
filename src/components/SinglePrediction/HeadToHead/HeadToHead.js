import React from "react";
import moment from "moment";
import { FaRegClock } from "react-icons/fa";

const HeadToHead = ({ prevGame, className }) => {
  return (
    <div className={`p-3 mt-6 rounded ${className}`} key={prevGame.fixture.id}>
      <div className="flex">
        <div className="justify-center flex items-center w-1/4">
          <p className="custom-gray flex items-center text-sm">
            <FaRegClock className="mr-2" />{" "}
            {moment(prevGame.fixture.date).format("DD-MM-YYYY")}
          </p>
        </div>
        <div className="w-3/4 col-span-2">
          <div className="grid grid-cols-3 justify-items-center items-center">
            <p className="text-white">{prevGame.teams.away.name}</p>
            <p className="text-white flex flex-col justify-center text-center">
              <span className="text-xs custom-gray">
                ({prevGame.score.halftime.away} : {prevGame.score.halftime.home}
                )
              </span>
              {prevGame.goals.away} : {prevGame.goals.home}
            </p>
            <p className="text-white">{prevGame.teams.home.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadToHead;
