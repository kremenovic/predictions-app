import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  isMobileNavOpen: false,
  isMobileLeagueOpen: false,
  selectedLeague: { id: 39, name: "Premier League", country: "england" },
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
  },
});

export const { showMobileNav, selectLeague, showMobileLeague } =
  userSlice.actions;
export default userSlice.reducer;
