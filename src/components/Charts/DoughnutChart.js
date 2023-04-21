import React from "react";
import Chart from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
Chart.register(ChartDataLabels);

const DoughnutChart = ({ data = {} }) => {
  const chartData = {
    labels: ["", ""],
    datasets: [
      {
        data: [data.home, data.away],
        backgroundColor: ["#0F8DEB", "#F01E1F"],
        hoverBackgroundColor: ["#0F8DEB", "#F01E1F"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false,
      onClick: () => {},
    },
    title: {
      display: false,
      text: "Goals",
    },
    hover: {
      mode: null,
    },
    plugins: {
      datalabels: {
        color: "#fff",
        font: {
          weight: "bold",
        },
      },
    },
    tooltips: {
      enabled: false,
      callbacks: {
        beforeLabel: () => "",
        afterLabel: () => "",
      },
    },
  };
  return (
    <div style={{ width: "100%", height: "350px" }}>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default DoughnutChart;
