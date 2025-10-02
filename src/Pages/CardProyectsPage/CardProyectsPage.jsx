import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import CardProyect from "../../Components/CardProyect/CardProyect";
import projects from "../../Data/Proyects";
import styles from "./CardProyectsPage.module.css";
import { Alert, Snackbar } from "@mui/material";
import React, { useState } from "react";
import MainLayout from "../../Layout/MainLayout";

const CardProyectsPage = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return; // opcional: evita cerrar al hacer click afuera
    setOpen(false);
  };

  const handleShowAlert = (msg) => {
    setOpen(false);

    setTimeout(() => {
      setAlertMessage(msg);
      setOpen(true);
    }, 100);
  };

  return (
    <>
      <MainLayout>
        <div className={styles.containerCardProyectsPage}>
          <h2>Pagina de proyectos</h2>
          <ul className={styles.containerCards}>
            {projects.map((proyect, index) => (
              <div className={styles.cardProyect} key={index}>
                <CardProyect
                  title={proyect.title}
                  description={proyect.description}
                  onShowAlert={handleShowAlert}
                />
              </div>
            ))}
          </ul>

          <Snackbar
            key={alertMessage}
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              variant="filled"
              sx={{ width: "100%", textAlign: "center" }}
            >
              {alertMessage}
            </Alert>
          </Snackbar>

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

export default CardProyectsPage;
