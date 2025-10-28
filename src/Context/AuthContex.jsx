import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "./AlertContext";
import users from "../Data/UsersData";
import { getUsers, findUserByEmail } from "../mocks/Users";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [user, setUser] = useState("");

  const login = (email, password) => {
    const users = getUsers();
    const userFound = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (userFound) {
      setUser(userFound);
      setIsLoggedIn(true);
      showAlert(`Bienvenido ${userFound.name} 👋`, "success");
      return true;
    } else {
      showAlert("Usuario o contraseña incorrectos", "error");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    showAlert("Sesión cerrada correctamente 👋", "info");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
