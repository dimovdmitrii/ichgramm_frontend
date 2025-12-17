import { createSlice } from "@reduxjs/toolkit";

import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUserToken,
  getCurrentUser,
} from "./authOperations";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface ApiError {
  message: string;
  response: {
    data: {
      message: string;
    };
  };
}
interface AuthStore {
  user: User | null;
  loading: boolean;
  apiError: ApiError | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoginSuccess: boolean;
  isRegisterSuccess: boolean;
  error: any;
}

const initialState: AuthStore = {
  user: null,
  loading: false,
  apiError: null,
  accessToken: null,
  refreshToken: null,
  isLoginSuccess: false,
  isRegisterSuccess: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
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
        state.isLoginSuccess = false;
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
        state.isLoginSuccess = false;
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
        state.refreshToken = payload?.refreshToken || state.refreshToken;
        state.error = null;
      })
      .addCase(refreshUserToken.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        // Если refreshToken истек, очищаем все токены
        state.accessToken = null;
        state.refreshToken = null;
        state.user = null;
        state.isLoginSuccess = false;
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
        // Если getCurrentUser не удался, очищаем токены и пользователя
        state.accessToken = null;
        state.refreshToken = null;
        state.user = null;
        state.isLoginSuccess = false;
      });
  },
});

export default authSlice.reducer;
