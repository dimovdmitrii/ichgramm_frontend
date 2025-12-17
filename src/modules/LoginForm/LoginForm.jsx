import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import TextField from "../../shared/components/TextField/TextField";
import Button from "../../shared/components/Button/Button";
import styles from "./LoginForm.module.css";

const LoginForm = ({ submitForm, isSubmitSuccess, requestErrors }) => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset();
    clearErrors();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Очищаем ошибки формы когда нет ошибок в Redux
  useEffect(() => {
    if (!requestErrors) {
      clearErrors();
    }
  }, [requestErrors, clearErrors]);

  useEffect(() => {
    if (requestErrors) {
      for (const key in requestErrors) {
        setError(key, { message: requestErrors[key] });
      }
    }
  }, [requestErrors, setError]);

  useEffect(() => {
    if (isSubmitSuccess) {
      reset();
      clearErrors();
    }
  }, [isSubmitSuccess, reset, clearErrors]);

  const onSubmit = (values) => {
    if (submitForm) {
      submitForm(values);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={`${styles.inputWrapper} ${styles.usernameInput}`}>
        <TextField
          type="text"
          placeholder="Username, or email"
          register={register("username")}
          error={errors.username?.message}
        />
      </div>
      <div className={`${styles.inputWrapper} ${styles.passwordInput}`}>
        <TextField
          type="password"
          placeholder="Password"
          register={register("password")}
          error={errors.password?.message}
        />
      </div>
      <div className={styles.buttonWrapper}>
        <Button type="submit">Log in</Button>
      </div>
      <div className={styles.dividerContainer}>
        <div className={styles.divider}></div>
        <div className={styles.divider}></div>
        <span className={styles.dividerText}>or</span>
      </div>
      <Link to="/reset" className={styles.forgotPasswordLink}>
        <span className={styles.forgotPasswordText}>Forgot password?</span>
      </Link>
    </form>
  );
};
export default LoginForm;
