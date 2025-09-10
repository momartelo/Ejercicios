import styles from "./Card.module.css";
import React from "react";

const Card = ({ title, description, details }) => {
  return (
    <>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{details}</p>
    </>
  );
};

export default Card;
