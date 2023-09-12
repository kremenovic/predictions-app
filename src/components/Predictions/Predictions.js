import React from "react";
import Moment from "react-moment";
import "moment-timezone";
import { FaRegClock, FaLongArrowAltRight } from "react-icons/fa";
const Predictions = ({ fixture: { date }, teams: { home, away } }) => {
    return (
        <div className="prediction flex items-center transparent cursor-pointer flex-col lg:flex-row px-2 py-4  rounded-xl md:p-6 last:mb-0 hover:translate-y-1 transition-all duration-300">
            <div className=" flex flex-wrap justify-center items-center flex-col w-full md:flex-row md:w-1/5">
                <div className="prediction-time">
                    <p className="font-bold text-xs custom-gray flex items-center">
                        <FaRegClock className="mr-2" />{" "}
                        <Moment format="h:mm z" tz="CET">
                            {date}
                        </Moment>
                    </p>
                </div>
            </div>
            <div className="flex text-white flex-wrap gap-5 justify-center items-center mt-2 flex-row md:gap-3 md:flex-row md:w-3/5 md:mt-0">
                <div className="prediction-team flex items-center text-center flex-col md:flex-row">
                    <img src={home.logo} alt={home.name} className="w-6 mr-2" />
                    <p className="custom-gray">{home.name}</p>
                </div>
                <div className="versus">
                    <p className="text-xs md:text-sm">VS</p>
                </div>
                <div className="prediction-team flex items-center text-center flex-col md:flex-row">
                    <img
                        src={away.logo}
                        alt={away.name}
                        className="w-6 ml-2  order-none md:order-1"
                    />
                    <p className="custom-gray">{away.name}</p>
                </div>
            </div>
            <div className="hidden custom-gray flex-wrap justify-center  items-center flex-col md:flex-row w-1/5 md:flex">
                <FaLongArrowAltRight />
            </div>
        </div>
    );
};

export default Predictions;
