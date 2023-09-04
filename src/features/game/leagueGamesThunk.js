import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchLeagueGamesData = createAsyncThunk(
    "game/fetchLeagueGamesData",
    async ({ id, formatedDate }, { rejectWithValue }) => {
        try {
            // const res = await axios.get(
            //     `https://v3.football.api-sports.io/fixtures?league=${id}&season=2023&date=${formatedDate}`,
            //     {
            //         headers: {
            //             "x-rapidapi-key": process.env.REACT_APP_RAPID_KEY,
            //             "x-rapidapi-host": process.env.REACT_APP_RAPID_HOST,
            //         },
            //     }
            // );
            const res = await axios.get(
                `https://api-football-beta.p.rapidapi.com/fixtures?league=${id}&season=2023&date=${formatedDate}`,
                {
                    headers: {
                        "x-rapidapi-key":
                            "dcd894617emshd8b492b216aace5p1f0ac5jsn830bdc3806d7",
                        "x-rapidapi-host": "api-football-beta.p.rapidapi.com",
                    },
                }
            );
            const data = res.data.response;
            localStorage.setItem(
                `footballData-${id}-${formatedDate}`,
                JSON.stringify(data)
            );
            return data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error);
        }
    }
);
