import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import { useSelector } from "react-redux";
import Leagues from "../../components/Leagues/Leagues";
import Banner from "../../components/Banner/Banner";
import Predictions from "../../components/Predictions/Predictions";
import DateFilter from "../../components/DateFilter/DateFilter";
import MobileLeagues from "../../components/Leagues/MobileLeagues";
import Loading from "../../components/Loading/Loading";
const Dashboard = () => {
  const {
    selectedLeague: { id },
  } = useSelector((store) => store.user);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://v3.football.api-sports.io/fixtures?league=${id}&season=2022&date=2023-03-18`,
          {
            headers: {
              "x-rapidapi-key": "af40d37b524e0e1b5bd6aba34f37dd40",
              "x-rapidapi-host": "v3.football.api-sports.io",
            },
          }
        );
        const data = res.data.response;
        localStorage.setItem(`footballData-${id}`, JSON.stringify(data));
        setLoading(false);
        return data;
      } catch (error) {
        console.log(error);
        return null;
      }
    };
    const storedData = localStorage.getItem(`footballData-${id}`);
    if (storedData) {
      setData(JSON.parse(storedData));
      console.log("ls");
    } else {
      fetch().then((data) => setData(data));
      console.log("fetch");
    }
  }, [id]);

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
          ) : (
            data
              ?.sort(
                (a, b) => new Date(a.fixture.date) - new Date(b.fixture.date)
              )
              .map((single, index) => {
                const { fixture, teams } = single;
                return (
                  <Link
                    key={index}
                    to={`/dashboard/prediction/${fixture.id}`}
                    className="mb-7 last:mb-0"
                  >
                    <Predictions fixture={fixture} teams={teams} />
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
