import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Approuter from "./Approuter";
import ScrollToTop from "./Hooks/ScrollToTop";
import "./index.css";
import { CartProvider } from "./Context/CartContext";
import { AuthProvider } from "./Context/AuthContex";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <ScrollToTop />
        <Approuter />
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
);
