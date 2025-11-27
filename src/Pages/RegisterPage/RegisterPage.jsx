import React, { useState } from "react";

import Swal from "sweetalert2";
import styles from "./RegisterPage.module.css";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../Layout/MainLayout";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACK_API_URL}/api/users/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        Swal.fire("Error", data.error || "No se pudo registrar", "error");
        return;
      }

      Swal.fire("Éxito", "Usuario registrado correctamente 🎉", "success");
      navigate("/"); // podés mandar a login si querés
    } catch (err) {
      Swal.fire("Error", "Problema con el servidor", "error");
    }
  };

  return (
    <>
      <MainLayout>
        <div className={styles.containerRegisterPage}>
          <h2>Registro de usuario</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              value={formData.name}
              onChange={handleChange}
              required
              className={styles.inputName}
            />
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.inputEmail}
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
              className={styles.inputPassword}
            />
            <button className={styles.buttonSubmit} type="submit">
              Registrarse
            </button>
          </form>
        </div>
      </MainLayout>
    </>
  );
};

export default RegisterPage;
