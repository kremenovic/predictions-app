import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectLeague } from "../../features/game/gameSlice";
import { showMobileLeague } from "../../features/user/userSlice";
import leagues from "../../utils/leagues";
const Leagues = ({ isMobile }) => {
    const dispatch = useDispatch();
    const { selectedLeague } = useSelector((store) => store.game);
    const [currentLeague, setCurrentLeague] = useState();

    useEffect(() => {
        const savedLeague = JSON.parse(localStorage.getItem("selectedGame"));
        if (savedLeague) {
            dispatch(selectLeague(savedLeague));
        }

        if (currentLeague) {
            localStorage.setItem("selectedGame", JSON.stringify(currentLeague));
            dispatch(selectLeague(currentLeague));
        }
    }, [currentLeague, dispatch]);

    return (
        <section className="leagues w-full rounded p-5 dark-bg h-fit lg:w-3/12">
            <h1 className="mb-5 text-xl text-white ">Leagues</h1>
            <ul>
                {leagues.map((league) => {
                    const {
                        id,
                        leagueName,
                        path,
                        countryName: country,
                    } = league;
                    const active = id === selectedLeague.id ? "active" : "";
                    return (
                        <li
                            key={id}
                            className={`flex cursor-pointer pb-4 last:pb-0 hover:translate-x-1 transition-all duration-300 ${active}`}
                            onClick={() => {
                                setCurrentLeague({
                                    id,
                                    leagueName,
                                    country,
                                });
                            }}
                        >
                            <img
                                src={path}
                                alt={leagueName}
                                className="w-6 mr-2"
                            />
                            {leagueName}
                        </li>
                    );
                })}
            </ul>
        </section>
    );
};

export default Leagues;
