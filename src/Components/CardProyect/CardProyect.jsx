import styles from "./CardProyect.module.css";
import React from "react";
import Button from "../../Components/Button/Button";

const CardProyect = ({ title, description, onShowAlert }) => {
  const handleClick = () => {
    onShowAlert(`Acción realizada con éxito en ${title} 🎉`);
    console.log("Explorando:", title);
  };

  return (
    <div className={styles.containerCardProyect}>
      <h2>{title}</h2>
      <p className={styles.description}>{description}</p>
      <div className={styles.containerButtons}>
        <Button
          className={styles.buttonCardProyect}
          onClick={handleClick}
          text="Explorar proyecto"
        />
      </div>
    </div>
  );
};

export default CardProyect;
