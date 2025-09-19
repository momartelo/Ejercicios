import styles from "./CardTeam.module.css";
import React from "react";

const CardTeam = ({ nombre, rol, imagen }) => {
  return (
    <>
      <h2>{nombre}</h2>
      <p>{rol}</p>
      <img src={imagen} alt="" />
    </>
  );
};

export default CardTeam;
