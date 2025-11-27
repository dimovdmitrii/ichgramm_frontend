import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../../shared/components/Input/Input";
import Button from "../../shared/components/Button/Button";
import styles from "./ResetForm.module.css";
import lockIcon from "../../assets/icons/Trouble_logging _n_.svg";

const ResetForm = () => {
  const {
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {/* Lock icon */}
      <div className={styles.iconContainer}>
        <img
          src={lockIcon}
          alt="Trouble logging in"
          className={styles.lockIcon}
        />
      </div>

      {/* Heading */}
      <h2 className={styles.heading}>Trouble logging in?</h2>

      {/* Instructions */}
      <div className={styles.instructionsContainer}>
        <p className={styles.instructionsText}>
          Enter your email, phone, or username and we'll
        </p>
        <p className={styles.instructionsText}>
          send you a link to get back into your account.
        </p>
      </div>

      {/* Input field */}
      <div className={styles.inputWrapper}>
        <Input
          type="text"
          placeholder="Email or Username"
          {...register("emailOrUsername")}
        />
      </div>

      {/* Reset button */}
      <div className={styles.buttonWrapper}>
        <Button type="submit">Reset your password</Button>
      </div>

      {/* Divider */}
      <div className={styles.dividerContainer}>
        <div className={styles.divider}></div>
        <div className={styles.divider}></div>
        <span className={styles.dividerText}>or</span>
      </div>

      {/* Create new account link */}
      <Link to="/register" className={styles.createAccountLink}>
        Create new account
      </Link>

      {/* Back to login button */}
      <div className={styles.backToLoginContainer}>
        <Link to="/" className={styles.backToLoginLink}>
          Back to login
        </Link>
      </div>
    </form>
  );
};

export default ResetForm;

