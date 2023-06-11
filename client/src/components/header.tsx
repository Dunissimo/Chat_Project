import { FC } from "react";
import Container from "../ui/container";
import Stack from "../ui/stack";

const Header: FC = () => {
  return (
    <header className="header min-w-full bg-white text-black">
      <Container maxWidth="xl">
        <Stack
          flex="row"
          items="center"
          justify="space-between"
          className="min-h-[50px]"
        >
          <h1 className="font-bold text-2xl">Chat</h1>
          <h2>Username must be here</h2>
        </Stack>
      </Container>
    </header>
  );
};

export default Header;
