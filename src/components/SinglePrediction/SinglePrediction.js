import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Moment from "react-moment";
import "moment-timezone";
import Loading from "../Loading/Loading";
import { FaRegClock, FaLongArrowAltLeft, FaCircle } from "react-icons/fa";
import { GiSoccerField } from "react-icons/gi";
import CustomLineChart from "../Charts/CustomLineChart";
import DoughnutChart from "../Charts/DoughnutChart";
import Standings from "./Standings/Standings";
import HeadToHead from "./HeadToHead/HeadToHead";
import SectionTitle from "./SectionTitle/SectionTitle";
import PredictionsInfo from "./PredictionsInfo/PredictionsInfo";
import PieChart from "../Charts/PieChart";
import TeamCharts from "../Charts/TeamCharts/TeamCharts";
import { setLoading } from "../../features/game/gameSlice";
import { fetchSingleGameData } from "../../features/game/singleGameThunk";
import { fetchStandingsData } from "../../features/game/standingsThunk";
const SinglePrediction = () => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState("overview");
    const [activeHead, setActiveHead] = useState("all");
    const {
        selectedGame,
        selectedLeague,
        data,
        loading,
        error,
        standingsData,
        isStateInitializedFromLocalStorage,
    } = useSelector((store) => store.game);
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
    const shortFieldMap = {
        Form: "form",
        Attack: "att",
        Defense: "def",
    };

    useEffect(() => {
        const fetchData = async () => {
            if (isStateInitializedFromLocalStorage) {
                dispatch(setLoading(true));
                try {
                    await dispatch(fetchSingleGameData(id));
                    await dispatch(
                        fetchStandingsData({
                            leagueID: selectedLeague.id,
                            leagueSeason: selectedLeague.season,
                        })
                    );
                    // console.log("b");
                } catch (error) {
                    console.error("Error fetching data:", error);
                }

                dispatch(setLoading(false));
            }
        };

        fetchData();
    }, [
        isStateInitializedFromLocalStorage,
        id,
        dispatch,
        selectedLeague.id,
        selectedLeague.season,
    ]);

    const standings = standingsData?.[0]?.league?.standings;

    if (loading) {
        return <Loading />;
    }
    if (error) {
        return <div>{error.message}</div>;
    }

    return (
        <div className="p-5">
            {data?.[0] && (
                <div className="main-section  ">
                    <div className="flex justify-between border-b custom-border pb-4">
                        <div className="custom-gray font-semibold flex">
                            <Link
                                to="/dashboard/"
                                className="flex items-center"
                            >
                                <FaLongArrowAltLeft className="mr-2" /> Back
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col pt-4 pb-4 border-b custom-border">
                        <div className="text-center flex justify-between items-center flex-col max-w-5xl w-full mx-auto mb-16 md:flex-row">
                            <div className="flex items-center custom-gray mb-5 flex-col md:flex-row md:mb-0">
                                <FaRegClock className="mr-2" />
                                <p>
                                    {moment(selectedGame?.date).format(
                                        "DD-MM-YYYY"
                                    )}{" "}
                                    -{" "}
                                    <Moment format="h:mm z" tz="CET">
                                        {selectedGame?.date}
                                    </Moment>
                                </p>
                            </div>
                            <div className="flex items-center custom-gray flex-col md:flex-row">
                                <GiSoccerField className="mr-2" />
                                <p>
                                    {selectedGame?.stadium},{" "}
                                    {selectedGame?.city}
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 justify-items-center items-center max-w-5xl w-full mx-auto ">
                            <div className="text-center">
                                <img
                                    src={data?.[0]?.teams?.home.logo}
                                    alt={data?.[0].teams?.home.name}
                                    className="w-24 text-center mx-auto md:w-28"
                                />
                                <h2 className="text-white text-lg mt-2 flex flex-col items-center md:text-xl md:flex-row">
                                    <FaCircle className="home-color mr-1 text-xs" />
                                    {data?.[0].teams?.home.name}
                                </h2>
                            </div>
                            <div className="versus text-center w-fit">
                                <p className="text-white text-base">VS</p>
                            </div>
                            <div className="text-center">
                                <img
                                    src={data?.[0].teams?.away.logo}
                                    alt={data?.[0].teams?.away.name}
                                    className="w-24 text-center mx-auto md:w-28"
                                />
                                <h2 className="text-white text-lg mt-2 flex flex-col items-center md:text-xl md:flex-row">
                                    <FaCircle className="away-color mr-1 text-xs" />
                                    {data?.[0].teams?.away.name}
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="border-b custom-border py-4">
                        <div className="flex flex-row gap-5 justify-center">
                            <button
                                className={`custom-gray hover:underline  transition-all duration-200 ${
                                    activeTab === "overview"
                                        ? "font-bold underline"
                                        : ""
                                }`}
                                onClick={() => setActiveTab("overview")}
                            >
                                Overview
                            </button>
                            <button
                                className={`custom-gray hover:underline transition-all duration-200 ${
                                    activeTab === "teams"
                                        ? "font-bold underline"
                                        : ""
                                }`}
                                onClick={() => setActiveTab("teams")}
                            >
                                Teams
                            </button>
                            <button
                                className={`custom-gray hover:underline  transition-all duration-200 ${
                                    activeTab === "h2h"
                                        ? "font-bold underline"
                                        : ""
                                }`}
                                onClick={() => setActiveTab("h2h")}
                            >
                                H2H
                            </button>
                            <button
                                className={`custom-gray hover:underline transition-all duration-200 ${
                                    activeTab === "standings"
                                        ? "font-bold underline"
                                        : ""
                                }`}
                                onClick={() => setActiveTab("standings")}
                            >
                                Standings
                            </button>
                        </div>
                    </div>
                    {activeTab === "overview" && (
                        <div className="overviewSection">
                            {/* Who's gonna win  */}
                            <PredictionsInfo data={data} />
                            <div className="charts grid grid-cols-1 gap-5 mt-6 max-w-5xl mx-auto md:grid-cols-2">
                                {/* Comparison */}
                                <div className="dark-bg rounded p-4 md:p-6">
                                    <SectionTitle
                                        data={data}
                                        title="Comparison"
                                    />
                                    {Object.keys(fieldMap).map(
                                        (customFieldName, index) => {
                                            const propertyName =
                                                fieldMap[customFieldName];
                                            return (
                                                <CustomLineChart
                                                    home={
                                                        data?.[0]?.comparison?.[
                                                            propertyName
                                                        ]?.home ?? ""
                                                    }
                                                    away={
                                                        data?.[0]?.comparison?.[
                                                            propertyName
                                                        ]?.away ?? ""
                                                    }
                                                    title={customFieldName}
                                                    key={index}
                                                />
                                            );
                                        }
                                    )}
                                </div>
                                {/* Goals */}
                                <div className=" dark-bg rounded p-4 md:p-6">
                                    <SectionTitle data={data} title="Goals" />
                                    <p className="draw-bg rounded custom-gray italic p-3 text-center mx-auto mt-5 mb-5 text-sm md:mb-16">
                                        In order to clarify this data here for
                                        example -1.5 means that there will be a
                                        maximum of 1.5 goals in the game, i.e :
                                        1 goal.
                                    </p>
                                    <DoughnutChart
                                        data={data?.[0]?.predictions.goals}
                                        labels={{
                                            label1: "Home",
                                            label2: "Away",
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Head to Head */}
                    {activeTab === "h2h" && (
                        <div className="h2hSection">
                            {/* Who's gonna win  */}
                            <PredictionsInfo data={data} />
                            <div className="charts mt-6 max-w-5xl mx-auto">
                                <div className="dark-bg rounded p-4 md:p-6">
                                    <SectionTitle
                                        data={data}
                                        title="Head to Head"
                                    />
                                    {data?.[0]?.h2h.map((prevGame, index) => {
                                        const className =
                                            index % 2 === 0
                                                ? "draw-bg"
                                                : "no-bg";
                                        return (
                                            <HeadToHead
                                                prevGame={prevGame}
                                                className={className}
                                                key={index}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Standings */}
                    {activeTab === "standings" && (
                        <div className="standingsSection">
                            {/* Who's gonna win  */}
                            <PredictionsInfo data={data} />
                            <div className="charts mt-6 max-w-5xl mx-auto">
                                <div className="dark-bg rounded p-4 md:p-6">
                                    <SectionTitle
                                        data={data}
                                        title="Standings"
                                    />
                                    <div className="container">
                                        {standings &&
                                            standings.map(
                                                (standingsArray, index) => (
                                                    <Standings
                                                        standingsArray={
                                                            standingsArray
                                                        }
                                                        index={index}
                                                        data={data}
                                                        key={index}
                                                    />
                                                )
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === "teams" && (
                        <div className="teamsSection">
                            {/* Who's gonna win  */}
                            <PredictionsInfo data={data} />
                            <div className="buttons flex gap-2 flex-col items-start mt-3 max-w-5xl mx-auto md:mt-6 md:items-center md:flex-row md:gap-5">
                                <button
                                    className={`text-white w-full flex justify-center bg btn no-bg px-4 hover:bg-gray-20 transition-all duration-200 md:w-auto ${
                                        activeHead === "all" ? "draw-bg" : ""
                                    }`}
                                    onClick={() => setActiveHead("all")}
                                >
                                    Last 5
                                </button>
                                <button
                                    className={`text-white w-full flex justify-center bg btn no-bg px-4 hover:bg-gray-20 transition-all duration-200 md:w-auto ${
                                        activeHead === "home" ? "draw-bg" : ""
                                    }`}
                                    onClick={() => setActiveHead("home")}
                                >
                                    {data?.[0].teams.home.name}
                                </button>
                                <button
                                    className={`text-white w-full flex justify-center bg btn no-bg px-4 hover:bg-gray-20 transition-all duration-200 md:w-auto ${
                                        activeHead === "away" ? "draw-bg" : ""
                                    }`}
                                    onClick={() => setActiveHead("away")}
                                >
                                    {data?.[0].teams.away.name}
                                </button>
                            </div>
                            {activeHead === "home" && (
                                <div className="charts grid grid-cols-1 gap-5 mt-6 max-w-5xl mx-auto">
                                    <TeamCharts
                                        data={data?.[0]?.teams.home.league}
                                        team="home"
                                    />
                                </div>
                            )}
                            {activeHead === "away" && (
                                <div className="charts grid grid-cols-1 gap-5 mt-6 max-w-5xl mx-auto">
                                    <TeamCharts
                                        data={data?.[0]?.teams.away.league}
                                        team="away"
                                    />
                                </div>
                            )}
                            {activeHead === "all" && (
                                <div className="charts grid grid-cols-1 gap-5 mt-6 max-w-5xl mx-auto">
                                    {/* Comparison */}
                                    <div className="dark-bg rounded p-4 md:p-6">
                                        <SectionTitle
                                            data={data}
                                            title="Last 5 Games"
                                        />
                                        {Object.keys(shortFieldMap).map(
                                            (customFieldName, index) => {
                                                const propertyName =
                                                    shortFieldMap[
                                                        customFieldName
                                                    ];
                                                return (
                                                    <CustomLineChart
                                                        home={
                                                            data?.[0]?.teams
                                                                .away.last_5[
                                                                propertyName
                                                            ] ?? ""
                                                        }
                                                        away={
                                                            data?.[0]?.teams
                                                                .home.last_5[
                                                                propertyName
                                                            ] ?? ""
                                                        }
                                                        title={customFieldName}
                                                        key={index}
                                                    />
                                                );
                                            }
                                        )}
                                    </div>
                                    {/* Goals */}
                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                        <div className=" dark-bg rounded p-4 md:p-6">
                                            <SectionTitle
                                                data={data}
                                                title="Last 5 Games GF"
                                            />
                                            <p className="draw-bg rounded custom-gray italic p-3 text-center mx-auto mt-5 mb-5 text-sm md:mb-16">
                                                GF equates to “goals for” and
                                                refers to the number of goals a
                                                team has scored.
                                            </p>
                                            <PieChart
                                                dataAway={
                                                    data?.[0]?.teams?.away
                                                        ?.last_5?.goals?.for
                                                }
                                                dataHome={
                                                    data?.[0]?.teams.home
                                                        ?.last_5?.goals?.for
                                                }
                                                labels={{
                                                    label1: "Home Total",
                                                    label2: "Away Total",
                                                }}
                                            />
                                        </div>
                                        <div className=" dark-bg rounded  p-4 md:p-6">
                                            <SectionTitle
                                                data={data}
                                                title="Last 5 Games GA"
                                            />
                                            <p className="draw-bg rounded custom-gray italic p-3 text-center mx-auto mt-5 mb-5 text-sm md:mb-16">
                                                GA refers to “goals against” and
                                                is solely the number of goals a
                                                team has allowed to be scored
                                                against them.
                                            </p>
                                            <PieChart
                                                dataAway={
                                                    data?.[0]?.teams?.away
                                                        ?.last_5?.goals?.against
                                                }
                                                dataHome={
                                                    data?.[0]?.teams.home
                                                        ?.last_5?.goals?.against
                                                }
                                                labels={{
                                                    label1: "Home Total",
                                                    label2: "Away Total",
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SinglePrediction;
