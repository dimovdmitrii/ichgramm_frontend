export const selectLoading = (store) => store.auth.loading;
export const selectError = (store) => store.auth.error;
export const selectIsRegisterSuccess = (store) => store.auth.isRegisterSuccess;
export const selectIsLoginSuccess = (store) => store.auth.isLoginSuccess;
export const selectAccessToken = (store) => store.auth.accessToken;
export const selectRefreshToken = (store) => store.auth.refreshToken;

export const selectTokens = (store) => Boolean(store.auth.accessToken);

export const selectUser = (store) => store.auth.user;
