import styles from "./Login.module.css";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useLoginAttempts } from "../../Hooks/useLoginAttempts";
import { useAuth } from "../../Context/AuthContex";
import { useEffect, useRef, useState } from "react";

const Login = ({ openLogin, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();

  const handleCloseLogin = () => {
    setEmail("");
    setPassword("");
    setError("");
    onClose();
  };

  const { isBlocked, addAttempt, resetAttempts } = useLoginAttempts();

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    if (isBlocked) {
      setError("Demasiados intentos. Intenta más tarde.");
      return;
    }

    const success = login(email, password);
    if (success) {
      resetAttempts();
      handleCloseLogin();
    } else {
      setEmail("");
      setPassword("");
      setError("Usuario o contraseña incorrectos");
      addAttempt();
    }
  };

  const emailRef = useRef(null);

  useEffect(() => {
    if (error) {
      emailRef.current?.focus();
    }
  }, [error]);

  return (
    <>
      {/* --- DIALOG LOGIN --- */}
      <Dialog
        open={openLogin}
        onClose={handleCloseLogin}
        PaperProps={{
          sx: { borderRadius: 3 },
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmitLogin}
          sx={{
            position: "relative",
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: 320,
          }}
        >
          <IconButton
            onClick={handleCloseLogin}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" textAlign="center">
            Iniciar sesión
          </Typography>

          <TextField
            autoFocus
            inputRef={emailRef}
            label="Correo electrónico"
            type="email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Contraseña"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{ textTransform: "none", fontSize: "1rem" }}
          >
            Ingresar
          </Button>

          {error && (
            <Typography color="error" variant="body2" textAlign="center">
              {error}
            </Typography>
          )}

          <Typography variant="body2" textAlign="center">
            ¿No tenés cuenta?{" "}
            <Link
              to="/register"
              onClick={handleCloseLogin}
              style={{
                color: "#1976d2",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Registrate acá
            </Link>
          </Typography>
        </Box>
      </Dialog>
    </>
  );
};

export default Login;
