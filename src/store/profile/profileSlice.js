import { createSlice } from "@reduxjs/toolkit";
import { logoutUser } from "../auth/authOperations";

const initialState = {
  myProfile: null,
  myPosts: [],
  userId: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setMyProfileData(state, { payload }) {
      state.myProfile = payload?.profile ?? null;
      state.myPosts = payload?.posts ?? [];
      state.userId = payload?.userId ?? null;
    },
    clearMyProfileCache(state) {
      state.myProfile = null;
      state.myPosts = [];
      state.userId = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutUser.fulfilled, () => initialState);
  },
});

export const { setMyProfileData, clearMyProfileCache } = profileSlice.actions;
export default profileSlice.reducer;
