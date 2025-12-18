import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./auth/authSlice";

// Настраиваем persist для слайса auth, чтобы сохранять только токены
// user не сохраняем, так как он может содержать большие данные (base64 аватары и т.д.)
// и должен загружаться с сервера при каждом входе
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["accessToken", "refreshToken"],
  // Исключаем user из persist, чтобы не засорять localStorage
  // user будет загружаться через getCurrentUser при каждом входе
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const rootReducer = combineReducers({
  auth: persistedAuthReducer,
});

export default rootReducer;
