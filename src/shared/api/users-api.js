import instance from "./instance";

export const getProfile = async () => {
  const { data } = await instance.get("/users/profile");
  return data;
};

export const getProfileByUsername = async (username) => {
  const { data } = await instance.get(`/users/profile/${username}`);
  return data;
};

export const updateProfile = async (payload) => {
  const { data } = await instance.patch("/users/profile", payload);
  return data;
};

export const searchUsers = async (query) => {
  const { data } = await instance.get("/users/search", {
    params: { q: query },
  });
  return data;
};

export const getUserPosts = async (userId) => {
  const { data } = await instance.get("/posts", {
    params: { userId },
  });
  return data;
};

export const createPost = async (postData) => {
  // Бэкенд ожидает JSON объект с полями image (строка base64) и content (строка)
  const { data } = await instance.post("/posts", postData);
  return data;
};

export const updatePost = async (postId, postData) => {
  // Бэкенд ожидает JSON объект с полями image (строка base64) и content (строка)
  const { data } = await instance.patch(`/posts/${postId}`, postData);
  return data;
};

export const deletePost = async (postId) => {
  const { data } = await instance.delete(`/posts/${postId}`);
  return data;
};