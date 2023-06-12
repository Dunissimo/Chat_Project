import { FC, useEffect } from "react";
import { io } from "socket.io-client";
import { apiRoutes } from "../api/api-routes";
import Header from "../components/header";
import Container from "../ui/container";
import Main from "../components/main";
import Sidebar from "../components/sidebar";

const socket = io(apiRoutes.base);

const MainPage: FC = () => {
  useEffect(() => {
    socket.connect();
  }, []);

  return (
    <section className="main-page h-[100vh] text-white overflow-hidden">
      <Header />
      <Container className="pt-4">
        <Main sidebar={<Sidebar />}>
          <div className="pl-2">
            <p>Hello</p>
            <p>World</p>
          </div>
        </Main>
      </Container>
    </section>
  );
};

export default MainPage;
