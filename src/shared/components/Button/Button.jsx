import styles from "./Button.module.css";

const Button = ({ children, variant, ...props }) => {
  return (
    <button type="button" className={styles.btn}>
      {children || "Log in"}
    </button>
  );
};
export default Button;
