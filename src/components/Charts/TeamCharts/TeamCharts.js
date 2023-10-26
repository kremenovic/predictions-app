import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(ChartDataLabels);

const TeamCharts = ({ data, team }) => {
  const [color1, setColor1] = useState();
  const [color2, setColor2] = useState();
  const [color3, setColor3] = useState();

  const colors = () => {
    if (team === "home") {
      setColor1("#0F8DEB");
      setColor2("#4db3ff");
      setColor3("#72bef7");
    }
    if (team === "away") {
      setColor1("#F01E1F");
      setColor2("#fb5051");
      setColor3("#ef8181");
    }
  };

  useEffect(() => {
    colors();
  });
  const chartOptions = {
    plugins: {
      datalabels: {
        color: "white",
        display: true,
      },
      legend: {
        labels: {
          color: "white",
        },
      },
    },
  };
  const goalsForBarData = {
    labels: Object.keys(data.goals.for.minute),
    datasets: [
      {
        label: "Goals For",
        data: Object.values(data.goals.for.minute).map((item) => item.total),
        backgroundColor: color1,
        borderColor: color1,
        borderWidth: 1,
      },
    ],
  };

  const goalsAgainstBarData = {
    labels: Object.keys(data.goals.against.minute),
    datasets: [
      {
        label: "Goals Against",
        data: Object.values(data.goals.against.minute).map(
          (item) => item.total
        ),
        backgroundColor: color1,
        borderColor: color1,
        borderWidth: 1,
      },
    ],
  };

  const yellowCardsAreaData = {
    labels: Object.keys(data.cards.yellow),
    datasets: [
      {
        label: "Yellow Cards",
        data: Object.values(data.cards.yellow).map((item) => item.total),
        backgroundColor: color1,
        borderColor: color1,
        borderWidth: 1,
        fill: "origin", // This property creates the area chart effect
      },
    ],
  };

  const redCardsAreaData = {
    labels: Object.keys(data.cards.yellow),
    datasets: [
      {
        label: "Red Cards",
        data: Object.values(data.cards.red).map((item) => item.total),
        backgroundColor: color1,
        borderColor: color1,
        borderWidth: 1,
        fill: "origin", // This property creates the area chart effect
      },
    ],
  };

  const winsLosesBarData = {
    labels: ["Home", "Away"],
    datasets: [
      {
        label: "Wins",
        data: [data.fixtures.wins.home, data.fixtures.wins.away],
        backgroundColor: color1,
        borderColor: color1,
        borderWidth: 1,
      },
      {
        label: "Loses",
        data: [data.fixtures.loses.home, data.fixtures.loses.away],
        backgroundColor: color2,
        borderColor: color2,
        borderWidth: 1,
      },
      {
        label: "Draws",
        data: [data.fixtures.draws.home, data.fixtures.draws.away],
        backgroundColor: color3,
        borderColor: color3,
        borderWidth: 1,
      },
    ],
  };

  const cleanSheetBarData = {
    labels: ["Home", "Away"],
    datasets: [
      {
        label: "Home & Away",
        data: [data.clean_sheet.home, data.clean_sheet.away],
        backgroundColor: [color1, color2],
        borderColor: [color1, color2],
        borderWidth: 1,
      },
    ],
  };

  const formationsBarData = {
    labels: data.lineups.map((item) => item.formation),
    datasets: [
      {
        label: "Formations",
        data: data.lineups.map((item) => item.played),
        backgroundColor: color1,
        borderColor: color1,
        borderWidth: 1,
      },
    ],
  };
  const penaltyBarData = {
    labels: ["Missed", "Scored"],
    datasets: [
      {
        label: "Penalties",
        data: [data.penalty.missed.total, data.penalty.scored.total],
        backgroundColor: [color1, color2],
        borderColor: [color1, color2],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className=" dark-bg rounded p-4 md:p-6">
          <h2 className="text-white mb-6">Goals For</h2>
          <Bar data={goalsForBarData} options={chartOptions} />
        </div>
        <div className=" dark-bg rounded  p-4 md:p-6">
          <h2 className="text-white mb-6">Goals Against</h2>
          <Bar data={goalsAgainstBarData} options={chartOptions} />
        </div>
        <div className=" dark-bg rounded  p-4 md:p-6">
          <h2 className="text-white mb-6">Yellow Cards</h2>
          <Line data={yellowCardsAreaData} options={chartOptions} />
        </div>
        <div className=" dark-bg rounded  p-4 md:p-6">
          <h2 className="text-white mb-6">Red Cards</h2>
          <Line data={redCardsAreaData} options={chartOptions} />
        </div>
        <div className=" dark-bg rounded  p-4 md:p-6">
          <h2 className="text-white mb-6">Wins & Loses</h2>
          <Bar data={winsLosesBarData} options={chartOptions} />
        </div>
        <div className=" dark-bg rounded  p-4 md:p-6">
          <h2 className="text-white mb-6">Clean Sheets</h2>
          <Bar data={cleanSheetBarData} options={chartOptions} />
        </div>
        <div className=" dark-bg rounded  p-4 md:p-6">
          <h2 className="text-white mb-6">Penalties</h2>
          <Bar data={penaltyBarData} options={chartOptions} />
        </div>
        <div className=" dark-bg rounded  p-4 md:p-6">
          <h2 className="text-white mb-6">Formations</h2>
          <Bar data={formationsBarData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default TeamCharts;
