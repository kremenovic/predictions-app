import { createSlice } from "@reduxjs/toolkit";
import { fetchSingleGameData } from "./singleGameThunk";
import { fetchStandingsData } from "./standingsThunk";

const initialState = {
  selectedLeague: {
    id: 39,
    name: "Premier League",
    country: "england",
    season: 2022,
  },
  selectedGame: { date: null, referee: null, city: null, stadium: null },
  selectedDate: new Date().toISOString(),
  isCalendarOpen: false,
  data: [],
  standingsData: [],
  loading: false,
  error: null,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
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
    showCalendar: (state) => {
      state.isCalendarOpen = !state.isCalendarOpen;
    },
    changeDate: (state, { payload }) => {
      state.selectedDate = payload;
    },
    setData: (state, { payload }) => {
      state.data = payload;
    },
    setStandings: (state, { payload }) => {
      state.standingsData = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleGameData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleGameData.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      })
      .addCase(fetchSingleGameData.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(fetchStandingsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStandingsData.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.standingsData = payload;
      })
      .addCase(fetchStandingsData.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const {
  selectLeague,
  selectGame,
  showCalendar,
  changeDate,
  setData,
  setStandings,
} = gameSlice.actions;

export default gameSlice.reducer;