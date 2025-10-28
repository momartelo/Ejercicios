import { Routes, Route } from "react-router-dom";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import CardTeamPage from "./Pages/CardTeamPage/CardTeamPage";
import CartPage from "./Pages/CartPage/CartPage";
import CheckoutPage from "./Pages/CheckoutPage/CheckoutPage";
import ProductsPageFakeAPI from "./Pages/ProductsPageFakeAPI/ProductsPageFakeAPI";
import PrivateRoutes from "./Components/PrivateRoutes";
import FaqPage from "./Pages/FAQPage/FAQPage";
import ContactPage from "./Pages/ContactPage/ContactPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";

function Approuter() {
  return (
    <Routes>
      <Route path="/" element={<ProductsPageFakeAPI />} />
      <Route path="/team" element={<CardTeamPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/FAQs" element={<FaqPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<PrivateRoutes />}>
        <Route path="/checkout" element={<CheckoutPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default Approuter;
