import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { selectTokens, selectUser } from "../../../store/auth/authSelectors";

const PrivateRoute = () => {
  const isToken = useSelector(selectTokens);
  const user = useSelector(selectUser);

  if (isToken && !user) return <p>Loading...</p>;
  if (!user) return <Navigate to="/" />;

  return <Outlet />;
};

export default PrivateRoute;
