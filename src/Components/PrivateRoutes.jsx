// src/PrivateRoutes.jsx

import { useEffect } from "react";
import { useAuth } from "../Context/AuthContex";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const PrivateRoutes = () => {
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
  }, [isLoggedIn, navigate, location.pathname, isLoading]);

  if (isLoading) {
    return <div>Verificando sesión...</div>;
  }

  return isLoggedIn ? <Outlet /> : null;
};

export default PrivateRoutes;
