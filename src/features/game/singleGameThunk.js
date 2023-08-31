import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSingleGameData = createAsyncThunk(
    "game/fetchSingleGameData",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios.get(
                `https://v3.football.api-sports.io/predictions?fixture=${id}`,
                {
                    headers: {
                        "x-rapidapi-key": process.env.REACT_APP_RAPID_KEY,
                        "x-rapidapi-host": process.env.REACT_APP_RAPID_HOST,
                    },
                }
            );
            const data = res.data.response;
            localStorage.setItem(
                `footballDataSingle-${id}`,
                JSON.stringify(data)
            );
            return data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error);
        }
    }
);
