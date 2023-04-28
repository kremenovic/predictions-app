import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchStandingsData = createAsyncThunk(
  "game/fetchStandingsData",
  async ({ leagueID, leagueSeason }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `https://v3.football.api-sports.io/standings?league=${leagueID}&season=${leagueSeason}`,
        {
          headers: {
            "x-rapidapi-key": process.env.REACT_APP_RAPID_KEY,
            "x-rapidapi-host": process.env.REACT_APP_RAPID_HOST,
          },
        }
      );
      const data = res.data.response;
      localStorage.setItem(
        `Standings-${leagueID}-${leagueSeason}`,
        JSON.stringify(data)
      );
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
