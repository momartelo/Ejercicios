import { useState } from "react";
import Button from "../../Components/Button/Button";
import MiniConsole from "../../Components/MiniConsole/MiniConsole";
import useLogger from "../../Hooks/useLogger";
import MainLayout from "../../Layout/MainLayout";
import styles from "./ExercisesPage.module.css";
import { Alert, Snackbar } from "@mui/material";
import { lanzarConfeti } from "../../Functions/Confeti";
import { useNavigate } from "react-router-dom";

const ExercisesPage = () => {
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const { logs, addLog, clearLogs } = useLogger();
  const navigate = useNavigate();
  const handleClickConsolaYAlerta = () => {
    const mensaje = "Mensaje creado en consola";
    console.log(mensaje);

    setAlertMessage(
      "El mensaje por consola fue creado con éxito 🎉 (también lo ves abajo)"
    );
    setOpen(true);

    addLog(mensaje, "info");
  };

  const handleClick = () => {
    const mensaje = "Acción realizada con éxito 🎉";
    setAlertMessage(mensaje);
    setOpen(true);
    addLog(mensaje, "success");
  };

  const handleClickError = () => {
    const mensaje =
      "Acción realizada con éxito - Mensaje Erroneo probado!!! 🎉";
    setAlertMessage(mensaje);
    setOpen(true);
    addLog(mensaje, "error");
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <MainLayout>
        <div className={styles.containerExercisesPage}>
          <h2>Ejercicios</h2>
          <p>
            Pagina donde se fueron volcando los ejercicios de las primeras
            clases
          </p>
          <div className={styles.containerButtonsActions}>
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

            <Button
              text="Lanzar un error por Mini consola"
              onClick={handleClickError}
              className={styles.buttonClickError}
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
              text="Confeti"
              onClick={() => {
                lanzarConfeti();
                addLog("Confeti lanzado 🎊", "success");
              }}
              className={styles.buttonList}
            />
            <Button
              text="Intereses"
              onClick={() => {
                navigate("/interest");
              }}
              className={styles.buttonList}
            />
          </div>
          <MiniConsole logs={logs} clearLogs={clearLogs} />
        </div>
      </MainLayout>
    </>
  );
};

export default ExercisesPage;
