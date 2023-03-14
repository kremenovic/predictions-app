import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectLeague, showMobileLeague } from "../../features/user/userSlice";
import { useMediaQuery } from "react-responsive";
import leagues from "../../utils/leagues";
const Leagues = ({ isMobile }) => {
  const dispatch = useDispatch();
  const { selectedLeague } = useSelector((store) => store.user);

  const handleLeagueClick = (id) => {
    dispatch(selectLeague(id));
    if (isMobile) {
      dispatch(showMobileLeague());
    }
  };
  return (
    <section className="leagues w-full rounded p-5 dark-bg h-fit lg:w-3/12">
      <h1 className="mb-5 text-xl text-white ">Leagues</h1>
      <ul>
        {leagues.map((league) => {
          const { id, leagueName, path } = league;
          const active = id === selectedLeague ? "active" : "";
          return (
            <li
              key={id}
              className={`flex cursor-pointer pb-4 last:pb-0 hover:translate-x-1 transition-all duration-300 ${active}`}
              onClick={() => {
                handleLeagueClick(id);
              }}
            >
              <img src={path} alt={leagueName} className="w-6 mr-2" />
              {leagueName}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Leagues;
