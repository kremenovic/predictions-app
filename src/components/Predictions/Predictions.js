import React from "react";
import { FaRegClock, FaLongArrowAltRight } from "react-icons/fa";
const Predictions = () => {
  return (
    <div className="prediction flex mb-7 items-center transparent cursor-pointer flex-col lg:flex-row  p-6 rounded-xl last:mb-0 hover:translate-y-1 transition-all duration-300">
      <div className=" flex flex-wrap justify-center flex-col  md:flex-row w-1/5">
        <div className="invoice-id">
          <p className="font-bold text-xs custom-gray flex items-center">
            <FaRegClock className="mr-2" /> 14:00
          </p>
        </div>
      </div>
      <div className="flex text-white flex-wrap gap-3 justify-center items-center mt-2 flex-row md:w-3/5 md:mt-0">
        <div className="prediction-team flex items-center">
          <img
            src="https://media.api-sports.io/football/teams/66.png"
            alt="Aston Villa"
            className="w-6 mr-2"
          />
          <p className="custom-gray">Aston Villa</p>
        </div>
        <div className="versus">
          <p>VS</p>
        </div>
        <div className="prediction-team flex items-center">
          <img
            src="https://media.api-sports.io/football/teams/40.png"
            alt="Aston Villa"
            className="w-6 ml-2 order-1"
          />
          <p className="custom-gray">Liverpool</p>
        </div>
      </div>
      <div className="hidden custom-gray flex-wrap justify-center  items-center flex-col md:flex-row w-1/5 md:flex">
        <FaLongArrowAltRight />
      </div>
    </div>
  );
};

export default Predictions;
