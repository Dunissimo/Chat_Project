import { FC, ReactElement, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface IProps {
  element: ReactElement;
  auth: boolean;
}

const PrivateRoute: FC<IProps> = ({ auth, element: Element }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!auth) {
      navigate("/login", { replace: true, state: { from: location } });
    }
  }, [auth]);

  return Element;
};

export default PrivateRoute;
