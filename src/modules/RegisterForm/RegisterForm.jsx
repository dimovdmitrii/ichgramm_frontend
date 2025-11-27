import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../../shared/components/Input/Input";
import Button from "../../shared/components/Button/Button";
import styles from "./RegisterForm.module.css";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {/* Tagline */}
      <div className={styles.taglineContainer}>
        <p className={styles.taglineText}>
          Sign up to see photos and videos
        </p>
        <p className={styles.taglineText}>from your friends.</p>
      </div>

      {/* Input fields */}
      <div className={`${styles.inputWrapper} ${styles.emailInput}`}>
        <Input
          type="email"
          placeholder="Email"
          {...register("email")}
        />
      </div>
      <div className={`${styles.inputWrapper} ${styles.fullNameInput}`}>
        <Input
          type="text"
          placeholder="Full Name"
          {...register("fullName")}
        />
      </div>
      <div className={`${styles.inputWrapper} ${styles.usernameInput}`}>
        <Input
          type="text"
          placeholder="Username"
          {...register("username")}
        />
      </div>
      <div className={`${styles.inputWrapper} ${styles.passwordInput}`}>
        <Input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
      </div>

      {/* Legal text */}
      <div className={styles.legalContainer}>
        <div className={styles.legalTextRow}>
          <p className={styles.legalText}>
            People who use our service may have uploaded your contact information to Instagram.{" "}
            <Link to="/learn-more" className={styles.legalLink}>Learn More</Link>
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

