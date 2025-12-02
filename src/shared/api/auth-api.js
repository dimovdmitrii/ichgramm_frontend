import axios from "axios";

const authInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const register = async (payload) => {
  const { data } = await authInstance.post("/auth//register", payload);
  return data;
};
