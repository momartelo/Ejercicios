import React from "react";
import styles from "./Button.module.css";

const Button = ({
  text,
  onClick,
  className = "",
  type = "button",
  style = {},
  icon = null,
  loading = false,
  ...props
}) => {
  return (
    <button
      className={`${styles.button} ${className}`}
      type={type}
      onClick={onClick}
      style={style}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <span className={styles.spinner} />
      ) : (
        <>
          {icon && <span className={styles.icon}>{icon}</span>}
          {text}
        </>
      )}
    </button>
  );
};

export default Button;
