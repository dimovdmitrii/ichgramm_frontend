import { createAsyncThunk } from "@reduxjs/toolkit";

import * as authApi from "../../shared/api/auth-api";
import type { AxiosError } from "axios";

type ApiError = AxiosError<{
  message: string;
  field?: string;
  errors?: Record<string, string>;
}>;

export const registerUser = createAsyncThunk(
  "register",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await authApi.register(payload);
      return data;
    } catch (error: unknown) {
      const axiosError = error as ApiError;
      const data = axiosError?.response?.data;
      console.error("Register failed:", axiosError?.response?.status, data);
      const message = data?.message || axiosError?.message;
      if (data?.errors && typeof data.errors === "object") {
        return rejectWithValue(data.errors);
      }
      const field = data?.field || "email";
      return rejectWithValue({ [field]: message });
    }
  }
);

export const loginUser = createAsyncThunk(
  "login",
  async (payload: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const data = await authApi.login(payload);
      return data;
    } catch (error: unknown) {
      const axiosError = error as ApiError;
      const data = axiosError?.response?.data;
      const message = data?.message || axiosError?.message;
      if (data?.errors && typeof data.errors === "object") {
        return rejectWithValue(data.errors);
      }
      const field = data?.field || "username";
      return rejectWithValue({ [field]: message });
    }
  }
);

export const logoutUser = createAsyncThunk(
  "logout",
  async (_, { rejectWithValue }) => {
    try {
      await authApi.logOut();
      return null;
    } catch (error: unknown) {
      const axiosError = error as ApiError;
      return rejectWithValue(
        axiosError?.response?.data?.message ||
          axiosError?.message ||
          "Logout failed"
      );
    }
  }
);

export const refreshUserToken = createAsyncThunk<
  { accessToken: string; refreshToken?: string },
  string
>("refreshToken", async (refreshToken, { rejectWithValue }) => {
  try {
    const data = await authApi.refreshToken(refreshToken);
    return data;
  } catch (error: unknown) {
    const axiosError = error as ApiError;
    return rejectWithValue(
      axiosError?.response?.data?.message ||
        axiosError?.message ||
        "Token refresh failed"
    );
  }
});

export const getCurrentUser = createAsyncThunk(
  "current",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as any;
      const data = await authApi.getCurrent(state?.auth?.accessToken);
      return data;
    } catch (error: unknown) {
      const axiosError = error as ApiError;
      return rejectWithValue({
        email: axiosError?.response?.data.message || axiosError?.message,
      });
    }
  }
);
