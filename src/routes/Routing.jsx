import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "../pages/homepage";
import ErrorPage from "../pages/error";
import Layout from "../layout/Layout";
import GenrePage from "../pages/genrepage";
import GamePage from "../pages/gamepage";
import SearchPage from "../pages/searchpage";
import LoginPage from "../pages/loginpage";
import RegisterPage from "../pages/registerpage";
import AccountPage from "../pages/accountpage";

export function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />

          <Route path="/genre/:genre" element={<GenrePage />} />
          <Route path="/game/:id" element={<GamePage />} />
          <Route path="/search" element={<SearchPage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<AccountPage />} />

          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}