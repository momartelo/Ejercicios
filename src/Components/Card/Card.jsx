import Button from "../Button/Button";
import styles from "./Card.module.css";
import React from "react";

const Card = ({ title, description, details, price, onAddToCart }) => {
  return (
    <div className={styles.cardFrutas}>
      <h2>{title}</h2>
      <p className={styles.descripcion}>{description}</p>
      <p className={styles.descripcion}>{details}</p>
      <p className={styles.precio}>{price}</p>
      <Button
        text="Agregar al carrito"
        onClick={onAddToCart}
        className={styles.buttonAdd}
      />
    </div>
  );
};
export default Card;
