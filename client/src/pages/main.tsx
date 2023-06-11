import { FC, useEffect } from "react";
import { io } from "socket.io-client";
import { apiRoutes } from "../api/api-routes";

const socket = io(apiRoutes.base);

const Main: FC = () => {
  useEffect(() => {
    socket.connect();
  }, []);
  return (
    <div>
      <h1>main</h1>
      {/* здесь будут комнаты */}
    </div>
  );
};

export default Main;
