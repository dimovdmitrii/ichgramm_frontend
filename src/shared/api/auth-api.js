import instance from "./instance";
import { store } from "../../store/store";

export const register = async (payload) => {
  const { data } = await instance.post("/auth/register", payload);
  return data;
};

export const login = async (payload) => {
  const state = store.getState();
  const { data } = await instance.post("/auth/login", payload);
  if (data?.accessToken) {
    instance.defaults.headers["Authorization"] = `Bearer ${data.accessToken}`;
  }
  return data;
};

export const logOut = async () => {
  try {
    await instance.post("/auth/logout");
  } catch (error) {
    console.error("Logout endpoint error (ignored):", error?.response?.status);
  }
  instance.defaults.headers["Authorization"] = "";
};

export const refreshToken = async (refreshToken) => {
  const { data } = await instance.post("/auth/refresh", {
    refreshToken,
  });

  if (data?.accessToken) {
    instance.defaults.headers["Authorization"] = `Bearer ${data.accessToken}`;
  }
  return data;
};

export const getCurrent = async (token) => {
  const { data } = await instance.get("/auth/current", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
