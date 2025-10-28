import styles from "./ButtonM.module.css";
import React from "react";
import { Button, CircularProgress } from "@mui/material";

const ButtonMui = ({
  text,
  onClick,
  variant = "contained",
  color = "primary",
  startIcon = null,
  endIcon = null,
  loading = false,
  disabled = false,
  fullWidth = false,
  sx = {},
  ...props
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      onClick={onClick}
      startIcon={!loading ? startIcon : null}
      endIcon={!loading ? endIcon : null}
      disabled={disabled || loading}
      fullWidth={fullWidth}
      sx={{
        position: "relative",
        minHeight: "40px",
        fontWeight: 500,
        borderRadius: "8px",
        ...sx,
      }}
      {...props}
    >
      {loading ? (
        <CircularProgress
          size={24}
          color="inherit"
          sx={{ position: "absolute" }}
        />
      ) : (
        text
      )}
    </Button>
  );
};

export default ButtonMui;
