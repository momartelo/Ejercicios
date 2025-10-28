import React, { useState } from "react";
import { addUser, findUserByEmail } from "../../mocks/Users";
import Swal from "sweetalert2";
import styles from "./RegisterPage.module.css";
import { useNavigate } from "react-router-dom";

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verifica si el email ya está registrado
    if (findUserByEmail(formData.email)) {
      Swal.fire("Error", "Ese correo ya está registrado", "error");
      return;
    }

    addUser(formData);
    Swal.fire("Éxito", "Usuario registrado correctamente 🎉", "success");
    navigate("/"); // o /login si querés
  };

  return (
    <div style={{ maxWidth: 400, margin: "80px auto", textAlign: "center" }}>
      <h2>Registro de usuario</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleChange}
          required
          style={{
            display: "block",
            width: "100%",
            marginBottom: 10,
            padding: 8,
          }}
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          required
          style={{
            display: "block",
            width: "100%",
            marginBottom: 10,
            padding: 8,
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
          style={{
            display: "block",
            width: "100%",
            marginBottom: 10,
            padding: 8,
          }}
        />
        <button type="submit" style={{ padding: 10, width: "100%" }}>
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
