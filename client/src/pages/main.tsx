import { FC, useEffect } from "react";
import { io } from "socket.io-client";
import { apiRoutes } from "../api/api-routes";
import Header from "../components/header";
import Container from "../ui/container";

const socket = io(apiRoutes.base);

const Main: FC = () => {
  useEffect(() => {
    socket.connect();
  }, []);

  return (
    <div className="main-page min-h-[100vh] text-white">
      <Header />
      <Container maxWidth="xl" className="pt-8">
        <h1>main</h1>
      </Container>
      {/* здесь будут комнаты */}
    </div>
  );
};

export default Main;
