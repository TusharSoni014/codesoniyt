import { configureStore } from "@reduxjs/toolkit";
import compilerSlice from "./slices/compilerSlice";

export const store = configureStore({
  reducer: {
    compilerSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
