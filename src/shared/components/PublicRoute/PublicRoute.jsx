import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { selectUser } from "../../../store/auth/authSelectors";

const PublicRoute = () => {
  const user = useSelector(selectUser);

  if (user) return <Navigate to="/home" replace />;

  return <Outlet />;
};

export default PublicRoute;
