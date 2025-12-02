import MainLayout from "../../Layout/MainLayout";
import styles from "./ProfilePage.module.css";
import { useAuth } from "../../Context/AuthContex";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import Swal from "sweetalert2";

const ProfilePage = () => {
  const { user, isAdminIn } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: user?.name || "",
    email: user?.email || "",
    oldPassword: user?.password || "",
    newPassword: "",
    role: isAdminIn ? "Administrador" : "Cliente",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.info("Simulación de edición exitosa");
  };

  return (
    <MainLayout>
      <div className={styles.containerProfilePage}>
        <h2 className={styles.pageTitle}>Perfil {user.name}</h2>

        <form onSubmit={handleSubmit} className={styles.containerForm}>
          {/* NOMBRE */}
          <div className={styles.formName}>
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          {/* EMAIL */}
          <div className={styles.formEmail}>
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* CONTRASEÑA ACTUAL */}
          <div className={styles.formOldPassword}>
            <label htmlFor="oldPassword">Contraseña actual:</label>
            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
            />
          </div>

          {/* CONTRASEÑA NUEVA */}
          <div className={styles.formNewPassword}>
            <label htmlFor="newPassword">Contraseña nueva:</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />
          </div>

          {/* ROL */}
          {isAdminIn && (
            <div className={styles.formRole}>
              <label htmlFor="role">Rol:</label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <hr className={styles.separator} />

          {/* BOTONES */}
          <div className={styles.containerButtons}>
            <button
              type="button"
              className={styles.buttonCancel}
              onClick={() => navigate("/")}
            >
              Cancelar
            </button>
            <button
              type="button"
              className={styles.buttonEditMore}
              onClick={() => navigate("/account")}
            >
              Cuenta
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
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;

// import MainLayout from "../../Layout/MainLayout";
// import styles from "./ProfilePage.module.css";
// import { useAuth } from "../../Context/AuthContex";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const ProfilePage = () => {
//   const { user, isAdminIn } = useAuth();
//   console.log(user);
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//   };
//   const navigate = useNavigate();
//   return (
//     <>
//       <MainLayout>
//         <div className={styles.containerProfilePage}>
//           <h2 className={styles.pageTitle}>Perfil {user.name}</h2>
//           <form onSubmit={handleSubmit} className={styles.containerForm}>
//             <div className={styles.formName}>
//               <label htmlFor="nombre">Nombre:</label>
//               <input
//                 type="text"
//                 id="nombre"
//                 name="nombre"
//                 value={user.name}
//                 onChange={handleChange}
//                 required
//                 autoComplete="nombre"
//               />
//             </div>
//             <div className={styles.formEmail}>
//               <label htmlFor="email">Correo Electrónico:</label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={user.email}
//                 onChange={handleChange}
//                 required
//                 autoComplete="email"
//               />
//             </div>
//             <div className={styles.formOldPassword}>
//               <label htmlFor="oldPassword">Contraseña actual:</label>
//               <input
//                 type="password"
//                 id="oldPassword"
//                 name="oldPassword"
//                 value={user.password}
//                 onChange={handleChange}
//                 autoComplete="oldPassword"
//               />
//             </div>
//             <div className={styles.formNewPassword}>
//               <label htmlFor="newPassword">Contraseña nueva:</label>
//               <input
//                 type="password"
//                 id="newPassword"
//                 name="newPassword"
//                 value={user.password}
//                 onChange={handleChange}
//                 autoComplete="newPassword"
//               />
//             </div>
//             {isAdminIn ? (
//               <div className={styles.formRole}>
//                 <label htmlFor="role">Rol:</label>
//                 <input
//                   type="text"
//                   id="role"
//                   name="role"
//                   value="Administrador"
//                   onChange={handleChange}
//                   required
//                   autoComplete="role"
//                 />
//               </div>
//             ) : (
//               <></>
//             )}
//             <hr className={styles.separator} />
//             <div className={styles.containerButtons}>
//               <button
//                 className={styles.buttonCancel}
//                 onClick={() => {
//                   navigate("/");
//                 }}
//               >
//                 Cancelar
//               </button>
//               <button
//                 className={styles.buttonSave}
//                 onClick={() => {
//                   toast.info(`Simulacion de Edicion Exitosa`);
//                 }}
//               >
//                 Guardar Cambios
//               </button>
//             </div>
//           </form>
//         </div>
//       </MainLayout>
//     </>
//   );
// };

// export default ProfilePage;
