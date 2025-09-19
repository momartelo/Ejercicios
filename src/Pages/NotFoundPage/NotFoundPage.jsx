import styles from "./NotFoundPage.module.css";
import React from "react";
import Button from "../../Components/Button/Button";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.containerNotFoundPage}>
      <h2>404</h2>
      <p>NotFoundPage</p>
      <div className={styles.containerButtons}>
        <Button
          text="Inicio"
          onClick={() => navigate("/")}
          className={styles.buttonHome}
        />
      </div>
    </div>
  );
};

export default NotFoundPage;
