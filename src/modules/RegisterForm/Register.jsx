import { useDispatch, useSelector } from "react-redux";

import RegisterForm from "./RegisterForm";
import { registerUser } from "../../store/auth/authOperations";

const Register = () => {
  const { error, loading } = useSelector((store) => ({
    loading: store.auth.loading,
    error: store.auth.error,
  }));

  const dispatch = useDispatch();

  const noRegister = async (payload) => {
    dispatch(registerUser(payload));
  };

  return (
    <div>
      <RegisterForm submitForm={noRegister} />
      {loading && <p>Register request...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Register;


