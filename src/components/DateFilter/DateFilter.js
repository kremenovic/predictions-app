import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import { FaCalendarAlt } from "react-icons/fa";
const DateFilter = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentDate, setCurrentDate] = useState();
  const [date, setDate] = useState(new Date());
  const handleShowCalendar = () => {
    setShowCalendar(!showCalendar);
  };
  const handleChangeDate = (date) => {
    setShowCalendar(false);
    setDate(date);
  };

  const getYesterday = () => {
    let today = new Date();
    let yesterday = today;
    let newDate = yesterday.setDate(today.getDate() - 1);
    setCurrentDate(newDate);
  };

  const tileDisabled = ({ date }) => {
    return date < currentDate;
  };

  useEffect(() => {
    getYesterday();
  }, [showCalendar]);
  return (
    <>
      <div
        className="relative cursor-pointer mt-2 w-full lg:w-auto lg:mt-0"
        onClick={handleShowCalendar}
      >
        <input
          type="text"
          id="issueDate"
          className="border dark-bg cursor-pointer relative h-12 mt-2 w-full custom-gray px-3 focus:outline-none focus:border-purple-500 rounded-lg"
          value={moment(date).format("DD MMM YYYY")}
          disabled
        />
        <FaCalendarAlt className="absolute center-icon custom-gray text-sm" />
      </div>
      <div
        className={`flex absolute z-50  bg-white mb-5 flex-col calendar-alignment ${
          showCalendar ? "flex" : "hidden"
        }`}
      >
        <div>
          <Calendar
            onChange={handleChangeDate}
            value={date}
            showNavigation={false}
            showNeighboringMonth={false}
            tileDisabled={tileDisabled}
          />
        </div>
      </div>
    </>
  );
};

export default DateFilter;
