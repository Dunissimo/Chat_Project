import { FC, ReactElement, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getCookie } from "typescript-cookie";
import { useAppSelector } from "../utils/hooks/redux";
import { userSelector } from "../redux/slices/user-slice";

interface IProps {
  element: ReactElement;
}

const PrivateRoute: FC<IProps> = ({ element: Element }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuth } = useAppSelector(userSelector);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login", { state: { from: location } });
    }
  }, [isAuth]);

  return Element;
};

export default PrivateRoute;
