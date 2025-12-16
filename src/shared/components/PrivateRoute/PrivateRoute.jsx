import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { selectTokens } from "../../../store/auth/authSelectors";

const PrivateRoute = () => {
  const isAuth = useSelector(selectTokens); // true, если есть accessToken

  if (!isAuth) return <Navigate to="/" />;

  return <Outlet />;
};

export default PrivateRoute;
