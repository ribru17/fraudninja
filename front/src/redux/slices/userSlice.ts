import { User } from "@shared_types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userInfo: User;
}

const initialState: UserState = {
  userInfo: {
    _id: "",
    email: "",
    password: "",
    sub: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.userInfo = action.payload;
    },
  },
});

export default userSlice.reducer;

export const { setUser } = userSlice.actions;
