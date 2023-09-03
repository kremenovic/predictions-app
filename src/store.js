import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import gameSlice from "./features/game/gameSlice";
import { loadState, saveState } from "./utils/localStorage";

const preloadedState = loadState();

const store = configureStore({
    reducer: {
        user: userSlice,
        game: gameSlice,
    },
    preloadedState,
});

store.subscribe(() => {
    saveState(store.getState());
});

export default store;
