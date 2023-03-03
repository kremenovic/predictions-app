import React from "react";
import Leagues from "../../components/Leagues/Leagues";
import Banner from "../../components/Banner/Banner";
const Dashboard = () => {
  return (
    <div className="main-section flex flex-col gap-4 p-5 lg:flex-row">
      <section className="leagues w-full rounded p-5 dark-bg h-fit lg:w-3/12">
        <h1 className="mb-5 text-xl text-white ">Leagues</h1>
        <Leagues />
      </section>
      <section className="games w-full rounded flex gap-4 flex-col">
        <div className="ad-banner ">
          <Banner />
        </div>
        <div className="games dark-bg rounded p-5 h-fit"> games here</div>
      </section>
      <section className="news dark-bg w-full rounded p-5 h-fit lg:w-2/6">
        news goes here
      </section>
    </div>
  );
};

export default Dashboard;
