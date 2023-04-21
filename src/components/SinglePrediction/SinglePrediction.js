import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import Moment from "react-moment";
import "moment-timezone";
import Loading from "../Loading/Loading";
import { FaRegClock, FaLongArrowAltLeft, FaCircle } from "react-icons/fa";
import { GiSoccerField, GiWhistle } from "react-icons/gi";
import CustomLineChart from "../Charts/CustomLineChart";
import DoughnutChart from "../Charts/DoughnutChart";
const SinglePrediction = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { selectedGame } = useSelector((store) => store.user);
  const { id } = useParams();
  const fieldMap = {
    Form: "form",
    Attack: "att",
    Defense: "def",
    "Poisson Distribution": "poisson_distribution",
    "Head-to-Head": "h2h",
    Goals: "goals",
    Total: "total",
  };
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://v3.football.api-sports.io/predictions?fixture=${id}`,
          {
            headers: {
              "x-rapidapi-key": "af40d37b524e0e1b5bd6aba34f37dd40",
              "x-rapidapi-host": "v3.football.api-sports.io",
            },
          }
        );
        const data = res.data.response;
        localStorage.setItem(`footballDataSingle-${id}`, JSON.stringify(data));
        setLoading(false);
        return data;
      } catch (error) {
        console.log(error);
        return null;
      }
    };
    const storedData = localStorage.getItem(`footballDataSingle-${id}`);
    if (storedData) {
      setData(JSON.parse(storedData));
      console.log("ls");
    } else {
      fetch().then((data) => setData(data));
      console.log("fetch");
    }
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="main-section p-5 ">
      <div className="flex justify-between border-b custom-border pb-4">
        <div className="custom-gray font-semibold ">
          <Link to="/dashboard/" className="flex items-center">
            <FaLongArrowAltLeft className="mr-2" /> Back
          </Link>
        </div>
        <div className="flex items-center">
          <img
            src={data?.[0]?.league.logo}
            alt={data?.[0]?.league.name}
            className="w-6 mr-2 lg:w-8 bg-white rounded-full"
          />
          <div className="flex flex-col">
            <h4 className="text-white text-base w-max lg:text-lg">
              {data?.[0]?.league.name}
              <sup className="custom-gray text-xs capitalize">
                {data?.[0]?.league.country}
              </sup>
            </h4>
          </div>
        </div>
        <div className="placeBet">Place bet</div>
      </div>
      {console.log(data?.[0])}
      <div className="flex flex-col pt-4 pb-4 border-b custom-border">
        <div className="text-center grid grid-cols-3 justify-items-center items-center max-w-8xl w-full mx-auto mb-16">
          <div className="flex items-center custom-gray">
            <FaRegClock className="mr-2" />
            <p>
              {moment(selectedGame.date).format("DD - MM - YYYY")} -{" "}
              <Moment format="h:mm z" tz="CET">
                {selectedGame.date}
              </Moment>
            </p>
          </div>
          <div className="flex items-center custom-gray">
            <GiSoccerField className="mr-2" />
            <p>
              {selectedGame.stadium}, {selectedGame.city}
            </p>
          </div>
          <div className="flex items-center custom-gray">
            <GiWhistle className="mr-2" />
            <p>{selectedGame.referee}</p>
          </div>
        </div>
        <div className="test-team grid grid-cols-3 justify-items-center items-center max-w-8xl w-full mx-auto ">
          <div className="text-center">
            <img
              src={data?.[0].teams.home.logo}
              alt={data?.[0].teams.home.name}
              className="w-28 text-center mx-auto"
            />
            <h2 className="text-white text-xl mt-2 flex items-center">
              <FaCircle className="home-color mr-1 text-xs" />
              {data?.[0].teams.home.name}
            </h2>
          </div>
          <div className="versus text-center w-fit">
            <p className="text-white text-base">VS</p>
          </div>
          <div className="text-center">
            <img
              src={data?.[0].teams.away.logo}
              alt={data?.[0].teams.away.name}
              className="w-28 text-center mx-auto"
            />
            <h2 className="text-white text-xl mt-2 flex items-center">
              <FaCircle className="away-color mr-1 text-xs" />
              {data?.[0].teams.away.name}
            </h2>
          </div>
        </div>
      </div>
      {/* Who's gonna win  */}
      <div className="prediction-info ">
        <div className="advice flex flex-col max-w-3xl mx-auto justify-center items-center py-4">
          <h1 className="custom-gray">
            Who will win {data?.[0].teams.home.name} or{" "}
            {data?.[0].teams.away.name}?
          </h1>
          <p className="custom-gray  text-sm mt-3 ">home or draw or away</p>
        </div>
        <div className="flex flex-row max-w-3xl mx-auto justify-center items-center gap-5 py-4 ">
          <div
            className="home-bg text-center rounded-lg"
            style={{ width: data?.[0].predictions.percent.home }}
          >
            <p className="text-xs text-white">
              {data?.[0].predictions.percent.home}
            </p>
          </div>
          <div
            className="draw-bg text-center rounded-lg"
            style={{ width: data?.[0].predictions.percent.draw }}
          >
            <p className="text-xs text-white">
              {data?.[0].predictions.percent.draw}
            </p>
          </div>
          <div
            className="away-bg text-center rounded-lg"
            style={{ width: data?.[0].predictions.percent.away }}
          >
            <p className="text-xs text-white">
              {data?.[0].predictions.percent.away}
            </p>
          </div>
        </div>
      </div>
      <div className="charts grid grid-cols-1 gap-5 mt-6 md:grid-cols-2">
        <div className="container dark-bg rounded  p-6">
          <div className="chartHead flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={data?.[0].teams.home.logo}
                alt={data?.[0].teams.home.name}
                className="w-8"
              />
              <FaCircle className="home-color mr-1 text-xs" />
            </div>
            <h3 className="text-white">Comparison</h3>
            <div className="flex items-center">
              <FaCircle className="away-color mr-1 text-xs" />
              <img
                src={data?.[0].teams.away.logo}
                alt={data?.[0].teams.away.name}
                className="w-8"
              />
            </div>
          </div>
          {Object.keys(fieldMap).map((customFieldName, index) => {
            const propertyName = fieldMap[customFieldName];
            return (
              <CustomLineChart
                home={data?.[0]?.comparison?.[propertyName]?.home ?? ""}
                away={data?.[0]?.comparison?.[propertyName]?.away ?? ""}
                title={customFieldName}
                key={index}
              />
            );
          })}
        </div>
        <div className="container dark-bg rounded  p-6">
          <div className="chartHead flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={data?.[0].teams.home.logo}
                alt={data?.[0].teams.home.name}
                className="w-8"
              />
              <FaCircle className="home-color mr-1 text-xs" />
            </div>
            <h3 className="text-white">Goals</h3>
            <div className="flex items-center">
              <FaCircle className="away-color mr-1 text-xs" />
              <img
                src={data?.[0].teams.away.logo}
                alt={data?.[0].teams.away.name}
                className="w-8"
              />
            </div>
          </div>
          <p className="draw-bg rounded custom-gray italic p-3 text-center mx-auto mt-5 mb-5 text-sm md:mb-16">
            In order to clarify this data here for example -1.5 means that there
            will be a maximum of 1.5 goals in the game, i.e : 1 goal.
          </p>
          <DoughnutChart data={data?.[0]?.predictions.goals} />
        </div>
        <div className="container dark-bg rounded  p-6">
          <div className="chartHead flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={data?.[0].teams.home.logo}
                alt={data?.[0].teams.home.name}
                className="w-8"
              />
              <FaCircle className="home-color mr-1 text-xs" />
            </div>
            <h3 className="text-white">Head-to-Head</h3>
            <div className="flex items-center">
              <FaCircle className="away-color mr-1 text-xs" />
              <img
                src={data?.[0].teams.away.logo}
                alt={data?.[0].teams.away.name}
                className="w-8"
              />
            </div>
          </div>
          {data?.[0]?.h2h.map((prevGame, index) => {
            const className = index % 2 === 0 ? "draw-bg" : "no-bg";
            return (
              <div
                className={`p-3 mt-6 rounded ${className}`}
                key={prevGame.fixture.id}
              >
                <div className="grid grid-cols-3 justify-items-center items-center">
                  <p className="text-white">{prevGame.teams.away.name}</p>
                  <p className="text-white flex flex-col justify-center text-center">
                    <span className="text-xs custom-gray">
                      ({prevGame.score.halftime.away} :{" "}
                      {prevGame.score.halftime.home})
                    </span>
                    {prevGame.goals.away} : {prevGame.goals.home}
                  </p>
                  <p className="text-white">{prevGame.teams.home.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SinglePrediction;
