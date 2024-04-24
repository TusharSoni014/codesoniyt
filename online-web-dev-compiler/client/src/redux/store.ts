import { configureStore } from "@reduxjs/toolkit";
import compilerSlice from "./slices/compilerSlice";
import { api } from "./slices/api";
import appSlice from "./slices/appSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    compilerSlice,
    appSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;