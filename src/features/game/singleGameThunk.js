import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// export const fetchSingleGameData = createAsyncThunk(
//     "game/fetchSingleGameData",
//     async (id, { rejectWithValue, getState }) => {
//         const state = getState();
//         const { isStateInitializedFromLocalStorage, data } = state.game;
//         // const res = await axios.get(
//         //     `https://v3.football.api-sports.io/predictions?fixture=${id}`,
//         //     {
//         //         headers: {
//         //             "x-rapidapi-key": process.env.REACT_APP_RAPID_KEY,
//         //             "x-rapidapi-host": process.env.REACT_APP_RAPID_HOST,
//         //         },
//         //     }
//         // );
//         if (isStateInitializedFromLocalStorage && data && data.length > 0) {
//             return data; // return data directly from state
//         }
//         // If data is not available, make a network request
//         else if (isStateInitializedFromLocalStorage) {
//             try {
//                 const res = await axios.get(
//                     `https://api-football-beta.p.rapidapi.com/predictions?fixture=${id}`,
//                     {
//                         headers: {
//                             "x-rapidapi-key":
//                                 "dcd894617emshd8b492b216aace5p1f0ac5jsn830bdc3806d7",
//                             "x-rapidapi-host":
//                                 "api-football-beta.p.rapidapi.com",
//                         },
//                     }
//                 );

//                 const data = res.data.response;
//                 return data;
//             } catch (error) {
//                 console.log(error);
//                 return rejectWithValue(error);
//             }
//         }
//         // If state is not yet initialized from local storage
//         else {
//             return;
//         }
//     }
// );

export const fetchSingleGameData = createAsyncThunk(
    "game/fetchSingleGameData",
    async (id, { rejectWithValue, getState }) => {
        const state = getState();
        const { isStateInitializedFromLocalStorage } = state.game;
        const localStorageKey = `singleGameData-${id}`;
        const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

        if (isStateInitializedFromLocalStorage) {
            // Step 2: Retrieve Data from Local Storage
            const savedData = JSON.parse(localStorage.getItem(localStorageKey));
            const currentTime = new Date().getTime();

            if (
                savedData &&
                savedData.timestamp &&
                currentTime - savedData.timestamp < ONE_DAY_IN_MS
            ) {
                // Data is fresh in local storage, return it directly
                console.log("from ls");
                return savedData.data;
            } else {
                // Step 3: API Call if Necessary
                try {
                    const res = await axios.get(
                        `https://api-football-beta.p.rapidapi.com/predictions?fixture=${id}`,
                        {
                            headers: {
                                "x-rapidapi-key":
                                    "dcd894617emshd8b492b216aace5p1f0ac5jsn830bdc3806d7",
                                "x-rapidapi-host":
                                    "api-football-beta.p.rapidapi.com",
                            },
                        }
                    );

                    const data = res.data.response;

                    // Step 4: Save Data to Local Storage
                    localStorage.setItem(
                        localStorageKey,
                        JSON.stringify({ data, timestamp: currentTime })
                    );

                    return data;
                } catch (error) {
                    console.log(error);
                    return rejectWithValue(error);
                }
            }
        } else {
            // State is not yet initialized from local storage, skip this network request
            return;
        }
    }
);
