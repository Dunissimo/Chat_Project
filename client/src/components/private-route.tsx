import { FC, ReactElement, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getCookie } from "typescript-cookie";

interface IProps {
  element: ReactElement;
}

const PrivateRoute: FC<IProps> = ({ element: Element }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!getCookie("user-token")) {
      navigate("/login", { state: { from: location } });
    }
  }, []);

  return Element;
};

export default PrivateRoute;
