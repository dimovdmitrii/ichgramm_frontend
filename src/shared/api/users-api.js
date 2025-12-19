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

export const followUser = async (username) => {
  const { data } = await instance.post(`/follows/${username}`);
  return data;
};

export const unfollowUser = async (username) => {
  const { data } = await instance.delete(`/follows/${username}`);
  return data;
};

// Messages API
export const getConversation = async (username) => {
  const { data } = await instance.get(`/messages/conversation/${username}`);
  return data;
};

export const getChats = async () => {
  const { data } = await instance.get("/messages/chats");
  return data;
};

// Recent Searches API
export const getRecentSearches = async () => {
  const { data } = await instance.get("/users/recent-searches");
  return data;
};

export const addRecentSearch = async (username) => {
  const { data } = await instance.post("/users/recent-searches", { username });
  return data;
};

export const clearRecentSearches = async () => {
  const { data } = await instance.delete("/users/recent-searches");
  return data;
};
