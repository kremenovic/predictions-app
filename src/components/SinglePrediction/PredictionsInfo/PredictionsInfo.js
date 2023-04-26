import React from "react";

const PredictionsInfo = ({ data }) => {
  return (
    <div className="prediction-info ">
      <div className="advice flex flex-col max-w-3xl mx-auto justify-center items-center py-4">
        <h1 className="custom-gray">
          Who will win {data?.[0].teams.home.name} or{" "}
          {data?.[0].teams.away.name}?
        </h1>
        {data?.[0].predictions.advice && (
          <p className="custom-gray  text-sm mt-3 ">
            <strong>Advice:</strong> {data?.[0].predictions.advice}
          </p>
        )}
      </div>
      <div className="flex flex-row max-w-3xl mx-auto justify-center items-center gap-5 py-4 ">
        <div
          className="home-bg text-center rounded-lg min-w-fit px-3"
          style={{ width: data?.[0].predictions.percent.home }}
        >
          <p className="text-xs text-white">
            Home: {data?.[0].predictions.percent.home}
          </p>
        </div>
        <div
          className="draw-bg text-center rounded-lg min-w-fit px-3"
          style={{ width: data?.[0].predictions.percent.draw }}
        >
          <p className="text-xs text-white">
            Draw: {data?.[0].predictions.percent.draw}
          </p>
        </div>
        <div
          className="away-bg text-center rounded-lg min-w-fit px-3"
          style={{ width: data?.[0].predictions.percent.away }}
        >
          <p className="text-xs text-white">
            Away: {data?.[0].predictions.percent.away}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PredictionsInfo;
