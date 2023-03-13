import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import Leagues from "./Leagues";
import england from "../../assets/leagues/country-en.svg";
const MobileLeagues = () => {
  const [showLeagues, setShowLeagues] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <>
      <div className="flex justify-between w-full mb-2">
        <div className="flex items-center">
          <img src={england} alt="england" className="w-6 mr-2 lg:w-8" />
          <div className="flex flex-col">
            <h4 className="text-white text-base w-max lg:text-lg">
              Premier League <sup className="custom-gray text-xs">England</sup>
            </h4>
          </div>
        </div>
        {isMobile ? (
          <div className="flex">
            <button
              className="btn filter-btn tracking-wider"
              onClick={() => setShowLeagues(!showLeagues)}
            >
              Filter
            </button>
          </div>
        ) : null}
      </div>
      {showLeagues && <Leagues />}
    </>
  );
};

export default MobileLeagues;
