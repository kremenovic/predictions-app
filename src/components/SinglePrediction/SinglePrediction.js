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
import Standings from "./Standings/Standings";
import HeadToHead from "./HeadToHead/HeadToHead";
import SectionTitle from "./SectionTitle/SectionTitle";
import PredictionsInfo from "./PredictionsInfo/PredictionsInfo";
const SinglePrediction = () => {
  const [data, setData] = useState(null);
  const [standingsData, setStandingsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const { selectedGame, selectedLeague } = useSelector((store) => store.user);
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

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://v3.football.api-sports.io/standings?league=${selectedLeague.id}&season=${selectedLeague.season}`,
          {
            headers: {
              "x-rapidapi-key": "af40d37b524e0e1b5bd6aba34f37dd40",
              "x-rapidapi-host": "v3.football.api-sports.io",
            },
          }
        );
        const data = res.data.response;
        localStorage.setItem(
          `Standings-${selectedLeague.id}-${selectedLeague.season}`,
          JSON.stringify(data)
        );
        setLoading(false);
        return data;
      } catch (error) {
        console.log(error);
        return null;
      }
    };
    const getLocalData = () => {
      setLoading(true);
      const storedData = localStorage.getItem(
        `Standings-${selectedLeague.id}-${selectedLeague.season}`
      );
      if (storedData) {
        setStandingsData(JSON.parse(storedData));
        // console.log("ls");
        setLoading(false);
      } else {
        fetch().then((data) => setStandingsData(data));
        console.log("fetchs");
      }
    };
    getLocalData();
  }, []);

  const standings = standingsData?.[0]?.league?.standings;

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
              {moment(selectedGame.date).format("DD-MM-YYYY")} -{" "}
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
      <div className="border-b custom-border py-4">
        <div className="flex flex-row gap-5 justify-center">
          <button className="custom-gray">Overview</button>
          <button className="custom-gray">Head to Head</button>
          <button className="custom-gray">Standings</button>
          <button className="custom-gray">Test</button>
        </div>
      </div>
      {/* Who's gonna win  */}
      <PredictionsInfo data={data} />
      <div className="charts grid grid-cols-1 gap-5 mt-6 md:grid-cols-2">
        {/* Comparison */}
        <div className="container dark-bg rounded  p-6">
          <SectionTitle data={data} title="Comparison" />
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
        {/* Goals */}
        <div className="container dark-bg rounded  p-6">
          <SectionTitle data={data} title="Goals" />
          <p className="draw-bg rounded custom-gray italic p-3 text-center mx-auto mt-5 mb-5 text-sm md:mb-16">
            In order to clarify this data here for example -1.5 means that there
            will be a maximum of 1.5 goals in the game, i.e : 1 goal.
          </p>
          <DoughnutChart
            data={data?.[0]?.predictions.goals}
            labels={{ label1: "Home", label2: "Away" }}
          />
        </div>
        {/* Head to Head */}
        <div className="container dark-bg rounded  p-6">
          <SectionTitle data={data} title="Head to Head" />
          {data?.[0]?.h2h.map((prevGame, index) => {
            const className = index % 2 === 0 ? "draw-bg" : "no-bg";
            return <HeadToHead prevGame={prevGame} className={className} />;
          })}
        </div>
        {/* Standings */}
        <div className="container dark-bg rounded  p-6">
          <SectionTitle data={data} title="Standings" />
          <div className="container">
            {standings &&
              standings.map((standingsArray, index) => (
                <Standings
                  standingsArray={standingsArray}
                  index={index}
                  data={data}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePrediction;
