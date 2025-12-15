import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./auth/authSlice";

// Настраиваем persist для слайса auth, чтобы сохранять пользователя и токены
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["accessToken", "refreshToken", "user"],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const rootReducer = combineReducers({
  auth: persistedAuthReducer,
});

export default rootReducer;
