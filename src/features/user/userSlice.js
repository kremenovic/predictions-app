import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  isMobileNavOpen: false,
  isMobileLeagueOpen: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    showMobileNav: (state) => {
      state.isMobileNavOpen = !state.isMobileNavOpen;
    },

    showMobileLeague: (state) => {
      state.isMobileLeagueOpen = !state.isMobileLeagueOpen;
    },
  },
});

export const { showMobileNav, showMobileLeague } = userSlice.actions;
export default userSlice.reducer;
