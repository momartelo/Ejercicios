import styles from "./HomePage.module.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import confetti from "canvas-confetti";
import { Alert, Snackbar } from "@mui/material";
import ResponsiveAppBar from "../../Components/Navbar/ResponsiveNavBar";

const HomePage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleClickConsolaYAlerta = () => {
    console.log("Mensaje creado en consola");
    setAlertMessage(
      "El mensaje por consola fue creado con exito apreta crtl+shift+I para verlo 🎉"
    );
    setOpen(true);
  };

  const handleClick = () => {
    setAlertMessage("Acción realizada con éxito 🎉");
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const lanzarConfeti = () => {
    // Lanza confeti durante 1 segundo
    const duration = 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        colors: ["#ff0000", "#fffff", "#ff0000", "#ffffff"],
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 3,
        angle: 120,

        colors: ["#75aadb", "#fffff", "#75aadb", "#ffffff"],
        spread: 55,
        origin: { x: 1 },
      });
      confetti({
        particleCount: 10,
        spread: 70,
        colors: ["#009A49", "#ffd200", "#009A49", "#ffd200"],
        origin: { x: 0.5, y: 0.5 },
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <>
      <ResponsiveAppBar />
      <div className={`${styles.containerHome}`}>
        <h1>Pagina Principal</h1>
        <h3>
          Pagina donde se van haciendo los ejercicios requeridos por el curso de
          React
        </h3>
        <div className={styles.containerButtons}>
          <Button
            text="Mensaje por consola"
            onClick={handleClickConsolaYAlerta}
            className={styles.buttonList}
          />
          <Button
            text="Click Me"
            onClick={handleClick}
            className={styles.buttonClickMe}
          />

          <Snackbar
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

          <Button
            text="Productos"
            onClick={() => navigate("/listpage")}
            className={styles.buttonList}
          />

          <Button
            text="Proyectos"
            onClick={() => navigate("/proyects")}
            className={styles.buttonList}
          />

          <Button
            text="Confeti"
            onClick={lanzarConfeti}
            className={styles.buttonList}
          />

          <Button
            text="Equipo"
            onClick={() => navigate("/team")}
            className={styles.buttonList}
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
