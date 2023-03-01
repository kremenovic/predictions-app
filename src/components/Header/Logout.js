import React, { useState } from "react";
import { FaUserCircle, FaAngleDown } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
const Logout = () => {
  const [show, setShow] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div className={!isMobile ? "mr-8 relative" : "ml-8 relative"}>
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="user-btn btn"
      >
        <FaUserCircle className="text-xl" /> Stephen
        <FaAngleDown className="text-medium" />
      </button>
      <div className={show ? "dropdown show" : "dropdown"}>
        <button type="button" className="btn">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;
