import styles from "./Button.module.css";

const Button = ({ children, variant, type = "button", ...props }) => {
  return (
    <button type={type} className={styles.btn} {...props}>
      {children || "Log in"}
    </button>
  );
};
export default Button;
