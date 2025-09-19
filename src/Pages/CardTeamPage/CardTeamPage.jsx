import styles from "./CardTeamPage.module.css";
import React from "react";
import CardTeam from "../../Components/CardTeam/CardTeam";
import equipo from "../../Data/EquipoTalentoLab";
import ResponsiveAppBar from "../../Components/Navbar/ResponsiveNavBar";

const CardTeamPage = () => {
  return (
    <>
      <ResponsiveAppBar />
      <div className={styles.containerCardTeamPage}>
        <h2>Equipo de Desarrollo</h2>
        <ul className={styles.containerCards}>
          {equipo.map((miembro, index) => (
            <div className={styles.cardMiembro} key={index}>
              <CardTeam
                nombre={miembro.nombre}
                rol={miembro.rol}
                imagen={miembro.imagen}
              />
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CardTeamPage;
