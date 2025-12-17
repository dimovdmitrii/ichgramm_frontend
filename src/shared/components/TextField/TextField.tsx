import { InputHTMLAttributes, forwardRef } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import styles from "./TextField.module.css";

interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "style"> {
  label?: string;
  error?: string;
  register?: UseFormRegisterReturn;
  style?: React.CSSProperties;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, register, className, style, id, ...props }, ref) => {
    const inputId =
      id || `textfield-${label?.toLowerCase().replace(/\s+/g, "-") || "input"}`;

    return (
      <div className={styles.textFieldContainer}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}
        <input
          {...props}
          {...register}
          ref={register?.ref || ref}
          id={inputId}
          className={`${styles.custom_input} ${className || ""} ${
            error ? styles.error : ""
          }`}
          style={style}
        />
        {error && <p className={styles.errorText}>{error}</p>}
      </div>
    );
  }
);

TextField.displayName = "TextField";

export default TextField;
