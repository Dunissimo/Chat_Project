import { FC, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SignupForm from "../components/signup-form";
import LoginForm from "../components/login-form";

const Login: FC = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const navigate = useNavigate();
  const location = useLocation();

  // перенсти в формы
  const clickHandler = () => {
    //  setUser(true);
    navigate(location.state.from);
  };

  return (
    <div className="login-page min-h-[100vh] text-white">
      {mode === "login" ? (
        <LoginForm setMode={setMode} />
      ) : (
        <SignupForm setMode={setMode} />
      )}
    </div>
  );
};

export default Login;
