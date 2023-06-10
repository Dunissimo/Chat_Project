import { FC, useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import PrivateRoute from "./private-route";
import Main from "../pages/main";
import Login from "../pages/login";
import { getCookie } from "typescript-cookie";

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute element={<Main />} />} />
      <Route path="/login" element={<Login />} />
      {/* <Route
        path="/admin"
        element={<PrivateRoute auth={user} element={<YES />} />}
      /> 
      */}
      {/* <Route path="/login" element={<Login setUser={setUser} />} /> */}
    </Routes>
  );
};

export default App;
