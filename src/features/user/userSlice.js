import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  isMobileNavOpen: false,
  isMobileLeagueOpen: false,
  selectedLeague: {
    id: 39,
    name: "Premier League",
    country: "england",
    season: 2022,
  },
  selectedGame: { date: null, referee: null, city: null, stadium: null },
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
    selectGame: (state, { payload }) => {
      const {
        fixture: { date, referee, venue },
      } = payload;
      state.selectedGame = {
        ...state.selectedGame,
        date,
        referee,
        city: venue.city,
        stadium: venue.name,
      };
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
  selectGame,
  showMobileLeague,
  showCalendar,
  changeDate,
} = userSlice.actions;
export default userSlice.reducer;
