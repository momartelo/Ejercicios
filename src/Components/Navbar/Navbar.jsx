import styles from "./Navbar.module.css";
import React from "react";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.containerNavbar}>
      <div className={styles.containerButtons}>
        <Button
          text="Volver"
          onClick={() => navigate(-1)}
          className={styles.buttonBack}
        />
        <Button
          text="Inicio"
          onClick={() => navigate("/")}
          className={styles.buttonHome}
        />
      </div>
    </div>
  );
};

export default Navbar;
