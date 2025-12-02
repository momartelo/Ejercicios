import MainLayout from "../../Layout/MainLayout";
import styles from "./ProfilePage.module.css";
import { useAuth } from "../../Context/AuthContex";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const { user, isAdminIn } = useAuth();
  console.log(user);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  const navigate = useNavigate();
  return (
    <>
      <MainLayout>
        <div className={styles.containerProfilePage}>
          <h2 className={styles.pageTitle}>Perfil</h2>
          <h3 className={styles.name}>Hola {user.name}</h3>
          <form onSubmit={handleSubmit} className={styles.containerForm}>
            <div className={styles.formName}>
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={user.name}
                onChange={handleChange}
                required
                autoComplete="nombre"
              />
              <div className={styles.formEmail}>
                <label htmlFor="email">Correo Electrónico:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
              </div>
            </div>
            <div className={styles.formOldPassword}>
              <label htmlFor="oldPassword">Contraseña actual:</label>
              <input
                type="password"
                id="oldPassword"
                name="oldPassword"
                value={user.password}
                onChange={handleChange}
                autoComplete="oldPassword"
              />
            </div>
            <div className={styles.formNewPassword}>
              <label htmlFor="newPassword">Contraseña nueva:</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={user.password}
                onChange={handleChange}
                autoComplete="newPassword"
              />
            </div>
            {isAdminIn ? (
              <div className={styles.formRole}>
                <label htmlFor="role">Rol:</label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value="Administrador"
                  onChange={handleChange}
                  required
                  autoComplete="role"
                />
              </div>
            ) : (
              <></>
            )}
            <hr className={styles.separator} />
            <div className={styles.containerButtons}>
              <button
                className={styles.buttonCancel}
                onClick={() => {
                  navigate("/");
                }}
              >
                Cancelar
              </button>
              <button
                className={styles.buttonSave}
                onClick={() => {
                  toast.info(`Simulacion de Edicion Exitosa`);
                }}
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </MainLayout>
    </>
  );
};

export default ProfilePage;
