import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import LoginForm from "./LoginForm";
import { loginUser } from "../../store/auth/authOperations";
import {
  selectLoading,
  selectError,
  selectIsLoginSuccess,
  selectAccessToken,
  selectUser,
} from "../../store/auth/authSelectors";

const Login = () => {
  const error = useSelector(selectError);
  const loading = useSelector(selectLoading);
  const isLoginSuccess = useSelector(selectIsLoginSuccess);
  const accessToken = useSelector(selectAccessToken);
  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  const handleLogin = async (payload) => {
    dispatch(loginUser(payload));
  };

  // Если пользователь уже залогинен, не показываем страницу логина
  if (user || (isLoginSuccess && accessToken)) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div>
      <LoginForm
        requestErrors={error}
        isSubmitSuccess={isLoginSuccess}
        submitForm={handleLogin}
      />
      {loading && <p>Logging in...</p>}
    </div>
  );
};

export default Login;
