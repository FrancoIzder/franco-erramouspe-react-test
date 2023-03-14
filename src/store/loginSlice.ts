import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginDataI } from "../interfaces";

const initialState = {
  email: "",
  password: "",
};

export const loginSlice: any = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginData: (state, action: PayloadAction<loginDataI>) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },

    logout: (state) => {
      state.email = "";
      state.password = "";
    },
  },
});

export const { loginData, logout } = loginSlice.actions;

export default loginSlice.reducer;
