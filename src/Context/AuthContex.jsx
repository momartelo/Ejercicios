import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "./AlertContext";
import users from "../Data/UsersData";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminIn, setIsAdminIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // 🚨 ¡NUEVO ESTADO!

  const navigate = useNavigate();
  const { showAlert } = useAlert();

  // 🔹 Al recargar la página, restauramos sesión
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsLoggedIn(true);
      if (parsedUser.role === "admin") {
        setIsAdminIn(true);
      }
    }

    setIsLoading(false); // 👈 Se pone en false al finalizar la verificación
  }, []); // Se ejecuta una sola vez al montar

  // 🔹 Login con detección de rol
  const login = (email, password) => {
    // ... tu lógica de login existente
    const userFound = users.find(
      (u) =>
        u.email.trim().toLowerCase() === email.trim().toLowerCase() &&
        u.password === password
    );

    if (!userFound) {
      showAlert("Usuario o contraseña incorrectos", "error");
      return false;
    }

    const token = `fake-token-${email}`;
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(userFound));

    setUser(userFound);
    setIsLoggedIn(true);

    const isAdmin = userFound.role?.toLowerCase() === "admin";
    setIsAdminIn(isAdmin);

    showAlert(`Bienvenido ${userFound.name} 👋`, "success");

    const from = window.history.state?.usr?.from;
    if (from) navigate(from);
    else navigate("/");

    return true;
  };

  // 🔹 Logout
  const logout = () => {
    // ... tu lógica de logout existente
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("checkoutTotal");

    setUser(null);
    setIsLoggedIn(false);
    setIsAdminIn(false);

    showAlert("Sesión cerrada correctamente 👋", "info");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isAdminIn,
        login,
        logout,
        user,
        isLoading, // 🚨 ¡EXPORTAR EL NUEVO ESTADO!
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
