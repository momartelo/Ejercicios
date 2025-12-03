import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "./AlertContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminIn, setIsAdminIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const { showAlert } = useAlert();

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsLoggedIn(true);

      if (parsedUser.role === "admin") setIsAdminIn(true);
    }

    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACK_API_URL}/api/users/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        showAlert(data.error || "Credenciales incorrectas", "error");
        return false;
      }

      const userFound = data.user;
      const token = data.token;

      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(userFound));

      setUser(userFound);
      setIsLoggedIn(true);
      setIsAdminIn(userFound.role === "admin");

      showAlert(`Bienvenido ${userFound.name} 👋`, "success");

      const from = window.history.state?.usr?.from;
      navigate("/");

      return true;
    } catch (err) {
      showAlert("Error conectando con el servidor", "error");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("checkoutTotal");

    localStorage.removeItem("carrito_guest");

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
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
