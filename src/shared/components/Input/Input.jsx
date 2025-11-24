import styles from "./Input.module.css";

export const Input = ({
  type = "text",
  placeholder = "",
  style,
  className,
  min = 3,
  max = 2000,
  id,
  ...rest
}) => {
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
