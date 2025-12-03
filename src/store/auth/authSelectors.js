export const selectAuthRequest = (store) => ({
  loading: store.auth.loading,
  error: store.auth.error,
  isRegisterSuccess: store.auth.isRegisterSuccess,
});
