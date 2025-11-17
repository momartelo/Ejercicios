import { Routes, Route } from "react-router-dom";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import CardTeamPage from "./Pages/CardTeamPage/CardTeamPage";
import CartPage from "./Pages/CartPage/CartPage";
import CheckoutPage from "./Pages/CheckoutPage/CheckoutPage";
import PrivateRoutes from "./Components/PrivateRoutes";
import FaqPage from "./Pages/FAQPage/FAQPage";
import ContactPage from "./Pages/ContactPage/ContactPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import HomePage from "./Pages/HomePage/HomePage";
import ProductForm from "./Pages/ProductForm/ProductForm";
import ProductsPageLocal from "./Pages/ProductsPageLocal/ProductsPageLocal";

function Approuter() {
  return (
    <Routes>
      <Route path="/" element={<ProductsPageLocal />} />
      <Route path="/team" element={<CardTeamPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/FAQs" element={<FaqPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/prueba" element={<HomePage />} />

      <Route element={<PrivateRoutes />}>
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/product/new" element={<ProductForm />} />
        <Route path="/product/edit/:id" element={<ProductForm />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default Approuter;
