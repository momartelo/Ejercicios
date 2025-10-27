import { useEffect } from "react";
import { useAuth } from "../Context/AuthContex";
import { Outlet, useNavigate } from "react-router-dom";

const PrivateRoutes = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/cart");
    }
  }, [isLoggedIn, navigate]);

  return isLoggedIn ? <Outlet /> : null;
};

export default PrivateRoutes;
