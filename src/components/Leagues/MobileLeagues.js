import React from "react";
import { useMediaQuery } from "react-responsive";
import { useSelector, useDispatch } from "react-redux";
import { showMobileLeague } from "../../features/user/userSlice";
import Leagues from "./Leagues";
import england from "../../assets/leagues/country-en.svg";
const MobileLeagues = () => {
  const dispatch = useDispatch();
  const { isMobileLeagueOpen } = useSelector((store) => store.user);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const handleFilterClick = () => {
    dispatch(showMobileLeague());
  };
  return (
    <>
      <div className="flex justify-between w-full mb-2">
        <div className="flex items-center">
          <img src={england} alt="england" className="w-6 mr-2 lg:w-8" />
          <div className="flex flex-col">
            <h4 className="text-white text-base w-max lg:text-lg">
              Premier League <sup className="custom-gray text-xs">England</sup>
            </h4>
          </div>
        </div>
        {isMobile ? (
          <div className="flex">
            <button
              className="btn filter-btn tracking-wider"
              onClick={handleFilterClick}
            >
              Filter
            </button>
          </div>
        ) : null}
      </div>
      {isMobileLeagueOpen && <Leagues isMobile={isMobile} />}
    </>
  );
};

export default MobileLeagues;
