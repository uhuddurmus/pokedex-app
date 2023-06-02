
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import rootReducer, { RootState } from "./rootReducer";


const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
