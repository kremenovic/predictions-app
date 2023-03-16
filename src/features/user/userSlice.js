import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  isMobileNavOpen: false,
  isMobileLeagueOpen: false,
  selectedLeague: { id: 39, name: "Premier League", country: "england" },
  selectedDate: new Date().toISOString(),
  isCalendarOpen: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    showMobileNav: (state) => {
      state.isMobileNavOpen = !state.isMobileNavOpen;
    },
    selectLeague: (state, { payload }) => {
      const { id, leagueName: name, country } = payload;
      state.selectedLeague = { ...state.selectedLeague, id, name, country };
    },
    showMobileLeague: (state) => {
      state.isMobileLeagueOpen = !state.isMobileLeagueOpen;
    },
    showCalendar: (state) => {
      state.isCalendarOpen = !state.isCalendarOpen;
    },
    changeDate: (state, { payload }) => {
      state.selectedDate = payload;
    },
  },
});

export const {
  showMobileNav,
  selectLeague,
  showMobileLeague,
  showCalendar,
  changeDate,
} = userSlice.actions;
export default userSlice.reducer;
