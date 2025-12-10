import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import {
  selectTokens,
  selectUser,
  selectAccessToken,
  selectRefreshToken,
  selectLoading,
} from "../../../store/auth/authSelectors";
import {
  getCurrentUser,
  refreshUserToken,
  logoutUser,
} from "../../../store/auth/authOperations";

const PrivateRoute = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isToken = useSelector(selectTokens);
  const user = useSelector(selectUser);
  const accessToken = useSelector(selectAccessToken);
  const refreshToken = useSelector(selectRefreshToken);
  const loading = useSelector(selectLoading);
  const lastPathRef = useRef(null);
  const checkingRef = useRef(false);

  useEffect(() => {
    if (loading || checkingRef.current) return;

    const currentPath = location.pathname;
    if (lastPathRef.current !== null && lastPathRef.current === currentPath)
      return;
    lastPathRef.current = currentPath;

    if (accessToken) {
      checkingRef.current = true;
      dispatch(getCurrentUser())
        .finally(() => {
          checkingRef.current = false;
        })
        .catch(() => {});
    } else if (refreshToken && !accessToken) {
      checkingRef.current = true;
      dispatch(refreshUserToken(refreshToken))
        .unwrap()
        .catch(() => {
          dispatch(logoutUser());
        })
        .finally(() => {
          checkingRef.current = false;
        });
    } else if (!accessToken && !refreshToken && !user && isToken) {
      dispatch(logoutUser());
    }
  }, [dispatch, location.pathname, accessToken, refreshToken, user, loading]);

  if ((isToken && !user) || loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/" />;

  return <Outlet />;
};

export default PrivateRoute;
