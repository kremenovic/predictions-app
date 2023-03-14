import React from "react";
import { useMediaQuery } from "react-responsive";

import Leagues from "../../components/Leagues/Leagues";
import Banner from "../../components/Banner/Banner";
import Predictions from "../../components/Predictions/Predictions";
import DateFilter from "../../components/DateFilter/DateFilter";
import MobileLeagues from "../../components/Leagues/MobileLeagues";
const Dashboard = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

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
        <div className="games dark-bg rounded p-5 h-fit ">
          <Predictions />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
