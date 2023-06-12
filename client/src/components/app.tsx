import { FC, useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import PrivateRoute from "./private-route";
import MainPage from "../pages/main";
import Login from "../pages/login";
import { getCookie } from "typescript-cookie";

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute element={<MainPage />} />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
