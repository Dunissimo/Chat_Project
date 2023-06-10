import { FC, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import PrivateRoute from "./private-route";
import Main from "../pages/main";
import Login from "../pages/login";

const YES: FC = () => {
  return <div>YES</div>;
};

interface IProps {
  setUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const App: FC = () => {
  const [user, setUser] = useState(false);

  return (
    <Routes>
      <Route
        path="/"
        element={<PrivateRoute auth={false} element={<Main />} />}
      />
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
