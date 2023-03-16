import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { showCalendar, changeDate } from "../../features/user/userSlice";
import { FaCalendarAlt } from "react-icons/fa";
const DateFilter = () => {
  const [currentDate, setCurrentDate] = useState();
  const dispatch = useDispatch();
  const { isCalendarOpen, selectedDate } = useSelector((store) => store.user);
  const toggle = () => {
    dispatch(showCalendar());
  };
  const handleChangeDate = (date) => {
    toggle();
    dispatch(changeDate(date.toISOString()));
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
  }, [isCalendarOpen]);
  return (
    <div className="relative w-full lg:w-auto">
      <div
        className="relative cursor-pointer mt-2 w-full lg:w-auto lg:mt-0"
        onClick={toggle}
      >
        <input
          type="text"
          id="issueDate"
          className="border dark-bg cursor-pointer relative h-12 mt-2 w-full custom-gray px-3 focus:outline-none focus:border-purple-500 rounded-lg"
          value={moment(selectedDate).format("DD MMM YYYY")}
          disabled
        />
        <FaCalendarAlt className="absolute center-icon custom-gray text-sm" />
      </div>
      <div
        className={`flex absolute z-50  bg-white mb-5 flex-col calendar-alignment ${
          isCalendarOpen ? "flex" : "hidden"
        }`}
      >
        <div>
          <Calendar
            onChange={handleChangeDate}
            value={new Date(selectedDate)}
            showNavigation={false}
            showNeighboringMonth={false}
            tileDisabled={tileDisabled}
          />
        </div>
      </div>
    </div>
  );
};

export default DateFilter;
