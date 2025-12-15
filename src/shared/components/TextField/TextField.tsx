import styles from "./TextField.module.css";
import { useId } from "react";

interface TextFieldsProps {
  label: string;
  register: string;
  name: string;
  rules: string;
  type: string;
  error: string;
}

const TextField = ({
  label,
  register,
  name,
  rules,
  type = "text",
  error,
}: TextFieldsProps) => {
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
