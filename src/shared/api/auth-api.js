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
    // Устанавливаем таймаут для logout запроса, чтобы он не зависал
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Logout timeout")), 5000)
    );
    await Promise.race([
      instance.post("/auth/logout"),
      timeoutPromise,
    ]);
  } catch (error) {
    // Игнорируем ошибки logout - все равно очищаем токены
    console.error("Logout endpoint error (ignored):", error?.response?.status || error?.message);
  }
  // Всегда очищаем токен, даже если запрос не прошел
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
