import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";

const SharedLayout = () => {
  return (
    <main className="dashboard">
      <Header />
      <div className="dashboard-page">
        <Outlet />
      </div>
    </main>
  );
};

export default SharedLayout;
