import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import ListPage from "./Pages/ListPage/ListPage";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import CardTeamPage from "./Pages/CardTeamPage/CardTeamPage";

function Approuter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/listPage" element={<ListPage />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/team" element={<CardTeamPage />} />
    </Routes>
  );
}

export default Approuter;
