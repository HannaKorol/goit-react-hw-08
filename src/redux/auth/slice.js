import { createSlice } from "@reduxjs/toolkit";
import { login, logout, refresh, register } from "./operations";

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logout.fulfilled, () => initialState)
      .addCase(refresh.fulfilled, (state, action) => {
        //тільки для відновлення, це коли я знову зайду на свою сторінку, мої данні будуть оновлені.
        state.user.email = action.payload.email;
        state.user.name = action.payload.name;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refresh.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refresh.rejected, (state) => {
        state.isRefreshing = false;
      });
  },
});

export const authSlice = slice.reducer;
