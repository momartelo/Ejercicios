import React from "react";
import styles from "./Button.module.css";

const Button = ({ text, onClick, className = "", type = "button" }) => {
  return (
    <button className={className} type={type} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
