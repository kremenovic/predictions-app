import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import MobileNavigation from "../../components/Header/MobileNavigation";
const SharedLayout = () => {
  return (
    <main className="dashboard">
      <MobileNavigation />
      <Header />
      <div className="dashboard-page">
        <Outlet />
      </div>
    </main>
  );
};

export default SharedLayout;
