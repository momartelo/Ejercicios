import styles from "./CardTeamPage.module.css";
import React from "react";
import CardTeam from "../../Components/CardTeam/CardTeam";
import equipo from "../../Data/EquipoTalentoLab";
import ResponsiveAppBar from "../../Components/Navbar/ResponsiveNavBar";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import MainLayout from "../../Layout/MainLayout";

const CardTeamPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <MainLayout>
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
          <div className={styles.containerButtons}>
            <Button
              text="Atras"
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
      </MainLayout>
    </>
  );
};

export default CardTeamPage;
