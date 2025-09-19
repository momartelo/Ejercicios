import styles from "./Card.module.css";
import React from "react";

const Card = ({ title, description, details, price }) => {
  return (
    <div className={styles.cardFrutas}>
      <h2>{title}</h2>
      <p className={styles.descripcion}>{description}</p>
      <p className={styles.descripcion}>{details}</p>
      <p className={styles.precio}>{price}</p>
    </div>
  );
};
export default Card;
