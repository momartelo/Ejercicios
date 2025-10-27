import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "./AlertContext";
import users from "../Data/UsersData";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [user, setUser] = useState("");

  const login = (email, password) => {
    const userFound = users.find(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password
    );

    if (userFound) {
      setUser(userFound);
      setIsLoggedIn(true);
      return true;
    } else {
      return false;
    }
  };
  const logout = () => {
    setIsLoggedIn(false);
    showAlert("Sesión cerrada correctamente 👋", "info");
    navigate("/"); // redirige al home
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
