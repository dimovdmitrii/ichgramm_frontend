import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import RegisterForm from "./RegisterForm";
import { registerUser } from "../../store/auth/authOperations";
import { selectAuthRequest } from "../../store/auth/authSelectors";

const Register = () => {
  const { error, loading, isRegisterSuccess } = useSelector(selectAuthRequest);

  const dispatch = useDispatch();
  const noRegister = async (payload) => {
    dispatch(registerUser(payload));
  };

  if (isRegisterSuccess) return <Navigate to="/" />;

  return (
    <div>
      <RegisterForm
        requestErrors={error}
        isSubmitSuccess={isRegisterSuccess}
        submitForm={noRegister}
      />
      {loading && <p>Register request...</p>}
      {error && <p style={{ color: "red" }}>{error.email}</p>}
    </div>
  );
};

export default Register;
