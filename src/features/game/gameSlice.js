import { createSlice } from "@reduxjs/toolkit";
import { fetchSingleGameData } from "./singleGameThunk";
import { fetchStandingsData } from "./standingsThunk";
import { fetchLeagueGamesData } from "./leagueGamesThunk";

const initialState = {
    selectedLeague: {
        id: 39,
        name: "Premier League",
        country: "england",
        season: 2023,
    },
    selectedGame: { date: null, referee: null, city: null, stadium: null },
    selectedDate: new Date().toISOString(),
    isCalendarOpen: false,
    leagueGamesData: [],
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
            state.selectedLeague = {
                ...state.selectedLeague,
                id,
                name,
                country,
            };
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
            // console.log(new Date().toISOString());
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
        setLeagueGames: (state, { payload }) => {
            state.leagueGamesData = payload;
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
            })
            .addCase(fetchLeagueGamesData.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchLeagueGamesData.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.leagueGamesData = payload;
            })
            .addCase(fetchLeagueGamesData.rejected, (state, { payload }) => {
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
    setLeagueGames,
} = gameSlice.actions;

export default gameSlice.reducer;
