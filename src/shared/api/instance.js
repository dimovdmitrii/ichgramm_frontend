import axios from "axios";
import { store } from "../../store/store";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/refresh") &&
      !originalRequest.url?.includes("/auth/login")
    ) {
      originalRequest._retry = true;

      try {
        const state = store.getState();
        const { refreshToken } = state.auth;

        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const result = await store
          .dispatch(refreshUserToken(refreshToken))
          .unwrap();

        const newAccessToken = result?.accessToken || result?.accessTokenss;
        if (newAccessToken) {
          instance.defaults.headers[
            "Authorization"
          ] = `Bearer ${newAccessToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        }

        return instance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
