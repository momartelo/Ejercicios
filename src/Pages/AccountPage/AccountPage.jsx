import styles from "./AccountPage.module.css";
import { useAuth } from "../../Context/AuthContex";
import MainLayout from "../../Layout/MainLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AccountPage = () => {
  const { user, isAdminIn } = useAuth();
  const [formData, setFormData] = useState({
    nombre: user?.name || "",
    direccion: user?.address.street || "",
    codigoPostal: user?.address.postalCode || "",
    ciudad: user?.address.city || "",
    provincia: user?.address.province || "",
    pais: user?.address.country || "",
    celular: user?.phone || "",
    fechaNacimiento: user?.birthDate || "",
    genero: user?.gender || "",
    email: user?.email || "",
    oldPassword: user?.password || "",
    newPassword: "",
    role: isAdminIn ? "Administrador" : "Cliente",
  });
  console.log(user);
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.info("Simulación de edición exitosa");
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const navigate = useNavigate();
  return (
    <MainLayout>
      <div className={styles.containerAccountPage}>
        <h2 className={styles.pageTitle}>Cuenta: </h2>
        <form onSubmit={handleSubmit} className={styles.containerForm}>
          <div className={styles.groupName}>
            <div className={styles.formName}>
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                autoComplete="nombre"
              />
            </div>
            <div className={styles.formPhone}>
              <label htmlFor="celular">Celular:</label>
              <input
                type="tel"
                id="celular"
                name="celular"
                value={formData.celular}
                onChange={handleChange}
                required
                autoComplete="celular"
              />
            </div>
          </div>
          <div className={styles.groupAddress}>
            <div className={styles.formAddress}>
              <label htmlFor="direccion">Direccion:</label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                required
                autoComplete="direccion"
              />
            </div>
            <div className={styles.formCity}>
              <label htmlFor="ciudad">Ciudad:</label>
              <input
                type="text"
                id="ciudad"
                name="ciudad"
                value={formData.ciudad}
                onChange={handleChange}
                required
                autoComplete="ciudad"
              />
            </div>
            <div className={styles.formCodigoPostal}>
              <label htmlFor="codigoPostal">C.P.:</label>
              <input
                type="text"
                id="codigoPostal"
                name="codigoPostal"
                value={formData.codigoPostal}
                onChange={handleChange}
                required
                autoComplete="codigoPostal"
              />
            </div>
          </div>
          <div className={styles.groupCountry}>
            <div className={styles.formProvince}>
              <label htmlFor="provincia">Provincia:</label>
              <input
                type="text"
                id="provincia"
                name="provincia"
                value={formData.provincia}
                onChange={handleChange}
                required
                autoComplete="provincia"
              />
            </div>
            <div className={styles.formCountry}>
              <label htmlFor="pais">Pais:</label>
              <input
                type="text"
                id="pais"
                name="pais"
                value={formData.pais}
                onChange={handleChange}
                required
                autoComplete="pais"
              />
            </div>
          </div>
          <div className={styles.groupData}>
            <div className={styles.formBirthday}>
              <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
              <input
                type="date"
                id="fechaNacimiento"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleChange}
                required
                autoComplete="fechaNacimiento"
              />
            </div>
            <div className={styles.formGender}>
              <label htmlFor="genero">Genero:</label>
              <input
                type="text"
                id="genero"
                name="genero"
                value={formData.genero}
                onChange={handleChange}
                required
                autoComplete="genero"
              />
            </div>
          </div>
          <hr className={styles.separator} />
          <div className={styles.containerButtons}>
            <button
              type="button"
              className={styles.buttonCancel}
              onClick={() => navigate("/profile")}
            >
              Perfil
            </button>

            <button
              type="submit"
              className={styles.buttonSave}
              onClick={() => {
                Swal.fire({
                  title: "¿Esta seguro de guardar los cambios?",
                  text: "Esta acción no se puede deshacer.",
                  icon: "info",
                  showCancelButton: true,
                  confirmButtonText: "Sí, guardar",
                  cancelButtonText: "Cancelar",
                  confirmButtonColor: "#d33",
                  cancelButtonColor: "#3085d6",
                }).then((result) => {
                  if (result.isConfirmed) {
                    Swal.fire({
                      title: "Cambios Guardados",
                      text: "Tus datos se guardaron exitosamente (simulación).",
                      icon: "success",
                    });
                    // acá va la logica cuando haya cambios
                  }
                });
              }}
            >
              Guardar Cambios
            </button>

            <button
              type="button"
              className={styles.buttonDelete}
              onClick={() => {
                Swal.fire({
                  title: "¿Eliminar cuenta?",
                  text: "Esta acción no se puede deshacer.",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: "Sí, eliminar",
                  cancelButtonText: "Cancelar",
                  confirmButtonColor: "#d33",
                  cancelButtonColor: "#3085d6",
                }).then((result) => {
                  if (result.isConfirmed) {
                    Swal.fire({
                      title: "Cuenta eliminada",
                      text: "Tu cuenta se eliminó (simulación).",
                      icon: "success",
                    });
                    // acá iría la lógica cuando se borre datos
                  }
                });
              }}
            >
              Eliminar Cuenta
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default AccountPage;
