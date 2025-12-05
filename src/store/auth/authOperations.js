import { createAsyncThunk } from "@reduxjs/toolkit";

import * as authApi from "../../shared/api/auth-api";

export const registerUser = createAsyncThunk(
  "register",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await authApi.register(payload);
      return data;
    } catch (error) {
      return rejectWithValue({
        email: error?.response?.data?.message || error?.message,
      });
    }
  }
);
export const loginUser = createAsyncThunk(
  "login",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await authApi.login(payload);
      return data;
    } catch (error) {
      return rejectWithValue({
        email: error?.response?.data?.message || error?.message,
      });
    }
  }
);

export const logoutUser = createAsyncThunk(
  "logout",
  async (_, { rejectWithValue }) => {
    try {
      await authApi.logOut();
      return null;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.message || "Logout failed"
      );
    }
  }
);

export const refreshUserToken = createAsyncThunk(
  "refreshToken",
  async (refreshToken, { rejectWithValue }) => {
    try {
      const data = await authApi.refreshToken(refreshToken);
      return data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          "Token refresh failed"
      );
    }
  }
);
