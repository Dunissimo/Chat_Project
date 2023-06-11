import { FC, useState } from "react";
import Container from "../ui/container";
import Stack from "../ui/stack";
import Button from "../ui/button";
import { Drawer } from "antd";
import { signout } from "../redux/slices/user-slice";
import { useAppDispatch } from "../utils/hooks/redux";
import { removeCookie } from "typescript-cookie";

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

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
          <Button
            variant="simple"
            theme="dark"
            otherProps={{ onClick: showDrawer }}
          >
            Username
          </Button>
          <Drawer
            className="drawer-with-custom-title"
            title="Профиль"
            placement="right"
            onClose={onClose}
            open={open}
            footer={
              <Button
                variant="outline"
                theme="dark"
                otherProps={{
                  onClick: () => {
                    dispatch(signout());
                    removeCookie("user-token");
                  },
                }}
              >
                Выйти
              </Button>
            }
          ></Drawer>
        </Stack>
      </Container>
    </header>
  );
};

export default Header;
