import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
const Logout = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div className="flex flex-row mt-6 justify-center md:gap-5 md:mt-0">
      {!isMobile ? (
        <Link to="/dashboard/settings">
          <button
            type="button"
            className="user-btn btn hover:opacity-90 transition-all duration-200"
          >
            <FaUserCircle className="text-xl" /> Stephen
          </button>
        </Link>
      ) : null}

      <button className="text-white bg btn away-bg px-4 hover:opacity-90 transition-all duration-200">
        Sign Out
      </button>
    </div>
  );
};

export default Logout;
