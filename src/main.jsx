import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Approuter from "./Approuter";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Approuter />
  </BrowserRouter>
);
