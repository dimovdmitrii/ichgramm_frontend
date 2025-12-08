import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { selectTokens, selectUser } from "../../../store/auth/authSelectors";

const PublicRoute = () => {
  const isToken = useSelector(selectTokens);
  const user = useSelector(selectUser);

  if (isToken && !user) return <p>Loading...</p>;
  if (user) return <Navigate to="/home" replace />;

  return <Outlet />;
};

export default PublicRoute;
