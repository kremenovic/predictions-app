import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useSelector, useDispatch } from "react-redux";
import { showMobileLeague } from "../../features/user/userSlice";
import Leagues from "./Leagues";
import leagues from "../../utils/leagues";
const MobileLeagues = () => {
    const dispatch = useDispatch();
    const {
        selectedLeague: { name: leagueName, country, path },
    } = useSelector((store) => store.game);
    const { isMobileLeagueOpen } = useSelector((store) => store.user);
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const [defaultPath, setDefaultPath] = useState();

    const handleFilterClick = () => {
        dispatch(showMobileLeague());
    };

    useEffect(() => {
        if (!path) {
            const getPath = leagues.filter((pathLink) => {
                if (pathLink.countryName == country) {
                    return pathLink;
                }
            });
            setDefaultPath({
                path: getPath[0]?.path,
            });
        }
    }, []);

    return (
        <>
            <div className="flex justify-between w-full mb-2">
                <div className="flex items-center">
                    <img
                        src={path || defaultPath?.path}
                        alt=""
                        className="w-6 mr-2 lg:w-8"
                    />
                    <div className="flex flex-col">
                        <h4 className="text-white text-base w-max lg:text-lg">
                            {leagueName}{" "}
                            <sup className="custom-gray text-xs capitalize">
                                {country}
                            </sup>
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
            {/* {isMobileLeagueOpen && <Leagues isMobile={isMobile} />} */}
            {isMobileLeagueOpen ? <Leagues isMobile={isMobile} /> : null}
        </>
    );
};

export default MobileLeagues;
