import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import gameSlice from "./features/game/gameSlice";
import { loadState, saveState } from "./utils/localStorage";
import localStorageMiddleware from "./utils/localStorageMiddleware";

const preloadedState = loadState();

if (preloadedState) {
    preloadedState.game.isStateInitializedFromLocalStorage = true;
}

const store = configureStore({
    reducer: {
        user: userSlice,
        game: gameSlice,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;
