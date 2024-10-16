import { configureStore } from "@reduxjs/toolkit";
import { sessionSlice, userSlice } from "./slices";
import { thunk } from "redux-thunk";

export const store = configureStore({
  reducer: {
    session: sessionSlice.reducer,
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
