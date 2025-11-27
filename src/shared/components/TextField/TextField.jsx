import styles from "./TextField.module.css";
import { useId } from "react";

const TextField = ({ label, register, name, rules, type = "text", error }) => {
  const id = useId();

  return (
    <div>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
    </div>
  );
};
export default TextField;
