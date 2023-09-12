import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
export const fetchLeagueGamesData = createAsyncThunk(
    "game/fetchLeagueGamesData",
    async ({ id, formatedDate }, { rejectWithValue }) => {
        try {
            const res = await axios.get(
                `https://v3.football.api-sports.io/fixtures?league=${id}&season=2023&date=${formatedDate}`,
                {
                    headers: {
                        "x-rapidapi-key": process.env.REACT_APP_RAPID_KEY,
                        "x-rapidapi-host": process.env.REACT_APP_RAPID_HOST,
                    },
                }
            );
            const data = res.data.response;

            const docRef = doc(
                db,
                "allGames",
                `footballData-${id}-${formatedDate}`
            );
            await setDoc(docRef, { data });

            return data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error);
        }
    }
);
