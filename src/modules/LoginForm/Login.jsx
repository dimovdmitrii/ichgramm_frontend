import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import LoginForm from "./LoginForm";
import { loginUser } from "../../store/auth/authOperations";
import { selectAuthRequest } from "../../store/auth/authSelectors";

const Login = () => {
  const { error, loading } = useSelector(selectAuthRequest);
  const isLoginSuccess = useSelector((store) => store.auth.isLoginSuccess);
  const accessToken = useSelector((store) => store.auth.accessToken);

  const dispatch = useDispatch();
  const handleLogin = async (payload) => {
    dispatch(loginUser(payload));
  };

  if (isLoginSuccess || accessToken) {
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
