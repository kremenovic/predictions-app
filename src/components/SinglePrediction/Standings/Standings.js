import React from "react";

const Standings = ({ standingsArray, index, data }) => {
  return (
    <div
      className="mb-3 mt-6 rounded draw-bg p-3 last:mb-0 overflow-auto"
      key={index}
    >
      <table className=" mobileTableWidth md:w-full">
        <thead>
          <tr className="border-b-2">
            <th className="text-center text-white">#</th>
            <th className="w-40 text-center text-white">TEAM</th>
            <th className="text-center text-white">MP</th>
            <th className="text-center text-white">W</th>
            <th className="text-center text-white">D</th>
            <th className="text-center text-white">L</th>
            <th className="text-center text-white">G</th>
            <th className="text-center text-white">PTS</th>
            <th className="text-center text-white">FORM</th>
            <th className="text-center text-white">GROUP</th>
          </tr>
        </thead>
        <tbody>
          {standingsArray.map((item, i) => (
            <tr key={i}>
              <td
                className={`text-center text-white py-2 ${
                  item.team.name === data?.[0].teams.away.name ||
                  item.team.name === data?.[0].teams.home.name
                    ? "dark-bg"
                    : ""
                }`}
              >
                {item.rank}.
              </td>
              <td
                className={`w-40 text-center text-white py-2 ${
                  item.team.name === data?.[0].teams.away.name ||
                  item.team.name === data?.[0].teams.home.name
                    ? "dark-bg"
                    : ""
                }`}
              >
                {item.team.name}
              </td>
              <td
                className={`text-center text-white py-2 ${
                  item.team.name === data?.[0].teams.away.name ||
                  item.team.name === data?.[0].teams.home.name
                    ? "dark-bg"
                    : ""
                }`}
              >
                {item.all.played}
              </td>
              <td
                className={`text-center text-white py-2 ${
                  item.team.name === data?.[0].teams.away.name ||
                  item.team.name === data?.[0].teams.home.name
                    ? "dark-bg"
                    : ""
                }`}
              >
                {item.all.win}
              </td>
              <td
                className={`text-center text-white py-2 ${
                  item.team.name === data?.[0].teams.away.name ||
                  item.team.name === data?.[0].teams.home.name
                    ? "dark-bg"
                    : ""
                }`}
              >
                {item.all.draw}
              </td>
              <td
                className={`text-center text-white py-2 ${
                  item.team.name === data?.[0].teams.away.name ||
                  item.team.name === data?.[0].teams.home.name
                    ? "dark-bg"
                    : ""
                }`}
              >
                {item.all.lose}
              </td>
              <td
                className={`text-center text-white py-2 ${
                  item.team.name === data?.[0].teams.away.name ||
                  item.team.name === data?.[0].teams.home.name
                    ? "dark-bg"
                    : ""
                }`}
              >
                {item.all.goals.for}
              </td>
              <td
                className={`text-center text-white py-2 ${
                  item.team.name === data?.[0].teams.away.name ||
                  item.team.name === data?.[0].teams.home.name
                    ? "dark-bg"
                    : ""
                }`}
              >
                {item.all.goals.against}
              </td>
              <td
                className={`text-center text-white py-2 ${
                  item.team.name === data?.[0].teams.away.name ||
                  item.team.name === data?.[0].teams.home.name
                    ? "dark-bg"
                    : ""
                }`}
              >
                {item.form}
              </td>
              <td
                className={`text-center text-white py-2 ${
                  item.team.name === data?.[0].teams.away.name ||
                  item.team.name === data?.[0].teams.home.name
                    ? "dark-bg"
                    : ""
                }`}
              >
                {item.group}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Standings;
