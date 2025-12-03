import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../../shared/components/Input/Input";
import Button from "../../shared/components/Button/Button";
import styles from "./RegisterForm.module.css";

const RegisterForm = ({ submitForm, isSubmitSuccess, requestErrors }) => {
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
      {/* Tagline */}
      <div className={styles.taglineContainer}>
        <p className={styles.taglineText}>Sign up to see photos and videos</p>
        <p className={styles.taglineText}>from your friends.</p>
      </div>

      {/* Input fields */}
      <div className={`${styles.inputWrapper} ${styles.emailInput}`}>
        <Input type="email" placeholder="Email" {...register("email")} />
        {errors.email && (
          <p className={styles.errorText}>{errors.email.message}</p>
        )}
      </div>
      <div className={`${styles.inputWrapper} ${styles.fullNameInput}`}>
        <Input type="text" placeholder="Full Name" {...register("fullName")} />
        {errors.fullName && (
          <p className={styles.errorText}>{errors.fullName.message}</p>
        )}
      </div>
      <div className={`${styles.inputWrapper} ${styles.usernameInput}`}>
        <Input type="text" placeholder="Username" {...register("username")} />
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

      {/* Legal text */}
      <div className={styles.legalContainer}>
        <div className={styles.legalTextRow}>
          <p className={styles.legalText}>
            People who use our service may have uploaded your contact
            information to Instagram.{" "}
            <Link to="/learn-more" className={styles.legalLink}>
              Learn More
            </Link>
          </p>
        </div>
        <p className={styles.legalText}>
          By signing up, you agree to our{" "}
          <Link to="/terms" className={styles.legalLink}>
            Terms
          </Link>
          ,{" "}
          <Link to="/privacy-policy" className={styles.legalLink}>
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link to="/cookies-policy" className={styles.legalLink}>
            Cookies Policy
          </Link>
          .
        </p>
      </div>

      {/* Submit button */}
      <div className={styles.buttonWrapper}>
        <Button type="submit">Sign up</Button>
      </div>
    </form>
  );
};

export default RegisterForm;
