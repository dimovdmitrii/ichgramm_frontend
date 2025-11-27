import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../../shared/components/Input/Input";
import Button from "../../shared/components/Button/Button";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {
    console.log(values);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={`${styles.inputWrapper} ${styles.usernameInput}`}>
        <Input 
          type="text" 
          placeholder="Username, or email"
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
