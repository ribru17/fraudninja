import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SessionState {
  token: string;
  isLoggedIn: boolean;
}

const initialState: SessionState = {
  token: "",
  isLoggedIn: false,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      state.isLoggedIn = !!action.payload; // Automatically set isLoggedIn based on token
    },
    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
    clearSession(state) {
      state.token = "";
      state.isLoggedIn = false;
    },
  },
});

export const { setToken, setIsLoggedIn, clearSession } = sessionSlice.actions;
export default sessionSlice.reducer;
