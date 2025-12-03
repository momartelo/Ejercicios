import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../Functions/FetchUsers";
import MainLayout from "../../Layout/MainLayout";
import styles from "./EditUsersPage.module.css";
import EditIcon from "@mui/icons-material/Edit";

const EditUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    getAllUsers().then(setUsers);
  }, []);
  console.log(users);
  return (
    <MainLayout>
      <h2 className={styles.title}>Roles de Usuarios Registrados</h2>

      {users.length === 0 ? (
        <p>No hay usuarios</p>
      ) : (
        <div className={styles.containerTable}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Ultimo Login</th>
                <th>Editar</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td data-label="ID">{u.id}</td>
                  <td data-label="Nombre">{u.name}</td>
                  <td data-label="Email">{u.email}</td>
                  <td data-label="Rol">{u.role}</td>
                  <td data-label="UltimoLogin">
                    {new Date(u.lastLogin).toLocaleDateString()}
                  </td>
                  <td data-label="Acciones">
                    <button
                      className={styles.editBtn}
                      onClick={() => setEditingUser(u)}
                    >
                      <EditIcon className={styles.editIcon} /> Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {editingUser && (
            <div className={styles.modalOverlay}>
              <div className={styles.modal}>
                <h3>Editar rol de {editingUser.name}</h3>

                <label>Nuevo rol:</label>
                <select
                  value={editingUser.role}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, role: e.target.value })
                  }
                >
                  <option value="cliente">Cliente</option>
                  <option value="admin">Administrador</option>
                </select>

                <div className={styles.modalActions}>
                  <button
                    className={styles.cancelBtn}
                    onClick={() => setEditingUser(null)}
                  >
                    Cancelar
                  </button>

                  <button
                    className={styles.saveBtn}
                    onClick={() => handleSaveRole(editingUser)}
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </MainLayout>
  );
};

export default EditUsersPage;
