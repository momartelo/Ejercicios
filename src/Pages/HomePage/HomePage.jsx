import styles from "./HomePage.module.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";

const HomePage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    alert("Hiciste Click");
  };
  return (
    <>
      <div className={`${styles.containerHome}`}>
        <h1>Home Page</h1>
        <Button
          text="Click Me"
          onClick={handleClick}
          className={styles.buttonClickMe}
        />
        <Button
          text="Ir a la Lista"
          onClick={() => navigate("/ListPage")}
          className={styles.buttonList}
        />
      </div>
    </>
  );
};

export default HomePage;
