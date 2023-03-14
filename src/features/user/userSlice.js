import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  isMobileNavOpen: false,
  isMobileLeagueOpen: false,
  selectedLeague: 39,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    showMobileNav: (state) => {
      state.isMobileNavOpen = !state.isMobileNavOpen;
    },
    selectLeague: (state, action) => {
      state.selectedLeague = action.payload;
    },
    showMobileLeague: (state) => {
      state.isMobileLeagueOpen = !state.isMobileLeagueOpen;
    },
  },
});

export const { showMobileNav, selectLeague, showMobileLeague } =
  userSlice.actions;
export default userSlice.reducer;
