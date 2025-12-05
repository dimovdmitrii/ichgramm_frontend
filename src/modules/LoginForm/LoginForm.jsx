import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../../shared/components/Input/Input";
import Button from "../../shared/components/Button/Button";
import styles from "./LoginForm.module.css";

const LoginForm = ({ submitForm, isSubmitSuccess, requestErrors }) => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm();

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
    }
  }, [isSubmitSuccess, reset]);

  const onSubmit = (values) => {
    if (submitForm) {
      submitForm(values);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={`${styles.inputWrapper} ${styles.usernameInput}`}>
        <Input
          type="text"
          placeholder="Username, or email"
          {...register("username")}
        />
        {errors.username && (
          <p className={styles.errorText}>{errors.username.message}</p>
        )}
      </div>
      <div className={`${styles.inputWrapper} ${styles.passwordInput}`}>
        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && (
          <p className={styles.errorText}>{errors.password.message}</p>
        )}
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
