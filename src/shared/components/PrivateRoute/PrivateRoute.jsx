import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { selectUser } from "../../../store/auth/authSelectors";

const PrivateRoute = () => {
  const user = useSelector(selectUser);

  if (!user) return <Navigate to="/" />;

  return <Outlet />;
};

export default PrivateRoute;
