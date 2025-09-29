import { useState } from "react";

const useLogger = () => {
  const [logs, setLogs] = useState([]);

  const addLog = (text, type = "info") => {
    const now = new Date();
    const time = now.toLocaleTimeString();
    setLogs((prev) => [...prev, { text, type, time }]);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return { logs, addLog, clearLogs };
};

export default useLogger;
