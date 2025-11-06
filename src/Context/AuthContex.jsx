import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "./AlertContext";
import { getUsers } from "../mocks/Users";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email, password) => {
    const users = getUsers();
    const userFound = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (userFound) {
      const token = `fake-token-${email}`;
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(userFound));

      setUser(userFound);
      setIsLoggedIn(true);
      showAlert(`Bienvenido ${userFound.name} 👋`, "success");
      const from = window.history.state?.usr?.from;
      if (from) navigate(from);
      return true;
    } else {
      showAlert("Usuario o contraseña incorrectos", "error");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("checkoutTotal");

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
