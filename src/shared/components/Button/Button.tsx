import { ReactNode, JSX } from "react";

import styles from "./Button.module.css";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  children: ReactNode;
  variant: string;
}

const Button = ({
  children,
  variant,
  type = "button",
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <button type={type} className={styles.btn} {...props}>
      {children || "Log in"}
    </button>
  );
};
export default Button;
