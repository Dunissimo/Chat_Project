import { FC, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:1234");

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
