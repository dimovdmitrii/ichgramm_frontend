import { createSlice } from "@reduxjs/toolkit";

import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUserToken,
  getCurrentUser,
} from "./authOperations";

const initialState = {
  user: null,
  loading: false,
  error: null,
  accessToken: null,
  refreshToken: null,
  isRegisterSuccess: false,
  isLoginSuccess: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder;
    // Register cases
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.isRegisterSuccess = true;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    // Login cases
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isLoginSuccess = false; // Сбрасываем при новом логине
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isLoginSuccess = true;
        state.accessToken = payload?.accessToken || null;
        state.refreshToken = payload?.refreshToken || null;
        state.user = payload?.user || null;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.isLoginSuccess = false; // Сбрасываем при ошибке
      })
      // Logout cases
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isLoginSuccess = false;
        state.isRegisterSuccess = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        // Очищаем состояние даже при ошибке логаута
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isLoginSuccess = false;
        state.isRegisterSuccess = false;
      })
      // Refresh token cases
      .addCase(refreshUserToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshUserToken.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.accessToken = payload?.accessToken || null;
        state.refreshToken = payload?.refreshToken || state.refreshToken; // Сохраняем старый, если новый не пришел
        state.error = null;
      })
      .addCase(refreshUserToken.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        // При ошибке можно очистить токены или оставить как есть
      });
    // Current token cases
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isLoginSuccess = true;
        state.accessToken = payload?.accessToken || null;
        state.refreshToken = payload?.refreshToken || null;
        state.user = payload?.user || null;
        state.error = null;
      })
      .addCase(getCurrentUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.accessToken = null;
        state.refreshToken = null;
      });
  },
});

export default authSlice.reducer;
