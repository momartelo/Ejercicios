import { useEffect, useRef } from "react";
import styles from "./MiniConsole.module.css";
import Button from "../../Components/Button/Button";

const MiniConsole = ({ logs, clearLogs }) => {
  const consoleRef = useRef(null);
  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [logs]);
  return (
    <div className={styles.containerConsole} ref={consoleRef}>
      <strong> Mini Consola:</strong>
      {logs.length === 0 ? (
        <p style={{ color: "#555" }}>No hay mensajes todavía...</p>
      ) : (
        logs.map((log, index) => (
          <div
            key={index}
            style={{
              color:
                log.type === "error"
                  ? "red"
                  : log.type === "success"
                  ? "#0f0"
                  : "#0af",
            }}
          >
            [{log.time}] {log.text}
          </div>
        ))
      )}
      <div />
      {logs.length > 0 && (
        <Button
          text="Clear"
          onClick={clearLogs}
          className={styles.buttonClear}
        />
      )}
    </div>
  );
};

export default MiniConsole;
