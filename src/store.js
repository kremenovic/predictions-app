import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "./features/user/userSlice";
import gameSlice from "./features/game/gameSlice";

// Setup redux-persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["game"],
};

// Create a root reducer
const rootReducer = combineReducers({
  user: userSlice,
  game: gameSlice,
});

// Use persistReducer to create a persisted version of the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const ignoredActions = ["persist/PERSIST"];

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions,
    },
  }),
});

export const persistor = persistStore(store);
