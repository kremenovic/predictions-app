import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import gameSlice from "./features/game/gameSlice";
export const store = configureStore({
  reducer: {
    user: userSlice,
    game: gameSlice,
  },
});
