import styles from "./Input.module.css";

interface InputProps {
  type: string;
  placeholder: string;
  style: string;
  className: string;
  min: number;
  max: number;
  id: string;
}

export const Input = ({
  type = "text",
  placeholder = "",
  style,
  className,
  min = 3,
  max = 2000,
  id,
  ...rest
}: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      style={style}
      className={`${className ?? ""} ${styles.custom_input}`}
      {...rest}
      min={min}
      max={max}
      id={id}
    />
  );
};
export default Input;
