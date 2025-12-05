import instance from "./instance";
import { store } from "../../store/store";

export const register = async (payload) => {
  const { data } = await instance.post("/auth/register", payload);
  return data;
};

export const login = async (payload) => {
  const state = store.getState();
  const { data } = await instance.post("/auth/login", payload);
  // Устанавливаем токен из ответа, а не из payload
  if (data?.accessToken || data?.accessTokenss) {
    instance.defaults.headers["Authorization"] = `Bearer ${
      data.accessToken || data.accessTokenss
    }`;
  }
  return data;
};

export const logOut = async () => {
  await instance.post("/logout");
  instance.defaults.headers["Authorization"] = "";
};

export const refreshToken = async (refreshToken) => {
  const { data } = await instance.post("/auth/refresh", {
    refreshToken,
  });
  // Обновляем токен в axios instance
  if (data?.accessToken || data?.accessTokenss) {
    instance.defaults.headers["Authorization"] = `Bearer ${
      data.accessToken || data.accessTokenss
    }`;
  }
  return data;
};
