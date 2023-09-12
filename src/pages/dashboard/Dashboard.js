import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { db } from "../../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { useMediaQuery } from "react-responsive";
import { useSelector, useDispatch } from "react-redux";
import Leagues from "../../components/Leagues/Leagues";
import Banner from "../../components/Banner/Banner";
import Predictions from "../../components/Predictions/Predictions";
import DateFilter from "../../components/DateFilter/DateFilter";
import MobileLeagues from "../../components/Leagues/MobileLeagues";
import Loading from "../../components/Loading/Loading";
import {
    selectGame,
    setLeagueGames,
    selectLeague,
    setData,
} from "../../features/game/gameSlice";
import { fetchLeagueGamesData } from "../../features/game/leagueGamesThunk";
const Dashboard = () => {
    const dispatch = useDispatch();
    const {
        selectedLeague: { id },
        selectedDate,
        leagueGamesData: data,
        loading,
    } = useSelector((store) => store.game);
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const formatedDate = moment(new Date(selectedDate)).format("YYYY-MM-DD");
    const handleLeagueSelection = (fixture) => {
        dispatch(selectGame({ fixture }));
    };

    useEffect(() => {
        const fetchDataFromFirestore = async () => {
            try {
                const docRef = doc(
                    db,
                    "allGames",
                    `footballData-${id}-${formatedDate}`
                );
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    dispatch(setLeagueGames(docSnap.data().data));
                } else {
                    dispatch(
                        fetchLeagueGamesData({
                            id,
                            formatedDate,
                        })
                    );
                }
            } catch (error) {
                console.error("Error fetching data from Firestore: ", error);
            }
        };

        fetchDataFromFirestore();
    }, [id, formatedDate, dispatch]);

    return (
        <div className="main-section flex flex-col gap-4 p-5 lg:flex-row">
            {!isMobile ? <Leagues /> : null}
            <section className="games w-full rounded flex gap-4 flex-col">
                <div className="ad-banner ">
                    <Banner />
                </div>
                <div className="flex justify-between items-center flex-col lg:flex-row">
                    <MobileLeagues />
                    <DateFilter />
                </div>
                <div className="games dark-bg rounded p-5 h-fit flex flex-col">
                    {loading ? (
                        <Loading />
                    ) : data.length === 0 ? (
                        <div className="empty-data-message">
                            <p className="text-white text-center">
                                No games available for current date.
                            </p>
                        </div>
                    ) : (
                        [...data]
                            .sort(
                                (a, b) =>
                                    new Date(a.fixture.date) -
                                    new Date(b.fixture.date)
                            )
                            .map((single, index) => {
                                const { fixture, teams } = single;
                                return (
                                    <Link
                                        key={index}
                                        to={`/dashboard/prediction/${fixture.id}`}
                                        className="mb-7 last:mb-0"
                                        onClick={() =>
                                            handleLeagueSelection(fixture)
                                        }
                                    >
                                        <Predictions
                                            fixture={fixture}
                                            teams={teams}
                                        />
                                    </Link>
                                );
                            })
                    )}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
