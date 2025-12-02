// src/PrivateRoutes.jsx

import { useEffect } from "react";
import { useAuth } from "../Context/AuthContex";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const PrivateRoutes = () => {
  // Obtener el estado de autenticación y el nuevo estado de carga
  const { isLoggedIn, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (!isLoggedIn && location.pathname !== "/cart") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debe estar logueado para acceder a esta página.",
      }).then(() => {
        navigate("/", {
          state: { from: location.pathname },
          replace: true,
        });
      });
    }
  }, [isLoggedIn, navigate, location.pathname, isLoading]); // Se ejecuta cuando cambian estas dependencias // Mostrar un indicador de carga mientras se verifica la sesión

  if (isLoading) {
    return <div>Verificando sesión...</div>;
  } // Si la carga terminó y está logueado, renderizar el contenido anidado (<Outlet />)

  return isLoggedIn ? <Outlet /> : null;
};

export default PrivateRoutes;
