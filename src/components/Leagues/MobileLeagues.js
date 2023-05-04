import React from "react";
import { useMediaQuery } from "react-responsive";
import { useSelector, useDispatch } from "react-redux";
import { showMobileLeague } from "../../features/user/userSlice";
import Leagues from "./Leagues";
import {
  albania,
  armenia,
  argentina,
  austria,
  australia,
  bosnia,
  belgium,
  bulgaria,
  brazil,
  switzerland,
  denmark,
  estonia,
  england,
  france,
  germany,
  greece,
  croatia,
  ireland,
  italy,
  mexico,
  netherland,
  norway,
  poland,
  portugal,
  romania,
  serbia,
  russia,
  slovenia,
  slovakia,
  spain,
  turkey,
} from "../../assets/leagues/countries";
const MobileLeagues = () => {
  const dispatch = useDispatch();
  const {
    selectedLeague: { name, country },
  } = useSelector((store) => store.game);
  const { isMobileLeagueOpen } = useSelector((store) => store.user);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const handleFilterClick = () => {
    console.log("mobile filter click");
    dispatch(showMobileLeague());
  };

  const countryObject = {
    albania,
    armenia,
    argentina,
    austria,
    australia,
    bosnia,
    belgium,
    bulgaria,
    brazil,
    switzerland,
    denmark,
    estonia,
    england,
    france,
    germany,
    greece,
    croatia,
    ireland,
    italy,
    mexico,
    netherland,
    norway,
    poland,
    portugal,
    romania,
    serbia,
    russia,
    slovenia,
    slovakia,
    spain,
    turkey,
  };

  const countryImage = countryObject[country];

  return (
    <>
      <div className="flex justify-between w-full mb-2">
        <div className="flex items-center">
          <img src={countryImage} alt="england" className="w-6 mr-2 lg:w-8" />
          <div className="flex flex-col">
            <h4 className="text-white text-base w-max lg:text-lg">
              {name}{" "}
              <sup className="custom-gray text-xs capitalize">{country}</sup>
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
