import React from "react";

const CustomLineChart = ({ home, away, title }) => {
  return (
    <div className="draw-bg p-3 mt-6 rounded">
      <div className="flex justify-between items-center">
        <p className="text-white">{home}</p>
        <p className="custom-gray">{title}</p>
        <p className="text-white">{away}</p>
      </div>
      <div className="flex justify-evenly items-center mt-4 gap-5 darkChart-bg rounded px-10">
        <div
          className="home-bg text-center rounded-lg h-2"
          style={{ width: home }}
        ></div>
        <div
          className="away-bg text-center rounded-lg h-2"
          style={{ width: away }}
        ></div>
      </div>
    </div>
  );
};

export default CustomLineChart;
